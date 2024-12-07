const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM coursesData");
    return query[0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query(
        "SELECT * FROM coursesData WHERE curriculumId = ?",
        [id]
    );
    return query[0];
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

        const [result] = await conn.query(
            `INSERT INTO coursesData (name, modality, duration, endDate, isCurrentlyStudying, 
            institutionName, curriculumId) 
            VALUES (?, ?, ?, ?, ?, ?, ?);`,
            [
                name,
                modality,
                duration,
                endDate,
                isCurrentlyStudying,
                institutionName,
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

        const [result] = await conn.query(
            `UPDATE coursesData SET name = ?, modality = ?, duration = ?, endDate = ?, 
            isCurrentlyStudying = ?, institutionName = ?, curriculumId = ? WHERE id = ?;`,
            [
                name,
                modality,
                duration,
                endDate,
                isCurrentlyStudying,
                institutionName,
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
            `DELETE FROM coursesData WHERE id = ?;`,
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
