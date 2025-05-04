const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM user_test_results");
    return rows;
};

const getById = async (id) => {
    const conn = await connect();
    const [rows] = await conn.query(
        "SELECT * FROM user_test_results WHERE id = ?",
        [id]
    );
    return rows[0];
};

const createUserTestResult = async (resultData) => {
    const conn = await connect();
    const {
        candidate_id,
        test_id,
        score,
        total_questions,
        time_taken_seconds,
    } = resultData;
    const [result] = await conn.query(
        "INSERT INTO user_test_results (candidate_id, test_id, score, total_questions, time_taken_seconds) VALUES (?, ?, ?, ?, ?)",
        [candidate_id, test_id, score, total_questions, time_taken_seconds]
    );
    return { id: result.insertId, ...resultData };
};

const updateUserTestResult = async (id, resultData) => {
    const conn = await connect();
    const {
        candidate_id,
        test_id,
        score,
        total_questions,
        time_taken_seconds,
    } = resultData;
    const [result] = await conn.query(
        "UPDATE user_test_results SET candidate_id = ?, test_id = ?, score = ?, total_questions = ?, time_taken_seconds = ? WHERE id = ?",
        [candidate_id, test_id, score, total_questions, time_taken_seconds, id]
    );
    if (result.affectedRows === 0)
        throw new Error(`Resultado com ID ${id} não encontrado.`);
    return { id, ...resultData };
};

const deleteUserTestResult = async (id) => {
    const conn = await connect();
    const [result] = await conn.query(
        "DELETE FROM user_test_results WHERE id = ?",
        [id]
    );
    if (result.affectedRows === 0)
        throw new Error(`Resultado com ID ${id} não encontrado.`);
    return { message: `Resultado com ID ${id} deletado com sucesso.` };
};

module.exports = {
    getAll,
    getById,
    createUserTestResult,
    updateUserTestResult,
    deleteUserTestResult,
};
