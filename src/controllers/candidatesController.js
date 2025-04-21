const candidatesModel = require("../models/candidatesModel");

const getAll = async (req, res) => {
    try {
        const candidates = await candidatesModel.getAll();
        return res.status(200).json(candidates);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar candidatos." });
    }
};

const getCandidateById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Id recebido:", id);
        const candidate = await candidatesModel.getById(Number(id));
        if (!candidate) {
            return res.status(404).json({ error: "Candidato não encontrado." });
        }
        return res.status(200).json(candidate);
    } catch (error) {
        console.error("Erro:", error);
        return res.status(500).json({ error: "Erro ao buscar candidato." });
    }
};

const getCandidateByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("userId recebido:", userId);
        const candidate = await candidatesModel.getByUserId(Number(userId));
        if (!candidate) {
            return res.status(404).json({ error: "Candidato não encontrado." });
        }
        return res.status(200).json(candidate);
    } catch (error) {
        console.error("Erro:", error);
        return res.status(500).json({ error: "Erro ao buscar candidato." });
    }
};

const createCandidate = async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.cpf ||
            !req.body.email ||
            !req.body.phoneNumber ||
            !req.body.password
        ) {
            console.log("Campos obrigatórios estão ausentes.");
        }

        const newCandidate = await candidatesModel.createCandidate(req.body);
        console.log("Candidato criado com sucesso:", newCandidate);
        return res.status(201).json(newCandidate);
    } catch (error) {
        console.error("Erro ao criar candidato:", error.message, error.stack);
        return res
            .status(500)
            .json({ error: error.message, stack: error.stack });
    }
};

const updateCandidate = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;
        const updateCandidate = await candidatesModel.updateCandidate(
            userId,
            updatedData
        );
        if (!updateCandidate) {
            return res.status(404).json({ error: "Candidato não encontrado." });
        }
        return res.status(200).json(updateCandidate);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar candidato." });
    }
};

const deleteCandidate = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await candidatesModel.deleteCandidate(userId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Candidato não encontrado." });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "Erro ao excluir candidato." });
    }
};

const addCurriculum = async (req, res) => {
    const id = req.params.id;
    const { curriculumId } = req.body;

    try {
        const result = await candidatesModel.addCurriculum(id, curriculumId);
        if (result.affectedRows > 0) {
            return res
                .status(200)
                .send({ message: "Currículo atualizado com sucesso." });
        } else {
            return res
                .status(404)
                .send({ message: "Candidato não encontrado." });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao atualizar currículo",
            error: error.message,
        });
    }
};

const deleteCandidateData = async (req, res) => {
    const { userId, curriculumId } = req.params;

    if (!userId || !curriculumId) {
        return res
            .status(400)
            .json({ error: "userId e curriculumId são obrigatórios" });
    }

    try {
        const result = await candidatesModel.deleteCandidateData(
            userId,
            curriculumId
        );
        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao excluir dados do candidato e currículo:", error);
        res.status(500).json({
            error: "Erro ao excluir dados do candidato e currículo",
        });
    }
};

module.exports = {
    getAll,
    getCandidateById,
    getCandidateByUserId,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    deleteCandidateData,
    addCurriculum,
};
