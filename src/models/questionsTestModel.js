const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM questions_test");
    return rows;
};

const getById = async (id) => {
    const conn = await connect();
    const [rows] = await conn.query(
        "SELECT * FROM questions_test WHERE id = ?",
        [id]
    );
    return rows[0];
};

const createQuestionTest = async (questionData) => {
    const conn = await connect();
    const { testId, question } = questionData;
    const [result] = await conn.query(
        "INSERT INTO questions_test (test_id, question_text) VALUES (?, ?)",
        [testId, question]
    );
    return { id: result.insertId, ...questionData };
};

const updateQuestionTest = async (id, questionData) => {
    const conn = await connect();
    const { test_id, question_text } = questionData;
    const [result] = await conn.query(
        "UPDATE questions_test SET test_id = ?, question_text = ? WHERE id = ?",
        [test_id, question_text, id]
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
