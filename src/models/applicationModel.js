const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query(`SELECT * FROM application;`);
    return query[0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM application WHERE id = ?", [
        id,
    ]);
    return query[0][0];
};

const createApplication = async (applicationData) => {
    const conn = await connect();
    try {
        const { name, vacancyId, userId } = applicationData;

        const [result] = await conn.query(
            `INSERT INTO application (id, vacancyId, userId) 
            VALUES (?, ?, ?);`,
            [name, vacancyId, userId]
        );
        console.log("Competence Data:", applicationData);
        return { id: result.insertId, ...applicationData };
    } catch (error) {
        console.error("Erro ao criar dados da candidatura:", error.message);
        throw new Error("Erro ao criar dados da candidatura.");
    }
};

module.exports = {
    getAll,
    createApplication,
    getById,
    updateApplication,
    deleteApplication,
};
