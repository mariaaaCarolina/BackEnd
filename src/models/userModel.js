const connect = require("../connection");
const bcrypt = require("bcrypt");
const { encrypt, decrypt } = require("../crypto");

const getAll = async () => {
    try {
        const conn = await connect();
        const [rows] = await conn.query(
            `SELECT id, email, password, type FROM users`
        );
        const users = rows.map((user) => ({
            ...user,
            email: decrypt(user.email),
        }));
        return users;
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Could not retrieve users");
    }
};

const getById = async (id) => {
    const conn = await connect();
    const [[user]] = await conn.query("SELECT * FROM users WHERE id = ?", [id]);

    if (user) {
        user.email = decrypt(user.email);
    }

    return user;
};

const createUser = async (user) => {
    const conn = await connect();
    try {
        const { email, password, type } = user;

        const hashedPassword = await bcrypt.hash(password, 10);
        const encryptedEmail = encrypt(email);

        const [result] = await conn.query(
            `INSERT INTO users (email, password, type) VALUES (?, ?, ?);`,
            [encryptedEmail, hashedPassword, type]
        );
        console.log("EMAIL ORIGINAL:", email);
        console.log("EMAIL ENCRYPTED:", encryptedEmail);
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

        const encryptedEmail = encrypt(email);
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            UPDATE users 
            SET email = ?, password = ?, type = ?
            WHERE id = ?
        `;

        const [result] = await conn.query(query, [
            encryptedEmail,
            hashedPassword,
            type,
            id,
        ]);

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

const getByEmail = async (email) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM users");

    for (const user of rows) {
        const decryptedEmail = decrypt(user.email);
        if (decryptedEmail === email) {
            return {
                ...user,
                email: decryptedEmail,
            };
        }
    }

    return null;
};

module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser,
    getByEmail,
};
