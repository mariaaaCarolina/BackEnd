const userTestResultsModel = require("../models/userTestResultsModel");

const getAll = async (req, res) => {
    try {
        const data = await userTestResultsModel.getAll();
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao buscar resultados:", error);
        res.status(500).json({ error: "Erro ao buscar resultados." });
    }
};

const getById = async (req, res) => {
    try {
        const data = await userTestResultsModel.getById(req.params.id);
        if (!data)
            return res.status(404).json({ error: "Resultado não encontrado." });
        res.status(200).json(data);
    } catch (error) {
        console.error(
            `Erro ao buscar resultado com ID ${req.params.id}:`,
            error
        );
        res.status(500).json({ error: "Erro ao buscar resultado." });
    }
};

const createUserTestResult = async (req, res) => {
    try {
        const data = await userTestResultsModel.createUserTestResult(req.body);
        res.status(201).json(data);
    } catch (error) {
        console.error("Erro ao criar resultado:", error);
        res.status(500).json({ error: "Erro ao criar resultado." });
    }
};

const updateUserTestResult = async (req, res) => {
    try {
        const data = await userTestResultsModel.updateUserTestResult(
            req.params.id,
            req.body
        );
        res.status(200).json(data);
    } catch (error) {
        console.error(
            `Erro ao atualizar resultado com ID ${req.params.id}:`,
            error
        );
        res.status(500).json({ error: "Erro ao atualizar resultado." });
    }
};

const deleteUserTestResult = async (req, res) => {
    try {
        const data = await userTestResultsModel.deleteUserTestResult(
            req.params.id
        );
        res.status(200).json(data);
    } catch (error) {
        console.error(
            `Erro ao deletar resultado com ID ${req.params.id}:`,
            error
        );
        res.status(500).json({ error: "Erro ao deletar resultado." });
    }
};

module.exports = {
    getAll,
    getById,
    createUserTestResult,
    updateUserTestResult,
    deleteUserTestResult,
};
