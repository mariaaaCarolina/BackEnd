const messagesModel = require("../models/messagesModel");

const getAll = async (req, res) => {
    const result = await messagesModel.getAll();
    return res.status(200).json(result);
};

const getById = async (req, res) => {
    const id = req.params.id;
    const result = await messagesModel.getById(id);
    return res.status(200).json(result);
};

const createMessage = async (req, res) => {
    const result = await messagesModel.createMessage(req.body);
    return res.status(201).json(result);
};

const updateMessage = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const response = await messagesModel.updateMessage(id, updatedData);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar a mensagem." });
    }
};

const deleteMessage = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await messagesModel.deleteMessage(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao deletar a mensagem." });
    }
};

module.exports = {
    getAll,
    getById,
    createMessage,
    updateMessage,
    deleteMessage,
};
