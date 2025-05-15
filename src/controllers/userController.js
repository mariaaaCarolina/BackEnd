const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../jwt");

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

        const token = generateToken({
            id: newUser.id,
            type: newUser.type,
        });

        return res.status(201).json({
            user: newUser,
            token,
        });
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

const updateUserEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedUser = await userModel.updateUserEmail(id, updatedData);

        if (!updatedUser) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Erro ao atualizar email do usuário." });
    }
};

const updateUserPassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    try {
        const success = await userModel.updateUserPassword(
            id,
            currentPassword,
            newPassword
        );

        if (!success) {
            return res.status(400).json({ error: "Falha ao atualizar senha." });
        }

        return res
            .status(200)
            .json({ message: "Senha atualizada com sucesso." });
    } catch (error) {
        return res.status(400).json({ error: error.message });
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

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.getByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        const token = generateToken({ id: user.id, type: user.type });
        const userResponse = {
            id: user.id,
            email,
            type: user.type,
        };

        return res.status(200).json({ user: userResponse, token });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: "Erro ao fazer login." });
    }
};

module.exports = {
    getAll,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    updateUserEmail,
    updateUserPassword,
};
