const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM options");
    return rows;
};

const getById = async (id) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM options WHERE id = ?", [id]);
    return rows[0];
};

const createOption = async (optionData) => {
    const conn = await connect();
    const { question_test_id, option_text, is_correct } = optionData;
    const [result] = await conn.query(
        "INSERT INTO options (question_test_id, option_text, is_correct ) VALUES (?, ?, ?)",
        [question_test_id, option_text, is_correct]
    );
    return { id: result.insertId, ...optionData };
};

const updateOption = async (id, optionData) => {
    const conn = await connect();
    const { question_test_id, option_text, is_correct } = optionData;
    const [result] = await conn.query(
        "UPDATE options SET question_test_id = ?, option_text = ?, is_correct = ? WHERE id = ?",
        [question_test_id, option_text, is_correct, id]
    );
    if (result.affectedRows === 0)
        throw new Error(`Opção com ID ${id} não encontrada.`);
    return { id, ...optionData };
};

const deleteOption = async (id) => {
    const conn = await connect();
    const [result] = await conn.query("DELETE FROM options WHERE id = ?", [id]);
    if (result.affectedRows === 0)
        throw new Error(`Opção com ID ${id} não encontrada.`);
    return { message: `Opção com ID ${id} deletada com sucesso.` };
};

module.exports = { getAll, getById, createOption, updateOption, deleteOption };
