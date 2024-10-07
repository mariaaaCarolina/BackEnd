const academicDataModel = require("../models/academicDataModel");

const getAll = async (req, res) => {
    try {
        const academicData = await academicDataModel.getAll();
        return res.status(200).json(academicData);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Erro ao buscar dados acadêmico." });
    }
};

const getAcademicDataById = async (req, res) => {
    try {
        const academicData = await academicDataModel.getById(req.params.id);
        if (!academicData) {
            return res
                .status(404)
                .json({ error: "Dados Acadêmicos não encontrados." });
        }
        return res.status(200).json(curriculum);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Erro ao buscar os dados Acadêmicos." });
    }
};

const createAcademicData = async (req, res) => {
    try {
        const newAcademicData = await academicDataModel.createAcademicData(
            req.body
        );
        return res.status(201).json(newAcademicData);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar dado acadêmico." });
    }
};

const updateAcademicData = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const response = await academicDataModel.updateAcademicData(
            id,
            updatedData
        );
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Erro ao atualizar o dado acadêmico." });
    }
};

const deleteAcademicData = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await academicDataModel.deleteAcademicData(id);
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Erro ao deletar o dadoa academico." });
    }
};

module.exports = {
    getAll,
    getAcademicDataById,
    createAcademicData,
    updateAcademicData,
    deleteAcademicData,
};
