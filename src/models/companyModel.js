const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM companies");
    return query[0];
};

const createCompany = async (company) => {
    const conn = await connect();
    try {
        const {
            name,
            cnpj,
            segment,
            responsible,
            phoneNumber,
            city,
            cep,
            address,
            addressNumber,
            uf,
            url,
            logo,
            userId,
        } = company;

        const [result] = await conn.query(
            `INSERT INTO companies (name, cnpj, segment, responsible, phoneNumber, city, cep, address, addressNumber, uf, url, logo, userId) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                cnpj,
                segment,
                responsible,
                phoneNumber,
                city,
                cep,
                address,
                addressNumber,
                uf,
                url,
                logo,
                userId,
            ]
        );
        return { userId: result.insertId, ...company };
    } catch (error) {
        console.error("Erro ao criar a empresa:", error.message);
        throw new Error("Erro ao criar a empresa");
    }
};

const getById = async (userId) => {
    const conn = await connect();
    const [rows] = await conn.query(
        "SELECT * FROM companies WHERE userId = ?",
        [userId]
    );
    if (rows.length === 0) throw new Error("Empresa não encontrada.");
    return rows[0];
};

const updateCompany = async (userId, company) => {
    const conn = await connect();
    const {
        name,
        cnpj,
        segment,
        responsible,
        phoneNumber,
        city,
        cep,
        address,
        addressNumber,
        uf,
        url,
        logo,
    } = company;

    const query = `
        UPDATE companies 
        SET name = ?, cnpj = ?, segment = ?, responsible = ?, 
            phoneNumber = ?, city = ?, cep = ?, address = ?, addressNumber = ?, 
            uf = ?, url = ?, logo = ?
        WHERE userId = ?
    `;

    const [result] = await conn.query(query, [
        name,
        cnpj,
        segment,
        responsible,
        phoneNumber,
        city,
        cep,
        address,
        addressNumber,
        uf,
        url,
        logo,
        userId,
    ]);

    return result.affectedRows ? { userId, ...company } : null;
};

const deleteCompany = async (userId) => {
    const conn = await connect();
    const query = `
        DELETE FROM companies 
        WHERE userId = ?
    `;
    const [result] = await conn.query(query, [userId]);
    return result;
};

const deleteCompanyData = async (userId) => {
    const conn = await connect();
    try {
        // todos `vacancyId` relacionados
        const [vacancies] = await conn.query(
            "SELECT id FROM vacancy WHERE companyId IN (SELECT id FROM companies WHERE userId = ?)",
            [userId]
        );
        const vacancyIds = vacancies.map((vacancy) => vacancy.id);

        if (vacancyIds.length > 0) {
            // todas as `questionId` associadas às vagas da empresa
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
            await conn.query(
                "DELETE FROM applications WHERE vacancyId IN (?)",
                [vacancyIds]
            );

            // vagas da empresa
            await conn.query(
                "DELETE FROM vacancies WHERE companyId IN (SELECT id FROM companies WHERE userId = ?)",
                [userId]
            );
        }

        // empresa
        await conn.query("DELETE FROM companies WHERE userId = ?", [userId]);

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
