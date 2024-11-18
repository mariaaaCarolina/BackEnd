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
        const { id } = req.params;
        const company = await companyModel.getById(id); // Recupera a empresa do banco

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
        const companyData = req.body;

        // Se um arquivo foi enviado, salve o caminho no banco
        if (req.file) {
            companyData.logo = `/uploads/images/${req.file.filename}`;
        }

        const newCompany = await companyModel.createCompany(companyData);
        return res.status(201).json(newCompany);
    } catch (error) {
        console.error("Erro ao criar a empresa:", error);
        return res.status(500).json({ error: "Erro ao criar a empresa." });
    }
};

const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const companyData = req.body;

        // Se um arquivo foi enviado, atualize o caminho no banco
        if (req.file) {
            companyData.logo = `/uploads/images/${req.file.filename}`;
        }

        const updatedCompany = await companyModel.updateCompany(
            id,
            companyData
        );
        if (!updatedCompany) {
            return res.status(404).json({ error: "Empresa não encontrada." });
        }
        return res.status(200).json(updatedCompany);
    } catch (error) {
        console.error("Erro ao atualizar a empresa:", error);
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
