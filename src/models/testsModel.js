const connect = require("../connection");
const { encrypt, decrypt } = require("../crypto");

const getAll = async () => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM tests");

    return rows.map((row) => ({
        ...row,
        title: decrypt(row.title),
        description: decrypt(row.description),
    }));
};

const getById = async (id) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM tests WHERE id = ?", [id]);

    if (!rows[0]) return null;

    return {
        ...rows[0],
        title: decrypt(rows[0].title),
        description: decrypt(rows[0].description),
    };
};

const createTest = async (testData) => {
    const conn = await connect();
    const { title, description, duration_minutes } = testData;

    if (!title || typeof title !== "string") {
        throw new Error("Campo 'title' é obrigatório e deve ser uma string.");
    }

    const [result] = await conn.query(
        "INSERT INTO tests (title, description, duration_minutes) VALUES (?, ?, ?)",
        [encrypt(title), encrypt(description), duration_minutes]
    );

    return { id: result.insertId, ...testData };
};

const updateTest = async (id, testData) => {
    const conn = await connect();
    const { title, description, duration_minutes } = testData;

    const [result] = await conn.query(
        "UPDATE tests SET title = ?, description = ?, duration_minutes = ? WHERE id = ?",
        [encrypt(title), encrypt(description), duration_minutes, id]
    );

    if (result.affectedRows === 0)
        throw new Error(`Teste com ID ${id} não encontrado.`);

    return { id, ...testData };
};

const deleteTest = async (id) => {
    const conn = await connect();
    const [result] = await conn.query("DELETE FROM tests WHERE id = ?", [id]);

    if (result.affectedRows === 0)
        throw new Error(`Teste com ID ${id} não encontrado.`);

    return { message: `Teste com ID ${id} deletado com sucesso.` };
};

module.exports = { getAll, getById, createTest, updateTest, deleteTest };
