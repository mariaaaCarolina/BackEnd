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

module.exports = {
    getAll,
    createCandidate,
    getByUserId,
    getById,
    updateCandidate,
};
