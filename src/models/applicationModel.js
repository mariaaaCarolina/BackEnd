const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM applications;");
    return query[0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query(
        "SELECT * FROM applications WHERE userId = ?",
        [id]
    );
    return query[0];
};

const getByVacancyId = async (vacancyId) => {
    const conn = await connect();
    try {
        const query = await conn.query(
            "SELECT * FROM applications WHERE vacancyId = ?",
            [vacancyId]
        );
        return query[0];
    } catch (error) {
        console.error("Erro ao buscar candidaturas pela vaga:", error.message);
        throw new Error("Erro ao buscar candidaturas pela vaga.");
    }
};

const checkExistence = async (table, id) => {
    const conn = await connect();
    try {
        const [rows] = await conn.query("SELECT id FROM ?? WHERE id = ?", [
            table,
            id,
        ]);
        return rows.length > 0;
    } catch (error) {
        console.error(
            `Erro ao verificar existência na tabela ${table}:`,
            error.message
        );
        throw new Error(`Erro ao verificar existência na tabela ${table}`);
    }
};

const createApplication = async (applicationData) => {
    const conn = await connect();
    try {
        const { vacancyId, userId } = applicationData;

        // Verifica se a vaga existe
        const vacancyExists = await checkExistence("vacancies", vacancyId);
        if (!vacancyExists) {
            throw new Error("A vaga referenciada não existe.");
        }

        // Verifica se o usuário existe na tabela 'users'
        const userExists = await checkExistence("users", userId);
        if (!userExists) {
            throw new Error("O usuário referenciado não existe.");
        }

        // Aqui busca o ID do candidato com base no userId
        const [rows] = await conn.query(
            "SELECT id FROM candidates WHERE userId = ?",
            [userId]
        );
        if (rows.length === 0) {
            throw new Error("Candidato não encontrado para este usuário.");
        }

        const candidateId = rows[0].id;

        // Insere a aplicação usando o id da tabela candidates
        const [result] = await conn.query(
            `INSERT INTO applications (vacancyId, userId) 
            VALUES (?, ?);`,
            [vacancyId, candidateId]
        );

        return { id: result.insertId, vacancyId, userId };
    } catch (error) {
        console.error("Erro ao criar dados da candidatura:", error.message);
        throw new Error("Erro ao criar dados da candidatura.");
    }
};

const updateApplication = async (id, application) => {
    const conn = await connect();
    const { vacancyId, userId } = application;

    const query = `
        UPDATE applications
        SET vacancyId = ?, userId = ?
    `;

    const [result] = await conn.query(query, [id, vacancyId, userId]);

    return result.affectedRows ? { id, ...application } : null;
};

const deleteApplication = async (userId, vacancyId) => {
    const conn = await connect();

    try {
        await conn.beginTransaction();

        const deleteResponsesQuery = `
            DELETE FROM answers
            WHERE userId = ? AND questionId IN (
                SELECT id FROM questions WHERE vacancyId = ?
            )
        `;
        await conn.query(deleteResponsesQuery, [userId, vacancyId]);

        const deleteApplicationQuery = `
            DELETE FROM applications
            WHERE userId = ? AND vacancyId = ?
        `;
        const [result] = await conn.query(deleteApplicationQuery, [
            userId,
            vacancyId,
        ]);

        await conn.commit();
        return result;
    } catch (error) {
        await conn.rollback();
        throw error;
    }
};

module.exports = {
    getAll,
    createApplication,
    getById,
    getByVacancyId,
    updateApplication,
    deleteApplication,
};
