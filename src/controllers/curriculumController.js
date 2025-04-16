const curriculumModel = require("../models/curriculumModel");

const getAll = async (req, res) => {
    try {
        const curriculum = await curriculumModel.getAll();
        return res.status(200).json(curriculum);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar curriculo." });
    }
};

const getCurriculumById = async (req, res) => {
    try {
        const curriculum = await curriculumModel.getById(req.params.id);
        if (!curriculum) {
            return res.status(404).json({ error: "Curriculo não encontrado." });
        }
        return res.status(200).json(curriculum);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar curriculo." });
    }
};

const createCurriculum = async (req, res) => {
    try {
        const newCurriculum = await curriculumModel.createCurriculum(req.body);
        return res.status(201).json(newCurriculum);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar curriculo." });
    }
};

const updateCurriculum = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const response = await curriculumModel.updateCurriculum(
            id,
            updatedData
        );
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Erro ao atualizar o currículo." });
    }
};

const deleteCurriculum = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await curriculumModel.deleteCurriculum(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao deletar o currículo." });
    }
};

const addDataToCurriculum = async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await curriculumModel.addDataToCurriculum(
            userId,
            req.body
        );

        if (!response) {
            return res.status(404).json({ error: "Currículo não encontrado." });
        }

        return res
            .status(200)
            .json({ message: "Dados adicionados com sucesso.", response });
    } catch (error) {
        console.error("Erro ao adicionar dados ao currículo:", error); // <-- Aqui está o log do erro
        return res
            .status(500)
            .json({ error: "Erro ao adicionar dados ao currículo." });
    }
};

const addSchoolData = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await curriculumModel.addSchoolData(id, req.body);

        if (!response) {
            return res.status(404).json({ error: "Currículo não encontrado." });
        }

        return res.status(200).json({
            message: "Dados escolares adicionados com sucesso.",
            response,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Erro ao adicionar dados escolares ao currículo." });
    }
};

module.exports = {
    getAll,
    getCurriculumById,
    createCurriculum,
    updateCurriculum,
    deleteCurriculum,
    addDataToCurriculum,
    addSchoolData,
};
