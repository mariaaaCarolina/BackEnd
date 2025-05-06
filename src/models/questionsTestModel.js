const connect = require("../connection");
const { encrypt, decrypt } = require("../crypto");

const getAll = async () => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM questions_test");

    const decryptedRows = rows.map((row) => ({
        ...row,
        question_text: decrypt(row.question_text),
    }));

    return decryptedRows;
};

const getById = async (id) => {
    const conn = await connect();
    const [rows] = await conn.query(
        "SELECT * FROM questions_test WHERE id = ?",
        [id]
    );

    if (rows[0]) {
        rows[0].question_text = decrypt(rows[0].question_text);
    }

    return rows[0];
};

const createQuestionTest = async (questionData) => {
    const conn = await connect();
    const testId = questionData.test_id || questionData.testId;
    const question = questionData.question_text || questionData.question;

    if (!question || typeof question !== "string") {
        throw new Error(
            "Campo 'question' é obrigatório e deve ser uma string."
        );
    }

    const [result] = await conn.query(
        "INSERT INTO questions_test (test_id, question_text) VALUES (?, ?)",
        [testId, encrypt(question)]
    );
    return { id: result.insertId, testId, question };
};

const updateQuestionTest = async (id, questionData) => {
    const conn = await connect();
    const { test_id, question_text } = questionData;
    const [result] = await conn.query(
        "UPDATE questions_test SET test_id = ?, question_text = ? WHERE id = ?",
        [test_id, encrypt(question_text), id]
    );
    if (result.affectedRows === 0)
        throw new Error(`Questão com ID ${id} não encontrada.`);
    return { id, ...questionData };
};

const deleteQuestionTest = async (id) => {
    const conn = await connect();
    const [result] = await conn.query(
        "DELETE FROM questions_test WHERE id = ?",
        [id]
    );
    if (result.affectedRows === 0)
        throw new Error(`Questão com ID ${id} não encontrada.`);
    return { message: `Questão com ID ${id} deletada com sucesso.` };
};

module.exports = {
    getAll,
    getById,
    createQuestionTest,
    updateQuestionTest,
    deleteQuestionTest,
};
