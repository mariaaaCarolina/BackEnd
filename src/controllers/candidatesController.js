const candidateModel = require("../models/candidatesModel");

const getAll = async (req, res) => {
    try {
        const candidate = await candidateModel.getAll();
        return res.status(200).json(candidate);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar candidatos." });
    }
};

const getCandidateById = async (req, res) => {
    try {
        const candidate = await candidateModel.getById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ error: "Candidato não encontrado." });
        }
        return res.status(200).json(candidate);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar candidato." });
    }
};

const createCandidate = async (req, res) => {
    try {
        const newCandidate = await candidatesModel.createCandidate(req.body);
        return res.status(201).json(newCandidate);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar candidato." });
    }
};

const updateCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updateCandidate = await candidatesModel.updateCandidate(
            id,
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
        const { id } = req.params;
        const result = await candidatesModel.deleteCandidate(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Candidato não encontrado." });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "Erro ao excluir candidato." });
    }
};

const addCurriculum = async (req, res) => {
    const candidateId = req.params.id;
    const { curriculumId } = req.body;

    try {
        const result = await candidatesModel.addCurriculum(
            candidateId,
            curriculumId
        );
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
    const { candidateId, curriculumId } = req.params;

    if (!candidateId || !curriculumId) {
        return res
            .status(400)
            .json({ error: "canadidateId e curriculumId são obrigatórios" });
    }

    try {
        const result = await candidatesModel.deleteCandidateData(
            candidateId,
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
    createCandidate,
    updateCandidate,
    deleteCandidate,
    deleteCandidateData,
    addCurriculum,
};
