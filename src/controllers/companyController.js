const companyModel = require("../models/companyModel");

const getAll = async (req, res) => {
    try {
        const companies = await companyModel.getAll();
        return res.status(200).json(companies);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar empresas." });
    }
};

const getCompanyById = async (req, res) => {
    try {
        const company = await companyModel.getById(req.params.id);
        if (!company) {
            return res.status(404).json({ error: "Empresa não encontrado." });
        }
        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar empresa." });
    }
};

const createCompany = async (req, res) => {
    try {
        const newCompany = await companyModel.createCompany(req.body);
        return res.status(201).json(newCompany);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar empresa." });
    }
};

const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedCompany = await companyModel.updateCompany(
            id,
            updatedData
        );
        if (!updatedCompany) {
            return res.status(404).json({ error: "Empresa não encontrado." });
        }
        return res.status(200).json(updatedCompany);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar a empresa." });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await companyModel.deleteCompany(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Empresa não encontrado." });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "Erro ao excluir empresa." });
    }
};

const deleteCompanyData = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await companyModel.deleteCompanyData(id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao excluir dados da empresa:", error);
        res.status(500).json({ error: "Erro ao excluir dados da empresa" });
    }
};

module.exports = {
    getAll,
    createCompany,
    getCompanyById,
    updateCompany,
    deleteCompany,
    deleteCompanyData,
};
