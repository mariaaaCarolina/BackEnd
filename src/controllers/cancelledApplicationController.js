const cancelledApplicationModel = require("../models/cancelledApplicationModel");

const getAll = async (req, res) => {
    try {
        const applications = await cancelledApplicationModel.getAll();
        return res.status(200).json(applications);
    } catch (error) {
        console.error(
            "Erro ao buscar todas as candidaturas canceladas:",
            error.message
        );
        return res
            .status(500)
            .json({ error: "Erro ao buscar candidaturas canceladas." });
    }
};

const getCancelledApplicationById = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res
                .status(400)
                .json({ error: "O parâmetro id é obrigatório." });
        }

        const cancelledApplication = await cancelledApplicationModel.getById(
            userId
        );

        if (!cancelledApplication) {
            return res
                .status(404)
                .json({ error: "Cancelamento da candidatura não encontrado." });
        }

        return res.status(200).json(cancelledApplication);
    } catch (error) {
        console.error(
            "Erro ao buscar cancelamento da candidatura:",
            error.message
        );
        return res
            .status(500)
            .json({ error: "Erro ao buscar cancelamento da candidatura." });
    }
};

const createCancelledApplication = async (req, res) => {
    try {
        const { vacancyId, userId } = req.body;

        if (!vacancyId || !userId) {
            return res.status(400).json({
                error: "Os campos vacancyId e userId são obrigatórios.",
            });
        }

        const newCancelledApplication =
            await cancelledApplicationModel.createCancelledApplication(
                req.body
            );
        return res.status(201).json(newCancelledApplication);
    } catch (error) {
        console.error("Erro ao criar candidatura cancelada:", error.message);
        return res
            .status(500)
            .json({ error: "Erro ao criar uma candidatura cancelada." });
    }
};

const updateCancelledApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { vacancyId, userId } = req.body;

        if (!id || !vacancyId || !userId) {
            return res.status(400).json({
                error: "Os campos id, vacancyId e userId são obrigatórios.",
            });
        }

        const updatedCancelledApplication =
            await cancelledApplicationModel.updateCancelledApplication(id, {
                vacancyId,
                userId,
            });

        if (!updatedCancelledApplication) {
            return res
                .status(404)
                .json({ error: "Candidatura cancelada não encontrada." });
        }

        return res.status(200).json(updatedCancelledApplication);
    } catch (error) {
        console.error(
            "Erro ao atualizar candidatura cancelada:",
            error.message
        );
        return res.status(500).json({
            error: "Erro ao atualizar o cancelamento da candidatura.",
        });
    }
};

const deleteCancelledApplication = async (req, res) => {
    try {
        const { userId, vacancyId } = req.params;

        if (!userId || !vacancyId) {
            return res.status(400).json({
                error: "Os parâmetros userId e vacancyId são obrigatórios.",
            });
        }

        const result =
            await cancelledApplicationModel.deleteCancelledApplication(
                userId,
                vacancyId
            );

        if (result.affectedRows === 0) {
            return res
                .status(404)
                .json({ error: "Candidatura cancelada não encontrada." });
        }

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: "Erro ao excluir candidatura cancelada." });
    }
};

module.exports = {
    getAll,
    getCancelledApplicationById,
    createCancelledApplication,
    updateCancelledApplication,
    deleteCancelledApplication,
};
