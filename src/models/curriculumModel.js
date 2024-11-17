// const { query } = require("express");
// const multer = require("multer");
// const path = require("path");
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
            description,
            userId,
        } = curriculum;

        const attached = curriculum.attached ? curriculum.attached : null;

        const [userCheck] = await conn.query(
            "SELECT id FROM users WHERE id = ?",
            [userId]
        );

        if (userCheck.length === 0) {
            throw new Error(
                `O userId ${userId} não existe. Verifique o ID do usuário.`
            );
        }

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
                userId,
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
            schoolName,
            schoolYear,
            schoolCity,
            schoolStartDate,
            schoolEndDate,
            isCurrentlyStudying,
            userId,
        } = updatedCurriculum;

        let updatedAttached = attached;

        if (!attached) {
            const existingCurriculum = await getById(id);
            updatedAttached = existingCurriculum.attached;
        }

        const [result] = await conn.query(
            `UPDATE curriculum 
             SET dateOfBirth = ?, age = ?, gender = ?, race = ?, city = ?, address = ?, addressNumber = ?, 
             cep = ?, uf = ?, attached = ?, description = ?, schoolName = ?, schoolYear = ?, 
             schoolCity = ?, schoolStartDate = ?, schoolEndDate = ?, isCurrentlyStudying = ?, userId = ? 
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
                updatedAttached,
                description,
                schoolName,
                schoolYear,
                schoolCity,
                schoolStartDate,
                schoolEndDate,
                isCurrentlyStudying,
                userId,
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
