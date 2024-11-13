const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM academicData");
    return query[0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query(
        "SELECT * FROM academicData WHERE curriculumId = ?",
        [id]
    );
    return query[0];
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
            curriculumId, // referenciar o currículo associado
        } = academicData;

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
                institutionName,
                degree,
                city,
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
                institutionName,
                degree,
                city,
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
            throw new Error(`Dado academico com ID ${id} não encontrado.`);
        }

        return {
            message: `Dado academico com ID ${id} foi removido com sucesso.`,
        };
    } catch (error) {
        console.error("Erro ao deletar o dado academico:", error.message);
        throw new Error("Erro ao deletar o dado academico.");
    }
};

module.exports = {
    getAll,
    getById,
    createAcademicData,
    deleteAcademicData,
    updateAcademicData,
};
