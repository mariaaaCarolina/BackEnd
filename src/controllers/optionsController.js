const optionsModel = require("../models/optionsModel");

const getAll = async (req, res) => {
    try {
        const data = await optionsModel.getAll();
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao buscar opções:", error);
        res.status(500).json({ error: "Erro ao buscar opções." });
    }
};

const getById = async (req, res) => {
    try {
        const data = await optionsModel.getById(req.params.id);
        if (!data)
            return res.status(404).json({ error: "Opção não encontrada." });
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao buscar opção:", error);
        res.status(500).json({ error: "Erro ao buscar opção." });
    }
};

const createOption = async (req, res) => {
    try {
        const data = await optionsModel.createOption(req.body);
        res.status(201).json(data);
    } catch (error) {
        console.error("Erro ao criar opção:", error);
        res.status(500).json({
            error: "Erro ao criar opção.",
            details: error.message,
        });
    }
};

const updateOption = async (req, res) => {
    try {
        const data = await optionsModel.updateOption(req.params.id, req.body);
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao atualizar opção:", error);
        res.status(500).json({ error: "Erro ao atualizar opção." });
    }
};

const deleteOption = async (req, res) => {
    try {
        const data = await optionsModel.deleteOption(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao deletar opção:", error);
        res.status(500).json({ error: "Erro ao deletar opção." });
    }
};

module.exports = { getAll, getById, createOption, updateOption, deleteOption };
