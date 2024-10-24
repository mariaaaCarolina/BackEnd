const connect = require("../connection");

const getAll = async () => {
    try {
        const conn = await connect();

        const [rows] = await conn.query(`
            SELECT 
                users.id AS id, 
                users.name, 
                users.cpf, 
                users.email, 
                users.phoneNumber, 
                users.password,
                users.curriculumId AS curriculumId
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
        const {
            name,
            cpf,
            email,
            phoneNumber,
            password,
            curriculumId,
            vacancyId,
        } = user;

        const [result] = await conn.query(
            `INSERT INTO users (name, cpf, email, phoneNumber, password, curriculumId, vacancyId) 
            VALUES (?, ?, ?, ?, ?, ?, ?);`,
            [name, cpf, email, phoneNumber, password, curriculumId, vacancyId]
        );
        return { id: result.insertId, ...user };
    } catch (error) {
        console.error("Erro ao criar o usuário :", error.message);
        throw new Error("Erro ao criar o usuário");
    }
};

const updateUser = async (id, user) => {
    const conn = await connect();
    const { name, cpf, email, phoneNumber, password, curriculumId, vacancyId } =
        user;

    const query = `
        UPDATE users 
        SET name = ?, cpf = ?, email = ?, phoneNumber = ?, password = ?, curriculumId = ?, vacancyId = ?
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

const addCurriculum = async (userId, curriculumId) => {
    const conn = await connect();
    const query = "UPDATE users SET curriculumId = ? WHERE id = ?";
    const [result] = await conn.query(query, [curriculumId, userId]);
    return result;
};

module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser,
    addCurriculum,
};
