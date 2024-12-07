const vacancyModel = require("../models/vacancyModel");

const getAll = async (req, res) => {
    try {
        const vacancy = await vacancyModel.getAll();
        return res.status(200).json(vacancy);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar vaga." });
    }
};

const getVacanciesById = async (req, res) => {
    try {
        const vacancies = await vacancyModel.getById(req.params.id);
        if (!vacancies) {
            return res.status(404).json({ error: "Vaga não encontrada." });
        }
        return res.status(200).json(vacancies);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar a vaga." });
    }
};

const createVacancy = async (req, res) => {
    try {
        const vacancyData = req.body;
        const newVacancy = await vacancyModel.createVacancy(vacancyData);
        return res.status(200).json(newVacancy);
    } catch (error) {
        console.error("Erro ao criar vaga:", error.message);
        return res.status(500).json({ error: "Erro ao criar a vaga." });
    }
};

const updateVacancy = async (req, res) => {
    const { id } = req.params;
    const vacancyData = req.body;

    try {
        const updatedVacancy = await vacancyModel.updateVacancy(
            id,
            vacancyData
        );
        return res.status(200).json(updatedVacancy);
    } catch (error) {
        console.error("Erro ao atualizar vaga:", error.message);
        return res
            .status(500)
            .json({ error: "Erro ao atualizar a vaga teste." });
    }
};

const updateIsActive = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
    if (typeof isActive !== "boolean") {
        return res
            .status(400)
            .json({ error: "O campo 'isActive' deve ser um valor booleano." });
    }

    try {
        const result = await vacancyModel.updateIsActive(id, isActive);
        res.status(200).json({
            message: `Status da vaga com ID ${id} atualizado com sucesso.`,
            vacancy: result,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateIsFilled = async (req, res) => {
    const { id } = req.params;
    const { isFilled } = req.body;

    if (typeof isFilled !== "boolean") {
        return res
            .status(400)
            .json({ error: "O campo 'isFilled' deve ser um valor booleano." });
    }

    try {
        const result = await vacancyModel.updateIsFilled(id, isFilled);
        res.status(200).json({
            message: `Status de preenchimento da vaga com ID ${id} atualizado com sucesso.`,
            vacancy: result,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteVacancy = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await vacancyModel.deleteVacancy(id);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Erro ao deletar vaga:", error.message);
        return res.status(500).json({ error: "Erro ao deletar a vaga." });
    }
};

module.exports = {
    getAll,
    getVacanciesById,
    createVacancy,
    updateVacancy,
    deleteVacancy,
    updateIsActive,
    updateIsFilled,
};
