//teste
const connect = require("../connection");
const bcrypt = require("bcrypt");

const getAll = async () => {
    try {
        const conn = await connect();
        const [rows] = await conn.query(`
            SELECT id, email, password, type 
            FROM users
        `);
        return rows;
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Could not retrieve users");
    }
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
    return query[0][0]; // Retorna um único usuário
};

const createUser = async (user) => {
    const conn = await connect();
    try {
        const { email, password, type } = user;

        const [result] = await conn.query(
            `INSERT INTO users (email, password, type) VALUES (?, ?, ?);`,
            [email, password, type]
        );
        return { id: result.insertId, email, type };
    } catch (error) {
        console.error("Erro ao criar usuário: ", error.message);
        throw new Error("Erro ao criar usuário");
    }
};

const updateUser = async (id, user) => {
    const conn = await connect();
    try {
        const { email, password, type } = user;

        const query = `
            UPDATE users 
            SET email = ?, password = ?, type = ?
            WHERE id = ?
        `;

        const [result] = await conn.query(query, [email, password, type, id]);

        return result.affectedRows ? { id, email, type } : null;
    } catch (error) {
        console.error("Erro ao atualizar usuário: ", error.message);
        throw new Error("Erro ao atualizar usuário");
    }
};

const deleteUser = async (id) => {
    const conn = await connect();
    try {
        const [result] = await conn.query("DELETE FROM users WHERE id = ?", [
            id,
        ]);
        return result;
    } catch (error) {
        console.error("Erro ao excluir usuário: ", error);
        throw new Error("Erro ao excluir usuário");
    }
};

module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser,
};
