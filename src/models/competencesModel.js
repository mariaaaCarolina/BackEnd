const connect = require("../connection");

//NAO FUNCIONA ESTA MERDA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//ele cria mas nao referencia o curriculumId no get

const getAll = async () => {
    const conn = await connect();
    try {
        const query = await conn.query(`SELECT * FROM competences;`);
        return query[0];
    } catch (error) {
        console.error("Erro ao buscar competências:", error.message);
        throw new Error("Erro ao buscar competências.");
    }
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query(`SELECT * FROM competences WHERE id = ?`, [
        id,
    ]);
    return query[0][0];
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

        return { id: result.insertId, ...competenceData };
    } catch (error) {
        console.error("Erro ao criar dados da competência:", error.message);
        throw new Error("Erro ao criar dados da competência.");
    }
};

module.exports = {
    getAll,
    getById,
    createCompetence,
    // updateCompetence,
    // deleteCompetence,
};
