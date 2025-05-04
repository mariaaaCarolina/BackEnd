const testsModel = require("../models/testsModel");

const getAll = async (req, res) => {
    try {
        const data = await testsModel.getAll();
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao buscar testes:", error);
        res.status(500).json({ error: "Erro ao buscar testes." });
    }
};

const getById = async (req, res) => {
    try {
        const data = await testsModel.getById(req.params.id);
        if (!data)
            return res.status(404).json({ error: "Teste não encontrado." });
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao buscar teste:", error);
        res.status(500).json({ error: "Erro ao buscar teste." });
    }
};

const createTest = async (req, res) => {
    try {
        const data = await testsModel.createTest(req.body);
        res.status(201).json(data);
    } catch (error) {
        console.error("Erro ao criar teste:", error);
        res.status(500).json({ error: "Erro ao criar teste." });
    }
};

const updateTest = async (req, res) => {
    try {
        const data = await testsModel.updateTest(req.params.id, req.body);
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao atualizar teste:", error);
        res.status(500).json({ error: "Erro ao atualizar teste." });
    }
};

const deleteTest = async (req, res) => {
    try {
        const data = await testsModel.deleteTest(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao deletar teste:", error);
        res.status(500).json({ error: "Erro ao deletar teste." });
    }
};

module.exports = { getAll, getById, createTest, updateTest, deleteTest };
