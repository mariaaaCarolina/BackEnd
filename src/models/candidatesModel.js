const connect = require("../connection");
const bcrypt = require("bcrypt");

const getAll = async () => {
    try {
        const conn = await connect();

        const [rows] = await conn.query(`
            SELECT 
                candidates.id AS id, 
                candidates.name, 
                candidates.cpf, 
                candidates.phoneNumber, 
                candidates.curriculumId AS curriculumId
            FROM candidates
        `);
        return rows;
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Could not retrieve candidates");
    }
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM candidates WHERE id = ?", [
        id,
    ]);
    return query[0][0]; // Retorna um único candidato
};

const createCandidate = async (candidates) => {
    const conn = await connect();
    try {
        const { name, cpf, phoneNumber, curriculumId, userId } = candidates;

        const [result] = await conn.query(
            `INSERT INTO candidates (name, cpf, phoneNumber, curriculumId, userId) 
            VALUES (?, ?, ?, ?, ?);`,
            [name, cpf, phoneNumber, curriculumId || null, userId || null]
        );
        return { id: result.insertId, ...candidates };
    } catch (error) {
        console.error("Erro ao criar o candidato :", error.message);
        throw new Error("Erro ao criar o candidato");
    }
};

const updateCandidate = async (id, candidates) => {
    const conn = await connect();
    const { name, cpf, phoneNumber, curriculumId, userId } = candidates;

    const query = `
        UPDATE candidates 
        SET name = ?, cpf = ?, phoneNumber = ?, curriculumId = ?, userId = ?
        WHERE id = ?
    `;

    const [result] = await conn.query(query, [
        name,
        cpf,
        phoneNumber,
        curriculumId,
        userId,
        id,
    ]);

    return result.affectedRows ? { id, ...candidates } : null;
};

const deleteCandidate = async (id) => {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM messages WHERE sender_id = ?", [id]);
        // await conn.query("DELETE FROM answers WHERE candidateId = ?", [id]);
        const [result] = await conn.query(
            "DELETE FROM candidates WHERE id = ?",
            [id]
        );

        return result;
    } catch (error) {
        console.error("Erro ao excluir candidato e suas mensagens:", error);
        throw new Error("Erro ao excluir candidato e suas mensagens");
    }
};

const addCurriculum = async (candidateId, curriculumId) => {
    const conn = await connect();
    const query = "UPDATE candidates SET curriculumId = ? WHERE id = ?";
    const [result] = await conn.query(query, [curriculumId, candidateId]);
    return result;
};

const deleteCandidateData = async (candidateId, curriculumId, id) => {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM application WHERE candidateId = ?", [
            candidateId,
        ]);
        await conn.query("DELETE FROM academicData WHERE curriculumId = ?", [
            curriculumId,
        ]);
        await conn.query("DELETE FROM competences WHERE curriculumId = ?", [
            curriculumId,
        ]);
        await conn.query("DELETE FROM coursesData WHERE curriculumId = ?", [
            curriculumId,
        ]);
        await conn.query("DELETE FROM curriculum WHERE id = ?", [curriculumId]);

        await conn.query(
            "UPDATE candidates SET curriculumId = NULL WHERE id = ?",
            [candidateId]
        );
        return { message: "Dados excluídos com sucesso." };
    } catch (error) {
        console.error("Erro ao excluir dados:", error);
        throw new Error("Erro ao excluir dados do candidato");
    }
};

module.exports = {
    getAll,
    getById,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    addCurriculum,
    deleteCandidateData,
};
