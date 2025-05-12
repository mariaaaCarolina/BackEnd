const connect = require("../connection");
const { encrypt, decrypt } = require("../crypto");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM academicData");

    const academicData = query[0].map((data) => ({
        ...data,
        institutionName: decrypt(data.institutionName),
        city: decrypt(data.city),
    }));

    return academicData;
};

const getById = async (id) => {
    const conn = await connect();
    const [rows] = await conn.query(
        "SELECT * FROM academicData WHERE curriculumId = ?",
        [id]
    );

    if (!rows || rows.length === 0) {
        return [];
    }

    const decryptedList = rows.map((data) => ({
        ...data,
        institutionName: decrypt(data.institutionName),
        city: decrypt(data.city),
    }));

    return decryptedList;
};

const createAcademicData = async (academicData) => {
    const conn = await connect();
    try {
        const {
            name,
            semester,
            startDate,
            endDate,
            isCurrentlyStudying,
            institutionName,
            degree,
            city,
            curriculumId,
        } = academicData;

        const encryptedInstitutionName = encrypt(institutionName);
        const encryptedCity = encrypt(city);

        const [result] = await conn.query(
            `INSERT INTO academicData (name, semester, startDate, endDate, isCurrentlyStudying, 
            institutionName, degree, city, curriculumId) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                name,
                semester,
                startDate,
                endDate,
                isCurrentlyStudying,
                encryptedInstitutionName,
                degree,
                encryptedCity,
                curriculumId,
            ]
        );

        return { id: result.insertId, ...academicData };
    } catch (error) {
        console.error("Erro ao criar dados acadêmicos:", error.message);
        throw new Error("Erro ao criar dados acadêmicos.");
    }
};

const updateAcademicData = async (id, academicData) => {
    const conn = await connect();
    try {
        const {
            name,
            semester,
            startDate,
            endDate,
            isCurrentlyStudying,
            institutionName,
            degree,
            city,
            curriculumId,
        } = academicData;

        const encryptedInstitutionName = encrypt(institutionName);
        const encryptedCity = encrypt(city);

        const [result] = await conn.query(
            `UPDATE academicData 
            SET name = ?, semester = ?, startDate = ?, endDate = ?, isCurrentlyStudying = ?, 
                institutionName = ?, degree = ?, city = ?, curriculumId = ? 
            WHERE id = ?;`,
            [
                name,
                semester,
                startDate,
                endDate,
                isCurrentlyStudying,
                encryptedInstitutionName,
                degree,
                encryptedCity,
                curriculumId,
                id,
            ]
        );

        if (result.affectedRows === 0) {
            throw new Error(
                "Nenhum dado acadêmico foi atualizado. Verifique o ID."
            );
        }

        return { id, ...academicData };
    } catch (error) {
        console.error("Erro ao atualizar dados acadêmicos:", error.message);
        throw new Error("Erro ao atualizar dados acadêmicos.");
    }
};

const deleteAcademicData = async (id) => {
    const conn = await connect();

    try {
        const [result] = await conn.query(
            "DELETE FROM academicData WHERE id = ?",
            [id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Dado acadêmico com ID ${id} não encontrado.`);
        }

        return {
            message: `Dado acadêmico com ID ${id} foi removido com sucesso.`,
        };
    } catch (error) {
        console.error("Erro ao deletar o dado acadêmico:", error.message);
        throw new Error("Erro ao deletar o dado acadêmico.");
    }
};

module.exports = {
    getAll,
    getById,
    createAcademicData,
    deleteAcademicData,
    updateAcademicData,
};
