const applicationModel = require("../models/applicationModel");

const getAll = async (req, res) => {
    try {
        const applications = await applicationModel.getAll();
        return res.status(200).json(applications);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar candidatura." });
    }
};

const getApplicationById = async (req, res) => {
    try {
        const applications = await applicationModel.getById(req.params.id);
        if (!applications) {
            return res
                .status(404)
                .json({ error: "Candidatura não encontrada." });
        }
        return res.status(200).json(applications);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar candidatura." });
    }
};

const createApplication = async (req, res) => {
    try {
        const newApplication = await applicationModel.createApplication(
            req.body
        );
        return res.status(201).json(newApplication);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar candidatura." });
    }
};

const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedApplication = await applicationModel.updateApplication(
            id,
            updatedData
        );
        if (!updatedApplication) {
            return res
                .status(404)
                .json({ error: "Candidatura não encontrada." });
        }
        return res.status(200).json(updatedApplication);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Erro ao atualizar a candidatura." });
    }
};

const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await applicationModel.deleteApplication(id);
        if (result.affectedRows === 0) {
            return res
                .status(404)
                .json({ error: "Candidatura não encontrado." });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "Erro ao excluir candidatura." });
    }
};

module.exports = {
    getAll,
    createApplication,
    getApplicationById,
    updateApplication,
    deleteApplication,
};
