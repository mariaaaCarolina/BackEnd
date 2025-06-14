const connect = require("../connection");
const { encrypt, decrypt } = require("../crypto");

const getAll = async () => {
    try {
        const conn = await connect();
        const [rows] = await conn.query("SELECT * FROM companies");

        const companies = rows.map((company) => ({
            ...company,
            name: decrypt(company.name),
            cnpj: decrypt(company.cnpj),
            address: decrypt(company.address),
            phoneNumber: decrypt(company.phoneNumber),
            url: decrypt(company.url),
        }));
        return companies;
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Could not retrieve companies");
    }
};

const getById = async (userId) => {
    const conn = await connect();
    const [[company]] = await conn.query(
        "SELECT * FROM companies WHERE userId = ?",
        [userId]
    );

    if (company) {
        company.name = decrypt(company.name);
        company.cnpj = decrypt(company.cnpj);
        company.address = decrypt(company.address);
        company.phoneNumber = decrypt(company.phoneNumber);
        company.url = decrypt(company.url);
    }

    return company;
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

        const encryptedName = encrypt(name);
        const encryptedCnpj = encrypt(cnpj);
        const encryptedAddress = encrypt(address);
        const encryptedPhoneNumber = encrypt(phoneNumber);
        const encryptedUrl = encrypt(url);

        const [result] = await conn.query(
            `INSERT INTO companies (name, cnpj, segment, responsible, phoneNumber, city, cep, address, addressNumber, uf, url, logo, userId) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                encryptedName,
                encryptedCnpj,
                segment,
                responsible,
                encryptedPhoneNumber,
                city,
                cep,
                encryptedAddress,
                addressNumber,
                uf,
                encryptedUrl,
                logo,
                userId,
            ]
        );

        return {
            id: result.insertId,
            userId,
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
        };
    } catch (error) {
        console.error("Erro ao criar a empresa:", error.message);
        throw new Error("Erro ao criar a empresa");
    }
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

    const encryptedName = encrypt(name);
    const encryptedCnpj = encrypt(cnpj);
    const encryptedAddress = encrypt(address);
    const encryptedPhoneNumber = encrypt(phoneNumber);
    const encryptedUrl = encrypt(url);

    const query = `
        UPDATE companies 
        SET name = ?, cnpj = ?, segment = ?, responsible = ?, 
            phoneNumber = ?, city = ?, cep = ?, address = ?, addressNumber = ?, 
            uf = ?, url = ?, logo = ?
        WHERE userId = ?
    `;

    const [result] = await conn.query(query, [
        encryptedName,
        encryptedCnpj,
        segment,
        responsible,
        encryptedPhoneNumber,
        city,
        cep,
        encryptedAddress,
        addressNumber,
        uf,
        encryptedUrl,
        logo,
        userId,
    ]);

    return result.affectedRows ? { userId, ...company } : null;
};

const updateIsPremium = async (userId, isPremium) => {
    const conn = await connect();
    try {
        const [result] = await conn.query(
            `UPDATE companies SET isPremium = ? WHERE userId = ?;`,
            [isPremium, userId]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Empresa com ID ${userId} não encontrada.`);
        }

        return { userId, isPremium };
    } catch (error) {
        console.error(
            "Erro ao atualizar o status da empresa para premium:",
            error.message
        );
        throw new Error("Erro ao atualizar o status da empresa para premium.");
    }
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
        const [vacancies] = await conn.query(
            "SELECT id FROM vacancies WHERE companyId IN (SELECT id FROM companies WHERE userId = ?)",
            [userId]
        );
        const vacancyIds = vacancies.map((v) => v.id);

        if (vacancyIds.length > 0) {
            const [questions] = await conn.query(
                `SELECT id FROM questions WHERE vacancyId IN (${vacancyIds
                    .map(() => "?")
                    .join(",")})`,
                vacancyIds
            );
            const questionIds = questions.map((q) => q.id);

            if (questionIds.length > 0) {
                await conn.query(
                    `DELETE FROM answers WHERE questionId IN (${questionIds
                        .map(() => "?")
                        .join(",")})`,
                    questionIds
                );
                await conn.query(
                    `DELETE FROM questions WHERE id IN (${questionIds
                        .map(() => "?")
                        .join(",")})`,
                    questionIds
                );
            }

            await conn.query(
                `DELETE FROM applications WHERE vacancyId IN (${vacancyIds
                    .map(() => "?")
                    .join(",")})`,
                vacancyIds
            );

            await conn.query(
                `DELETE FROM vacancies WHERE id IN (${vacancyIds
                    .map(() => "?")
                    .join(",")})`,
                vacancyIds
            );
        }
        await conn.query("DELETE FROM companies WHERE userId = ?", [userId]);

        await conn.query("DELETE FROM users WHERE id = ?", [userId]);

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
    updateIsPremium,
};
