const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    try {
        const [rows] = await conn.query(
            "SELECT * FROM cancelled_applications;"
        );
        return rows;
    } catch (error) {
        console.error(
            "Erro ao buscar todas as candidaturas canceladas:",
            error.message
        );
        throw new Error("Erro ao buscar candidaturas canceladas.");
    }
};

const getById = async (userId) => {
    const conn = await connect();
    try {
        const [rows] = await conn.query(
            "SELECT * FROM cancelled_applications WHERE userId = ?",
            [userId]
        );
        return rows;
    } catch (error) {
        console.error(
            "Erro ao buscar candidaturas canceladas por userId:",
            error.message
        );
        throw new Error("Erro ao buscar candidaturas canceladas.");
    }
};

const createCancelledApplication = async (applicationData) => {
    const conn = await connect();
    try {
        const { vacancyId, userId } = applicationData;
        const [result] = await conn.query(
            `INSERT INTO cancelled_applications (vacancyId, userId) 
            VALUES (?, ?);`,
            [vacancyId, userId]
        );
        console.log("Application Data:", applicationData);
        return { id: result.insertId, ...applicationData };
    } catch (error) {
        console.error(
            "Erro ao criar dados do cancelamento da candidatura:",
            error.message
        );
        throw new Error("Erro ao criar dados do cancelamento da candidatura.");
    }
};

const updateCancelledApplication = async (id, application) => {
    const conn = await connect();
    try {
        const { vacancyId, userId } = application;

        const query = `
            UPDATE cancelled_applications
            SET vacancyId = ?, userId = ?
            WHERE id = ?
        `;

        const [result] = await conn.query(query, [vacancyId, userId, id]);

        return result.affectedRows ? { id, ...application } : null;
    } catch (error) {
        console.error(
            "Erro ao atualizar candidatura cancelada:",
            error.message
        );
        throw new Error("Erro ao atualizar candidatura cancelada.");
    }
};

const deleteCancelledApplication = async (userId, vacancyId) => {
    const conn = await connect();
    try {
        const deleteApplicationQuery = `
            DELETE FROM cancelled_applications
            WHERE userId = ? AND vacancyId = ?
        `;
        const [result] = await conn.query(deleteApplicationQuery, [
            userId,
            vacancyId,
        ]);

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Erro ao deletar candidatura cancelada:", error.message);
        throw new Error("Erro ao deletar candidatura cancelada.");
    }
};

module.exports = {
    getAll,
    createCancelledApplication,
    getById,
    updateCancelledApplication,
    deleteCancelledApplication,
};
