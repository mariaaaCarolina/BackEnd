const coursesDataModel = require("../models/coursesDataModel");

const getAll = async (req, res) => {
    try {
        const coursesData = await coursesDataModel.getAll();
        return res.status(200).json(coursesData);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar curso." });
    }
};

const getCoursesDataById = async (req, res) => {
    try {
        const coursesData = await coursesDataModel.getById(req.params.id);
        if (!coursesData) {
            return res.status(404).json({ error: "Cursos não encontrados." });
        }
        return res.status(200).json(coursesData);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar os cursos." });
    }
};

const createCourseData = async (req, res) => {
    try {
        const newCourseData = await coursesDataModel.createCourseData(req.body);
        return res.status(201).json(newCourseData);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar curso." });
    }
};

const updateCourseData = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const response = await coursesDataModel.updateCourseData(
            id,
            updatedData
        );
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar o curso." });
    }
};

const deleteCourseData = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await coursesDataModel.deleteCourseData(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao deletar o curso." });
    }
};

module.exports = {
    getAll,
    getCoursesDataById,
    createCourseData,
    updateCourseData,
    deleteCourseData,
};
