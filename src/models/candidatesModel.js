const connect = require("../connection");
const { encrypt, decrypt } = require("../crypto");

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

        const candidates = rows.map((candidate) => ({
            ...candidate,
            name: decrypt(candidate.name),
            cpf: decrypt(candidate.cpf),
            phoneNumber: decrypt(candidate.phoneNumber),
        }));

        return candidates;
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Could not retrieve candidates");
    }
};

const getByUserId = async (userId) => {
    const conn = await connect();
    const [[candidate]] = await conn.query(
        "SELECT * FROM candidates WHERE userId = ?",
        [userId]
    );

    if (candidate) {
        candidate.name = decrypt(candidate.name);
        candidate.cpf = decrypt(candidate.cpf);
        candidate.phoneNumber = decrypt(candidate.phoneNumber);
    }

    return candidate;
};

const getById = async (id) => {
    const conn = await connect();
    const [[candidate]] = await conn.query(
        "SELECT * FROM candidates WHERE id = ?",
        [id]
    );

    if (candidate) {
        candidate.name = decrypt(candidate.name);
        candidate.cpf = decrypt(candidate.cpf);
        candidate.phoneNumber = decrypt(candidate.phoneNumber);
    }

    return candidate;
};

const createCandidate = async (candidate) => {
    const conn = await connect();
    try {
        const { name, cpf, phoneNumber, curriculumId, userId } = candidate;

        const encryptedName = encrypt(name);
        const encryptedCpf = encrypt(cpf);
        const encryptedPhoneNumber = encrypt(phoneNumber);

        const [result] = await conn.query(
            `INSERT INTO candidates (name, cpf, phoneNumber, curriculumId, userId) 
            VALUES (?, ?, ?, ?, ?);`,
            [
                encryptedName,
                encryptedCpf,
                encryptedPhoneNumber,
                curriculumId || null,
                userId || null,
            ]
        );
        return { id: result.insertId, ...candidate };
    } catch (error) {
        console.error("Erro ao criar o candidato:", error.message);
        throw new Error("Erro ao criar o candidato");
    }
};

const updateCandidate = async (userId, candidate) => {
    const conn = await connect();
    const { name, cpf, phoneNumber } = candidate;

    const encryptedName = encrypt(name);
    const encryptedCpf = encrypt(cpf);
    const encryptedPhoneNumber = encrypt(phoneNumber);

    const query = `
        UPDATE candidates 
        SET name = ?, cpf = ?, phoneNumber = ?
        WHERE userId = ?
    `;

    const [result] = await conn.query(query, [
        encryptedName,
        encryptedCpf,
        encryptedPhoneNumber,
        userId,
    ]);

    return result.affectedRows ? { userId, ...candidate } : null;
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
    createCandidate,
    getByUserId,
    getById,
    updateCandidate,
    deleteCandidateData,
    deleteCandidate,
    addCurriculum,
};
