const connect = require("../connection");
const { encrypt, decrypt } = require("../crypto");

const getAll = async () => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM curriculums;");

    const decryptedRows = rows.map((curriculum) => ({
        ...curriculum,
        address: decrypt(curriculum.address),
        description: decrypt(curriculum.description),
        attached: decrypt(curriculum.attached),
        schoolName: decrypt(curriculum.schoolName),
        schoolCity: decrypt(curriculum.schoolCity),
        interestArea: decrypt(curriculum.interestArea),
        city: decrypt(curriculum.city),
    }));

    return decryptedRows;
};

const getById = async (id) => {
    const conn = await connect();
    const [[curriculum]] = await conn.query(
        "SELECT * FROM curriculums WHERE id = ?",
        [id]
    );

    if (curriculum) {
        curriculum.address = decrypt(curriculum.address);
        curriculum.description = decrypt(curriculum.description);
        curriculum.attached = decrypt(curriculum.attached);
        curriculum.schoolName = decrypt(curriculum.schoolName);
        curriculum.schoolCity = decrypt(curriculum.schoolCity);
        curriculum.interestArea = decrypt(curriculum.interestArea);
        curriculum.city = decrypt(curriculum.city);
    }

    return curriculum;
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

        const attached = curriculum.attached
            ? encrypt(curriculum.attached)
            : null;

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
                encrypt(city),
                attached,
                encrypt(description),
                encrypt(address),
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
                encrypt(city),
                encrypt(address),
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
                encrypt(schoolName),
                schoolYear,
                encrypt(schoolCity),
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
        encrypt(description),
        encrypt(attached),
        encrypt(interestArea),
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
