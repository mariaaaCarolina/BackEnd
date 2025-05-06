const connect = require("../connection");
const { encrypt, decrypt } = require("../crypto");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM answers");

    const answers = query[0].map((data) => ({
        ...data,
        answer: decrypt(data.answer),
    }));

    return answers;
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM answers WHERE id = ?", [id]);

    if (query[0].length > 0) {
        const data = query[0][0];
        data.answer = decrypt(data.answer);
        return data;
    }

    return null;
};

const getAllByQuestionId = async (questionId) => {
    const conn = await connect();
    const query = await conn.query(
        "SELECT * FROM answers WHERE questionId = ?",
        [questionId]
    );

    const answers = query[0].map((data) => ({
        ...data,
        answer: decrypt(data.answer),
    }));

    return answers;
};

const getCandidateIdById = async (userId) => {
    const conn = await connect();
    const [rows] = await conn.query(
        "SELECT id FROM candidates WHERE userId = ? LIMIT 1",
        [userId]
    );

    if (rows.length === 0) {
        console.error(`Candidato com userId ${userId} não encontrado.`);
        return null;
    }

    console.log(`Candidato encontrado:`, rows[0]);
    return rows[0].id;
};

const createAnswer = async (answerData) => {
    const conn = await connect();
    const { answer, questionId, userId } = answerData;

    console.log("userId recebido:", userId);

    const candidateId = await getCandidateIdById(userId);
    if (!candidateId) {
        throw new Error(
            "O candidato vinculado a esse usuário não foi encontrado."
        );
    }

    try {
        const encryptedAnswer = encrypt(answer);

        const [result] = await conn.query(
            `INSERT INTO answers (answer, questionId, userId) VALUES (?, ?, ?)`,
            [encryptedAnswer, questionId, candidateId]
        );

        return {
            id: result.insertId,
            answer: encryptedAnswer,
            questionId,
            userId: candidateId,
        };
    } catch (error) {
        console.error("Erro ao criar resposta:", error.message);
        throw new Error("Erro ao criar resposta.");
    }
};

const updateAnswer = async (id, answers) => {
    const conn = await connect();
    try {
        const { answer, questionId, userId } = answers;

        const encryptedAnswer = encrypt(answer);

        const [result] = await conn.query(
            `UPDATE answers SET answer = ?, questionId = ?, userId = ? WHERE id = ?;`,
            [encryptedAnswer, questionId, userId, id]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Resposta com ID ${id} não encontrada.`);
        }

        return { id, answer: encryptedAnswer, questionId, userId };
    } catch (error) {
        console.error("Erro ao atualizar dados da resposta:", error.message);
        throw new Error("Erro ao atualizar dados da resposta.");
    }
};

const deleteAnswer = async (id) => {
    const conn = await connect();
    try {
        const [result] = await conn.query(`DELETE FROM answers WHERE id = ?;`, [
            id,
        ]);
        if (result.affectedRows === 0) {
            throw new Error(`Resposta com ID ${id} não encontrada.`);
        }

        return { message: `Resposta com ID ${id} deletado com sucesso.` };
    } catch (error) {
        console.error("Erro ao deletar dados da resposta:", error.message);
        throw new Error("Erro ao deletar dados da resposta.");
    }
};

module.exports = {
    getAll,
    getById,
    getCandidateIdById,
    getAllByQuestionId,
    createAnswer,
    updateAnswer,
    deleteAnswer,
};
