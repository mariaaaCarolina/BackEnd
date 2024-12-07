const questionsModel = require("../models/questionsModel");

const getAll = async (req, res) => {
    const result = await questionsModel.getAll();
    return res.status(200).json(result);
};

const getById = async (req, res) => {
    const id = req.params.id;
    const result = await questionsModel.getById(id);
    return res.status(200).json(result);
};

const getAllByVacancyId = async (req, res) => {
    const { vacancyId } = req.params;
    try {
        const questions = await questionsModel.getAllByVacancyId(vacancyId);
        if (questions.length === 0) {
            return res
                .status(404)
                .json({ error: "Nenhuma pergunta encontrada para esta vaga." });
        }
        return res.status(200).json(questions);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Erro ao buscar perguntas da vaga." });
    }
};

const createQuestion = async (req, res) => {
    const result = await questionsModel.createQuestion(req.body);
    return res.status(201).json(result);
};

const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const response = await questionsModel.updateQuestion(id, updatedData);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar a pergunta." });
    }
};

const deleteQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await questionsModel.deleteQuestion(id);
        return res.status(200).json(response);
    } catch (error) {
        console.error(
            "Erro no controlador ao deletar pergunta:",
            error.message
        );
        return res
            .status(500)
            .json({ error: "Erro ao deletar a pergunta e suas respostas." });
    }
};

module.exports = {
    getAll,
    getById,
    getAllByVacancyId,
    createQuestion,
    updateQuestion,
    deleteQuestion,
};
