const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM companies");
    return query[0];
};

const createCompany = async (company, logoFilename) => {
    const conn = await connect();
    try {
        const normalizedCompany = { ...company };

        const {
            name,
            cnpj,
            segment,
            responsible,
            email,
            phoneNumber,
            city,
            cep,
            address,
            addressNumber,
            uf,
            password,
            url,
        } = normalizedCompany;

        const logoUrl = `${
            process.env.BASE_URL ||
            "https://backend-production-ff1f.up.railway.app"
        }/images/${logoFilename}`;

        const [result] = await conn.query(
            `INSERT INTO companies (name, cnpj, segment, responsible, email, phoneNumber, city, cep, address, addressNumber, uf, password, url, logo) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                cnpj,
                segment,
                responsible,
                email,
                phoneNumber,
                city,
                cep,
                address,
                addressNumber,
                uf,
                password,
                url,
                logoUrl,
            ]
        );

        return { id: result.insertId, ...normalizedCompany, logo: logoUrl };
    } catch (error) {
        console.error("Erro ao criar a empresa:", error.message);
        throw new Error("Erro ao criar a empresa.");
    }
};

const getById = async (id) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM companies WHERE id = ?", [
        id,
    ]);
    if (rows.length === 0) throw new Error("Empresa não encontrada.");
    return rows[0];
};

const updateCompany = async (id, company) => {
    const conn = await connect();
    try {
        const normalizedCompany = { ...company };

        const {
            name,
            cnpj,
            segment,
            responsible,
            email,
            phoneNumber,
            city,
            cep,
            address,
            addressNumber,
            uf,
            password,
            url,
            logo,
        } = normalizedCompany;

        const query = `
            UPDATE companies
            SET name = ?, cnpj = ?, segment = ?, responsible = ?, email = ?, phoneNumber = ?, city = ?, cep = ?, address = ?, addressNumber = ?, uf = ?, password = ?, url = ?, logo = ?
            WHERE id = ?`;

        const [result] = await conn.query(query, [
            name,
            cnpj,
            segment,
            responsible,
            email,
            phoneNumber,
            city,
            cep,
            address,
            addressNumber,
            uf,
            password,
            url,
            logo,
            id,
        ]);

        return result.affectedRows ? { id, ...normalizedCompany } : null;
    } catch (error) {
        console.error("Erro ao atualizar a empresa:", error.message);
        throw new Error("Erro ao atualizar a empresa");
    }
};

const deleteCompany = async (id) => {
    const conn = await connect();
    const query = `
        DELETE FROM companies 
        WHERE id = ?
    `;
    const [result] = await conn.query(query, [id]);
    return result;
};

const deleteCompanyData = async (companyId) => {
    const conn = await connect();
    try {
        // todos `vacancyId` relacionados
        const [vacancies] = await conn.query(
            "SELECT id FROM vacancy WHERE companyId = ?",
            [companyId]
        );
        const vacancyIds = vacancies.map((vacancy) => vacancy.id);

        if (vacancyIds.length > 0) {
            // todos as `questionId` associadas às vagas da empresa
            const [questions] = await conn.query(
                "SELECT id FROM questions WHERE vacancyId IN (?)",
                [vacancyIds]
            );
            const questionIds = questions.map((question) => question.id);

            if (questionIds.length > 0) {
                // respostas associadas às perguntas
                await conn.query(
                    "DELETE FROM answers WHERE questionId IN (?)",
                    [questionIds]
                );

                // perguntas associadas às vagas
                await conn.query("DELETE FROM questions WHERE id IN (?)", [
                    questionIds,
                ]);
            }

            // candidaturas associadas às vagas
            await conn.query("DELETE FROM application WHERE vacancyId IN (?)", [
                vacancyIds,
            ]);

            // vagas da empresa
            await conn.query("DELETE FROM vacancy WHERE companyId = ?", [
                companyId,
            ]);
        }

        // empresa
        await conn.query("DELETE FROM companies WHERE id = ?", [companyId]);

        return { message: "Dados excluídos com sucesso." };
    } catch (error) {
        console.error("Erro ao excluir dados:", error);
        throw new Error("Erro ao excluir dados da empresa");
    }
};

module.exports = {
    getAll,
    createCompany,
    getById,
    updateCompany,
    deleteCompany,
    deleteCompanyData,
};
