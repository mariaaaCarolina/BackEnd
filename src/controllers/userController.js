const userModel = require("../models/userModel");

const getAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar usuários." });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userModel.getById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar usuário." });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = await userModel.createUser(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar usuário." });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedUser = await userModel.updateUser(id, updatedData);
        if (!updatedUser) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userModel.deleteUser(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "Erro ao excluir usuário." });
    }
};

const addCurriculum = async (req, res) => {
    const userId = req.params.id;
    const { curriculumId } = req.body;

    try {
        const result = await userModel.addCurriculum(userId, curriculumId);
        if (result.affectedRows > 0) {
            return res
                .status(200)
                .send({ message: "Currículo atualizado com sucesso." });
        } else {
            return res.status(404).send({ message: "Usuário não encontrado." });
        }
    } catch (error) {
        return res
            .status(500)
            .send({
                message: "Erro ao atualizar currículo",
                error: error.message,
            });
    }
};

module.exports = {
    getAll,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addCurriculum,
};
