const competencesModel = require("../models/competencesModel");

const getAll = async (req, res) => {
    try {
        const competences = await competencesModel.getAll();
        return res.status(200).json(competences);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar competência." });
    }
};

const getCompetencesById = async (req, res) => {
    try {
        const competences = await competencesModel.getById(req.params.id);
        if (!competences) {
            return res
                .status(404)
                .json({ error: "Competência não encontrada." });
        }
        return res.status(200).json(competences);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar a competência." });
    }
};

const createCompetence = async (req, res) => {
    try {
        const newCompetence = await competencesModel.createCompetence(req.body);
        return res.status(201).json(newCompetence);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar competência." });
    }
};

module.exports = {
    getAll,
    getCompetencesById,
    createCompetence,
    // updateCompetence,
    // deleteCompetence,
};
