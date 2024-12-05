const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();

    const query = await conn.query("SELECT * FROM questions");

    return query[0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM questions WHERE id = ?", [
        id,
    ]);
    return query[0][0];
};

const getAllByVacancyId = async (vacancyId) => {
    const conn = await connect();
    const query = await conn.query(
        "SELECT * FROM questions WHERE vacancyId = ?",
        [vacancyId]
    );
    return query[0];
};

const createQuestion = async (questionData) => {
    const conn = await connect();
    const { question, vacancyId } = questionData;
    const [result] = await conn.query(
        `INSERT INTO questions (question, vacancyId) VALUES (?, ?)`,
        [question, vacancyId]
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
            [question, vacancyId, id]
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
