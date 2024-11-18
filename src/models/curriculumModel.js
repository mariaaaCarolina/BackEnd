const { query } = require("express");
const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM curriculum;");
    return query[0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM curriculum WHERE id = ?", [
        id,
    ]);
    return query[0][0];
};

const createCurriculum = async (curriculum) => {
    const conn = await connect();
    try {
        const {
            id,
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

            userId,
        } = curriculum;

        const [result] = await conn.query(
            `INSERT INTO curriculum (id, dateOfBirth, age, gender, race, city, 
            attached, description,  
            address, addressNumber, cep, uf, userId) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                id,
                dateOfBirth,
                age,
                gender,
                race,
                city,
                attached,
                description,
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

const updateCurriculum = async (id, updatedCurriculum) => {
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
        } = updatedCurriculum;

        const [result] = await conn.query(
            `UPDATE curriculum 
            SET dateOfBirth = ?, age = ?, gender = ?, race = ?, city = ?, address = ?, addressNumber = ?, 
            cep = ?, uf = ?, attached = ?, description = ? 
            WHERE id = ?`,
            [
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
                id,
            ]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Currículo com ID ${id} não encontrado.`);
        }

        return {
            message: `Currículo com ID ${id} foi atualizado com sucesso.`,
        };
    } catch (error) {
        console.error("Erro ao atualizar o currículo:", error.message);
        throw new Error("Erro ao atualizar o currículo.");
    }
};

const deleteCurriculum = async (id) => {
    const conn = await connect();

    try {
        const [result] = await conn.query(
            "DELETE FROM curriculum WHERE id = ?",
            [id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Currículo com ID ${id} não encontrado.`);
        }

        return { message: `Currículo com ID ${id} foi removido com sucesso.` };
    } catch (error) {
        console.error("Erro ao deletar o currículo:", error.message);
        throw new Error("Erro ao deletar o currículo.");
    }
};

const addSchoolData = async (userId, data) => {
    const conn = await connect();
    const {
        schoolName,
        schoolYear,
        schoolCity,
        schoolStartDate,
        schoolEndDate,
        isCurrentlyStudying,
    } = data;

    const query = await conn.query(
        "UPDATE curriculum SET schoolName = ?, schoolYear = ?, schoolCity = ?, schoolStartDate = ?, schoolEndDate = ?, isCurrentlyStudying = ? WHERE id = ? ",
        [
            schoolName,
            schoolYear,
            schoolCity,
            schoolStartDate,
            schoolEndDate,
            isCurrentlyStudying,
            userId,
        ]
    );
    return query[0];
};

const addDataToCurriculum = async (userId, data) => {
    const conn = await connect();
    const { description, attached } = data;
    const query =
        "UPDATE curriculum SET description = ?, attached = ? WHERE id = ?";
    const [result] = await conn.query(query, [description, attached, userId]);
    return result;
};

module.exports = {
    getAll,
    getById,
    createCurriculum,
    deleteCurriculum,
    updateCurriculum,
    addDataToCurriculum,
    addSchoolData,
};
