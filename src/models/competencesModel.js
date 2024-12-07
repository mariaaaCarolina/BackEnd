const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    try {
        const query = await conn.query("SELECT * FROM competences");
        return query[0];
    } catch (error) {
        console.error("Erro ao buscar competências:", error.message);
        throw new Error("Erro ao buscar competências.");
    }
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query(
        "SELECT * FROM competences WHERE curriculumId = ?",
        [id]
    );
    return query[0];
};

const createCompetence = async (competenceData) => {
    const conn = await connect();
    try {
        const { name, curriculumId } = competenceData;

        const [result] = await conn.query(
            `INSERT INTO competences (name, curriculumId) 
            VALUES (?, ?);`,
            [name, curriculumId]
        );
        console.log("Competence Data:", competenceData);
        return { id: result.insertId, ...competenceData };
    } catch (error) {
        console.error("Erro ao criar dados da competência:", error.message);
        throw new Error("Erro ao criar dados da competência.");
    }
};

const updateCompetence = async (id, competences) => {
    const conn = await connect();
    try {
        const { name, curriculumId } = competences;

        const [result] = await conn.query(
            "UPDATE coursesData SET name = ?, curriculumId = ? WHERE id = ?;",
            [name, curriculumId, id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Competencia com ID ${id} não encontrado.`);
        }

        return { id, ...competences };
    } catch (error) {
        console.error("Erro ao atualizar dados da competencia:", error.message);
        throw new Error("Erro ao atualizar dados da competencia.");
    }
};

const deleteCompetence = async (id) => {
    const conn = await connect();
    try {
        const [result] = await conn.query(
            `DELETE FROM competences WHERE id = ?;`,
            [id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Competencia com ID ${id} não encontrado.`);
        }

        return { message: `Competencia com ID ${id} deletado com sucesso.` };
    } catch (error) {
        console.error("Erro ao deletar dados da competencia:", error.message);
        throw new Error("Erro ao deletar dados da competencia.");
    }
};

module.exports = {
    getAll,
    getById,
    createCompetence,
    updateCompetence,
    deleteCompetence,
};
