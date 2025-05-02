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
                candidates.curriculumId AS curriculumId,
                candidates.userId
            FROM candidates
        `);
        return rows;
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Could not retrieve candidates");
    }
};

const getByUserId = async (userId) => {
    const conn = await connect();
    const query = await conn.query(
        "SELECT * FROM candidates WHERE userId = ?",
        [userId]
    );
    console.log("Resultado da query:", query[0]);
    return query[0][0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM candidates WHERE id = ?", [
        id,
    ]);
    console.log("Resultado da query:", query[0]);
    return query[0][0];
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

const updateCandidate = async (userId, candidate) => {
    const conn = await connect();
    const { name, cpf, phoneNumber } = candidate;
    const cleanedCpf = cpf.trim();

    console.log("Atualizando candidato com dados:", {
        userId,
        name,
        cpf: cleanedCpf,
        phoneNumber,
    });

    // Primeiro, busca o CPF atual desse usuário
    const [currentRows] = await conn.query(
        `SELECT cpf FROM candidates WHERE userId = ?`,
        [userId]
    );

    if (currentRows.length === 0) {
        const err = new Error("Candidato não encontrado.");
        err.code = "NOT_FOUND";
        throw err;
    }

    const currentCpf = currentRows[0].cpf;
    console.log("CPF atual no banco:", currentCpf);

    let query;
    let params;

    // Se o CPF mudou, precisamos verificar se o novo CPF já existe para outro candidato
    if (currentCpf !== cleanedCpf) {
        const [duplicateRows] = await conn.query(
            `SELECT userId FROM candidates WHERE cpf = ? AND userId != ?`,
            [cleanedCpf, userId]
        );

        console.log(
            "Resultado da verificação de CPF duplicado:",
            duplicateRows
        );

        if (duplicateRows.length > 0) {
            const err = new Error("CPF já cadastrado para outro candidato.");
            err.code = "DUPLICATE_CPF";
            throw err;
        }

        // Atualiza name, phoneNumber e cpf
        query = `
            UPDATE candidates 
            SET name = ?, phoneNumber = ?, cpf = ?
            WHERE userId = ?
        `;
        params = [name, phoneNumber, cleanedCpf, userId];
    } else {
        // Atualiza apenas name e phoneNumber
        query = `
            UPDATE candidates 
            SET name = ?, phoneNumber = ?
            WHERE userId = ?
        `;
        params = [name, phoneNumber, userId];
    }

    const [result] = await conn.query(query, params);

    return result.affectedRows
        ? { userId, name, cpf: cleanedCpf, phoneNumber }
        : null;
};

const deleteCandidate = async (userId) => {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM messages WHERE sender_id = ?", [userId]);
        const [result] = await conn.query(
            "DELETE FROM candidates WHERE userId = ?",
            [userId]
        );

        return result;
    } catch (error) {
        console.error("Erro ao excluir candidato e suas mensagens:", error);
        throw new Error("Erro ao excluir candidato e suas mensagens");
    }
};

const addCurriculum = async (id, curriculumId) => {
    const conn = await connect();
    const query = "UPDATE candidates SET curriculumId = ? WHERE id = ?";
    const [result] = await conn.query(query, [curriculumId, id]);
    return result;
};

const deleteCandidateData = async (userId, curriculumId) => {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM applications WHERE userId = ?", [userId]);
        await conn.query("DELETE FROM academicData WHERE curriculumId = ?", [
            curriculumId,
        ]);
        await conn.query("DELETE FROM competences WHERE curriculumId = ?", [
            curriculumId,
        ]);
        await conn.query("DELETE FROM coursesData WHERE curriculumId = ?", [
            curriculumId,
        ]);
        await conn.query("DELETE FROM curriculums WHERE id = ?", [
            curriculumId,
        ]);

        await conn.query(
            "UPDATE candidates SET curriculumId = NULL WHERE userId = ?",
            [userId]
        );
        return { message: "Dados excluídos com sucesso." };
    } catch (error) {
        console.error("Erro ao excluir dados:", error);
        throw new Error("Erro ao excluir dados do candidato");
    }
};

module.exports = {
    getAll,
    getByUserId,
    getById,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    addCurriculum,
    deleteCandidateData,
};
