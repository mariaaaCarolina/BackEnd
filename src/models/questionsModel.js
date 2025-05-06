const connect = require("../connection");
const { encrypt, decrypt } = require("../crypto");

const getAll = async () => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM questions");

    const decryptedRows = rows.map((row) => ({
        ...row,
        question: decrypt(row.question),
    }));

    return decryptedRows;
};

const getById = async (id) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM questions WHERE id = ?", [
        id,
    ]);

    if (rows[0]) {
        rows[0].question = decrypt(rows[0].question);
    }

    return rows[0];
};

const getAllByVacancyId = async (vacancyId) => {
    const conn = await connect();
    const [rows] = await conn.query(
        "SELECT * FROM questions WHERE vacancyId = ?",
        [vacancyId]
    );

    const decryptedRows = rows.map((row) => ({
        ...row,
        question: decrypt(row.question),
    }));

    return decryptedRows;
};

const createQuestion = async (questionData) => {
    const conn = await connect();
    const { question, vacancyId } = questionData;

    const [result] = await conn.query(
        `INSERT INTO questions (question, vacancyId) VALUES (?, ?)`,
        [encrypt(question), vacancyId]
    );

    console.log("Question Data:", questionData);

    return { id: result.insertId, ...questionData };
};

const updateQuestion = async (id, questions) => {
    const conn = await connect();
    try {
        const { question, vacancyId } = questions;

        const [result] = await conn.query(
            `UPDATE questions SET question = ?, vacancyId = ? WHERE id = ?;`,
            [encrypt(question), vacancyId, id]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Pergunta com ID ${id} não encontrado.`);
        }

        return { id, ...questions };
    } catch (error) {
        console.error("Erro ao atualizar dados da pergunta:", error.message);
        throw new Error("Erro ao atualizar dados da pergunta.");
    }
};

const deleteQuestion = async (id) => {
    const conn = await connect();
    try {
        await conn.beginTransaction();

        await conn.query(`DELETE FROM answers WHERE questionId = ?;`, [id]);

        const [result] = await conn.query(
            `DELETE FROM questions WHERE id = ?;`,
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Pergunta com ID ${id} não encontrada.`);
        }

        await conn.commit();

        return {
            message: `Pergunta com ID ${id} deletada com sucesso, incluindo suas respostas.`,
        };
    } catch (error) {
        await conn.rollback();
        console.error(
            "Erro ao deletar pergunta e respostas associadas:",
            error.message
        );
        throw new Error("Erro ao deletar a pergunta e respostas associadas.");
    }
};

module.exports = {
    getAll,
    getById,
    getAllByVacancyId,
    createQuestion,
    updateQuestion,
    deleteQuestion,
};
