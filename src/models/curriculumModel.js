const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM curriculums;");
    return query[0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM curriculums WHERE id = ?", [
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
        } = curriculum;

        const attached = curriculum.attached ? curriculum.attached : null;

        const [result] = await conn.query(
            `INSERT INTO curriculums (id, dateOfBirth, age, gender, race, city, 
                attached, description,  
                address, addressNumber, cep, uf) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
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
            ]
        );

        return { id: result.insertId, ...curriculum };
    } catch (error) {
        console.error("Erro ao criar o currículo:", error.message);
        throw new Error("Erro ao criar o currículo");
    }
};

const updateCurriculum = async (id, curriculum) => {
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
        } = curriculum;

        const [result] = await conn.query(
            `UPDATE curriculums
             SET dateOfBirth = ?, age = ?, gender = ?, race = ?, city = ?, address = ?, addressNumber = ?, 
             cep = ?, uf = ? 
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
            "DELETE FROM curriculums WHERE id = ?",
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
    try {
        const conn = await connect();

        const {
            schoolName,
            schoolYear,
            schoolCity,
            schoolStartDate,
            schoolEndDate,
            isCurrentlyStudying,
        } = data;

        if (!schoolName || !schoolCity || !schoolStartDate) {
            throw new Error("Campos obrigatórios estão faltando.");
        }

        const [existing] = await conn.query(
            "SELECT id FROM curriculums WHERE id = ?",
            [userId]
        );

        if (existing.length === 0) {
            throw new Error("Currículo não encontrado.");
        }

        const [result] = await conn.query(
            "UPDATE curriculums SET schoolName = ?, schoolYear = ?, schoolCity = ?, schoolStartDate = ?, schoolEndDate = ?, isCurrentlyStudying = ? WHERE id = ?",
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

        return result;
    } catch (error) {
        console.error("Erro ao adicionar dados escolares:", error.message);
        throw error;
    }
};

const addDataToCurriculum = async (userId, data) => {
    const conn = await connect();
    const { description, attached, interestArea } = data;
    const query =
        "UPDATE curriculums SET description = ?, attached = ?, interestArea = ? WHERE id = ?";
    const [result] = await conn.query(query, [
        description,
        attached,
        interestArea,
        userId,
    ]);
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
