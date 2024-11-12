const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();

    const query = await conn.query("SELECT * FROM messages");

    return query[0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM messages WHERE id = ?", [id]);
    return query[0][0];
};

const createMessage = async (messageData) => {
    const conn = await connect();
    const { sender_id, content, sender_name } = messageData;
    const [result] = await conn.query(
        `INSERT INTO messages (sender_id, content, sender_name) VALUES (?, ?, ?)`,
        [sender_id, content, sender_name]
    );
    console.log("Message Data:", messageData);
    return { id: result.insertId, ...messageData };
};

const updateMessage = async (id, message) => {
    const conn = await connect();
    try {
        const { sender_id, content, sender_name } = message;

        const [result] = await conn.query(
            `UPDATE messages SET sender_id = ?, content = ?, sender_name = ? WHERE id = ?;`,
            [sender_id, content, sender_name, id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Mensagem com ID ${id} não encontrado.`);
        }

        return { id, ...message };
    } catch (error) {
        console.error("Erro ao atualizar dados da mensagem:", error.message);
        throw new Error("Erro ao atualizar dados da mensagem.");
    }
};

const deleteMessage = async (id) => {
    const conn = await connect();
    try {
        const [result] = await conn.query(
            `DELETE FROM messages WHERE id = ?;`,
            [id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Mensagem com ID ${id} não encontrada.`);
        }

        return { message: `Mensagem com ID ${id} deletada com sucesso.` };
    } catch (error) {
        console.error("Erro ao deletar dados da mensagem:", error.message);
        return {
            message: "Erro ao deletar dados da mensagem.",
            error: error.message,
        };
    }
};

module.exports = {
    getAll,
    getById,
    createMessage,
    updateMessage,
    deleteMessage,
};
