const connect = require("../connection");
const { encrypt, decrypt } = require("../crypto");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM coursesData");

    const courses = query[0].map((course) => ({
        ...course,
        name: decrypt(course.name),
        modality: decrypt(course.modality),
        duration: decrypt(course.duration),
        institutionName: decrypt(course.institutionName),
    }));

    return courses;
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query(
        "SELECT * FROM coursesData WHERE curriculumId = ?",
        [id]
    );

    const courses = query[0].map((course) => ({
        ...course,
        name: decrypt(course.name),
        modality: decrypt(course.modality),
        duration: decrypt(course.duration),
        institutionName: decrypt(course.institutionName),
    }));

    return courses;
};

const createCourseData = async (courseData) => {
    const conn = await connect();
    try {
        const {
            name,
            modality,
            duration,
            endDate,
            isCurrentlyStudying,
            institutionName,
            curriculumId,
        } = courseData;

        const encryptedData = {
            name: encrypt(name),
            modality: encrypt(modality),
            duration: encrypt(duration),
            institutionName: encrypt(institutionName),
        };

        const [result] = await conn.query(
            "INSERT INTO coursesData (name, modality, duration, endDate, isCurrentlyStudying, institutionName, curriculumId) VALUES (?, ?, ?, ?, ?, ?, ?);",
            [
                encryptedData.name,
                encryptedData.modality,
                encryptedData.duration,
                endDate,
                isCurrentlyStudying,
                encryptedData.institutionName,
                curriculumId,
            ]
        );

        return { id: result.insertId, ...courseData };
    } catch (error) {
        console.error("Erro ao criar dados do curso:", error.message);
        throw new Error("Erro ao criar dados do curso.");
    }
};

const updateCourseData = async (id, courseData) => {
    const conn = await connect();
    try {
        const {
            name,
            modality,
            duration,
            endDate,
            isCurrentlyStudying,
            institutionName,
            curriculumId,
        } = courseData;

        const encryptedData = {
            name: encrypt(name),
            modality: encrypt(modality),
            duration: encrypt(duration),
            institutionName: encrypt(institutionName),
        };

        const [result] = await conn.query(
            "UPDATE coursesData SET name = ?, modality = ?, duration = ?, endDate = ?, isCurrentlyStudying = ?, institutionName = ?, curriculumId = ? WHERE id = ?;",
            [
                encryptedData.name,
                encryptedData.modality,
                encryptedData.duration,
                endDate,
                isCurrentlyStudying,
                encryptedData.institutionName,
                curriculumId,
                id,
            ]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Curso com ID ${id} não encontrado.`);
        }

        return { id, ...courseData };
    } catch (error) {
        console.error("Erro ao atualizar dados do curso:", error.message);
        throw new Error("Erro ao atualizar dados do curso.");
    }
};

const deleteCourseData = async (id) => {
    const conn = await connect();
    try {
        const [result] = await conn.query(
            "DELETE FROM coursesData WHERE id = ?;",
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Curso com ID ${id} não encontrado.`);
        }

        return { message: `Curso com ID ${id} deletado com sucesso.` };
    } catch (error) {
        console.error("Erro ao deletar dados do curso:", error.message);
        throw new Error("Erro ao deletar dados do curso.");
    }
};

module.exports = {
    getAll,
    getById,
    createCourseData,
    deleteCourseData,
    updateCourseData,
};
