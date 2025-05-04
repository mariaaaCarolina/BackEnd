const questionsTestModel = require("../models/questionsTestModel");

const getAll = async (req, res) => {
    try {
        const data = await questionsTestModel.getAll();
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao buscar questões:", error);
        res.status(500).json({ error: "Erro ao buscar questões." });
    }
};

const getById = async (req, res) => {
    try {
        const data = await questionsTestModel.getById(req.params.id);
        if (!data)
            return res.status(404).json({ error: "Questão não encontrada." });
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao buscar questão:", error);
        res.status(500).json({ error: "Erro ao buscar questão." });
    }
};

const createQuestionTest = async (req, res) => {
    try {
        const data = await questionsTestModel.createQuestionTest(req.body);
        res.status(201).json(data);
    } catch (error) {
        console.error("Erro ao criar questão:", error);
        res.status(500).json({ error: "Erro ao criar questão." });
    }
};

const updateQuestionTest = async (req, res) => {
    try {
        const data = await questionsTestModel.updateQuestionTest(
            req.params.id,
            req.body
        );
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao atualizar questão:", error);
        res.status(500).json({ error: "Erro ao atualizar questão." });
    }
};

const deleteQuestionTest = async (req, res) => {
    try {
        const data = await questionsTestModel.deleteQuestionTest(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao deletar questão:", error);
        res.status(500).json({ error: "Erro ao deletar questão." });
    }
};

module.exports = {
    getAll,
    getById,
    createQuestionTest,
    updateQuestionTest,
    deleteQuestionTest,
};
