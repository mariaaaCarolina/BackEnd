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

const checkExistence = async (table, id) => {
    const conn = await connect();
    const [rows] = await conn.query(`SELECT id FROM ${table} WHERE id = ?`, [
        id,
    ]);
    return rows.length > 0;
};

const createApplication = async (applicationData) => {
    const conn = await connect();
    try {
        const { vacancyId, userId } = applicationData;
        const vacancyExists = await checkExistence("vacancy", vacancyId);
        if (!vacancyExists) {
            throw new Error("A vaga referenciada não existe.");
        }
        const userExists = await checkExistence("users", userId);
        if (!userExists) {
            throw new Error("O usuário referenciado não existe.");
        }
        const [result] = await conn.query(
            `INSERT INTO application (vacancyId, userId) 
            VALUES (?, ?);`,
            [vacancyId, userId]
        );
        console.log("Application Data:", applicationData);
        return { id: result.insertId, ...applicationData };
    } catch (error) {
        console.error("Erro ao criar dados da candidatura:", error.message);
        throw new Error("Erro ao criar dados da candidatura.");
    }
};

const updateApplication = async (id, application) => {
    const conn = await connect();
    const { vacancyId, userId } = application;

    const query = `
        UPDATE application
        SET vacancyId = ?, userId = ?
    `;

    const [result] = await conn.query(query, [id, vacancyId, userId]);

    return result.affectedRows ? { id, ...application } : null;
};

const deleteApplication = async (id) => {
    const conn = await connect();
    const query = `
        DELETE FROM application 
        WHERE id = ?
    `;
    const [result] = await conn.query(query, [id]);
    return result;
};

module.exports = {
    getAll,
    createApplication,
    getById,
    updateApplication,
    deleteApplication,
};
