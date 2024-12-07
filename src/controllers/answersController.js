const answersModel = require("../models/answersModel");

const getAll = async (req, res) => {
    const result = await answersModel.getAll();
    return res.status(200).json(result);
};

const getById = async (req, res) => {
    const id = req.params.id;
    const result = await answersModel.getById(id);
    return res.status(200).json(result);
};

const getAllByQuestionId = async (req, res) => {
    const { questionId } = req.params;
    try {
        const answers = await answersModel.getAllByQuestionId(questionId);
        if (answers.length === 0) {
            return res
                .status(404)
                .json({
                    error: "Nenhuma resposta encontrada para esta pergunta.",
                });
        }
        return res.status(200).json(answers);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Erro ao buscar respostas da pergunta." });
    }
};

const createAnswer = async (req, res) => {
    const result = await answersModel.createAnswer(req.body);
    return res.status(201).json(result);
};

const updateAnswer = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const response = await answersModel.updateAnswer(id, updatedData);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar a resposta." });
    }
};

const deleteAnswer = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await answersModel.deleteAnswer(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao deletar a resposta." });
    }
};

module.exports = {
    getAll,
    getById,
    getAllByQuestionId,
    createAnswer,
    updateAnswer,
    deleteAnswer,
};
