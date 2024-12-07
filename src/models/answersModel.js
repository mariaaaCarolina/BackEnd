const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();

    const query = await conn.query("SELECT * FROM answers");

    return query[0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM answers WHERE id = ?", [id]);
    return query[0][0];
};

const getAllByQuestionId = async (questionId) => {
    const conn = await connect();
    const query = await conn.query(
        "SELECT * FROM answers WHERE questionId = ?",
        [questionId]
    );
    return query[0];
};

const createAnswer = async (answerData) => {
    const conn = await connect();
    const { answer, questionId, userId } = answerData;
    const [result] = await conn.query(
        `INSERT INTO answers (answer, questionId, userId) VALUES (?, ?, ?)`,
        [answer, questionId, userId]
    );
    console.log("Answer Data:", answerData);
    return { id: result.insertId, ...answerData };
};

const updateAnswer = async (id, answers) => {
    const conn = await connect();
    try {
        const { answer, questionId, userId } = answers;

        const [result] = await conn.query(
            `UPDATE answers SET answer = ?, questionId = ?, userId = ? WHERE id = ?;`,
            [answer, questionId, userId, id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Resposta com ID ${id} não encontrado.`);
        }

        return { id, ...answers };
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
    getAllByQuestionId,
    createAnswer,
    updateAnswer,
    deleteAnswer,
};
