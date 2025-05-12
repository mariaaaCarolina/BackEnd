const connect = require("../connection");
const { encrypt, decrypt } = require("../crypto");

const getAll = async () => {
    const conn = await connect();
    try {
        const query = await conn.query("SELECT * FROM competences");

        const competences = query[0].map((competence) => ({
            ...competence,
            name: decrypt(competence.name),
        }));

        return competences;
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

    const competences = query[0];

    const decryptedCompetences = competences.map((competence) => {
        return {
            ...competence,
            name: decrypt(competence.name),
        };
    });

    return decryptedCompetences;
};

const createCompetence = async (competenceData) => {
    const conn = await connect();
    try {
        const { name, curriculumId } = competenceData;

        const encryptedName = encrypt(name);

        const [result] = await conn.query(
            `INSERT INTO competences (name, curriculumId) 
            VALUES (?, ?);`,
            [encryptedName, curriculumId]
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

        const encryptedName = encrypt(name);

        const [result] = await conn.query(
            "UPDATE competences SET name = ?, curriculumId = ? WHERE id = ?;",
            [encryptedName, curriculumId, id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Competência com ID ${id} não encontrada.`);
        }

        return { id, ...competences };
    } catch (error) {
        console.error("Erro ao atualizar dados da competência:", error.message);
        throw new Error("Erro ao atualizar dados da competência.");
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
            throw new Error(`Competência com ID ${id} não encontrada.`);
        }

        return { message: `Competência com ID ${id} deletada com sucesso.` };
    } catch (error) {
        console.error("Erro ao deletar dados da competência:", error.message);
        throw new Error("Erro ao deletar dados da competência.");
    }
};

module.exports = {
    getAll,
    getById,
    createCompetence,
    updateCompetence,
    deleteCompetence,
};
