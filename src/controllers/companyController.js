const companyModel = require("../models/companyModel");

const getAll = async (req, res) => {
    try {
        const companies = await companyModel.getAll(); // Recupera todas as empresas do banco

        // Atualiza o campo logo para cada empresa
        const updatedCompanies = companies.map((company) => {
            return {
                ...company,
                logo: `${req.protocol}://${req.get("host")}${company.logo}`,
            };
        });

        return res.status(200).json(updatedCompanies); // Retorna as empresas com os logos atualizados
    } catch (error) {
        console.error("Erro ao buscar empresas:", error);
        return res.status(500).json({ error: "Erro ao buscar empresas." });
    }
};

const getCompanyById = async (req, res) => {
    try {
        const { userId } = req.params;
        const company = await companyModel.getById(userId); // Recupera a empresa do banco

        if (!company) {
            return res.status(404).json({ error: "Empresa não encontrada." });
        }
        company.logo = `${req.protocol}://${req.get("host")}${company.logo}`;

        return res.status(200).json(company); // Retorna a empresa com o logo atualizado
    } catch (error) {
        console.error("Erro ao buscar empresa:", error);
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
        const { userId } = req.params;
        const companyData = req.body;

        if (!userId || !companyData) {
            return res.status(400).json({
                error: "User ID e dados da empresa são obrigatórios.",
            });
        }

        const updatedCompany = await companyModel.updateCompany(
            userId,
            companyData
        );

        if (updatedCompany) {
            return res.status(200).json({
                message: "Empresa atualizada com sucesso.",
                data: updatedCompany,
            });
        } else {
            return res.status(404).json({ error: "Empresa não encontrada." });
        }
    } catch (error) {
        console.error("Erro ao atualizar empresa:", error);
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await companyModel.deleteCompany(userId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Empresa não encontrada." });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "Erro ao excluir empresa." });
    }
};

const deleteCompanyData = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await companyModel.deleteCompanyData(userId);
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
