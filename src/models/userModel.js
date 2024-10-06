const connect = require("../connection");

const getAll = async () => {
    try {
        const conn = await connect();
        const [rows] = await conn.query("SELECT * FROM users");
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
        const {
            name,
            cpf,
            email,
            phoneNumber,
            password,
            curriculumId,
            vacancyId,
            userId,
        } = user;

        const [result] = await conn.query(
            `INSERT INTO users (name, cpf, email, phoneNumber, password, curriculumId, vacancyId, userId) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                cpf,
                email,
                phoneNumber,
                password,
                curriculumId,
                vacancyId,
                userId,
            ]
        );
        return { id: result.insertId, ...user };
    } catch (error) {
        console.error("Erro ao criar o usuário :", error.message);
        throw new Error("Erro ao criar o usuário");
    }
};

const updateUser = async (id, user) => {
    const conn = await connect();
    const {
        name,
        cpf,
        email,
        phoneNumber,
        password,
        curriculumId,
        vacancyId,
        userId,
    } = user;

    const query = `
        UPDATE users 
        SET name = ?, cpf = ?, email = ?, phoneNumber = ?, password = ?, curriculumId = ?, vacancyId = ?, userId = ?
        WHERE id = ?
    `;

    const [result] = await conn.query(query, [
        name,
        cpf,
        email,
        phoneNumber,
        password,
        curriculumId,
        vacancyId,
        userId,
        id,
    ]);

    return result.affectedRows ? { id, ...user } : null;
};

const deleteUser = async (id) => {
    const conn = await connect();
    const query = `
        DELETE FROM users 
        WHERE id = ?
    `;
    const [result] = await conn.query(query, [id]);
    return result;
};

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
