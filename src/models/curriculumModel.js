const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM curriculum");
    return query[0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM curriculum WHERE id = ?", [
        id,
    ]);
    return query[0][0]; // Retorna um único usuário
};

const createCurriculum = async (curriculum) => {
    const conn = await connect();
    try {
        const {
            dateOfBirth,
            age,
            gender,
            race,
            city,
            address,
            addressNumber,
            cep,
            uf,
            attached,
            description,
            schoolName,
            schoolYear,
            schoolCity,
            schoolStartDate,
            schoolEndDate,
            isCurrentlyStudying,
            userId,
        } = curriculum;

        const [result] = await conn.query(
            `INSERT INTO curriculum (dateOfBirth, age, gender, race, city, 
            attached, description, schoolName, schoolYear, schoolCity, schoolStartDate, schoolEndDate, isCurrentlyStudying, 
            address, addressNumber, cep, uf, userId) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                dateOfBirth,
                age,
                gender,
                race,
                city,
                attached,
                description,
                schoolName,
                schoolYear,
                schoolCity,
                schoolStartDate,
                schoolEndDate,
                isCurrentlyStudying,
                address,
                addressNumber,
                cep,
                uf,
                userId, // userId para associar o currículo ao usuário
            ]
        );

        return { id: result.insertId, ...curriculum };
    } catch (error) {
        console.error("Erro ao criar o currículo:", error.message);
        throw new Error("Erro ao criar o currículo");
    }
};

module.exports = { getAll, getById, createCurriculum };
