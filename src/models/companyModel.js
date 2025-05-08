const connect = require("../connection");
const { encrypt, decrypt } = require("../crypto");

const getAll = async () => {
    try {
        const conn = await connect();
        const [rows] = await conn.query("SELECT * FROM companies");

        const companies = rows.map((company) => {
            try {
                return {
                    ...company,
                    name: decrypt(company.name),
                    cnpj: decrypt(company.cnpj),
                    address: decrypt(company.address),
                    phoneNumber: decrypt(company.phoneNumber),
                    url: decrypt(company.url),
                };
            } catch (err) {
                console.error(
                    "Erro ao descriptografar campos em getAll:",
                    err.message
                );
                return company;
            }
        });

        return companies;
    } catch (error) {
        console.error("Database error em getAll:", error.message);
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
        try {
            company.name = decrypt(company.name);
            company.cnpj = decrypt(company.cnpj);
            company.address = decrypt(company.address);
            company.phoneNumber = decrypt(company.phoneNumber);
            company.url = decrypt(company.url);
        } catch (err) {
            console.error(
                "Erro ao descriptografar campos em getById:",
                err.message
            );
        }
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

        // Validação simples dos campos obrigatórios
        if (!name || !cnpj || !address || !phoneNumber || !userId) {
            throw new Error(
                "Campos obrigatórios ausentes: name, cnpj, address, phoneNumber, userId"
            );
        }

        // Criptografa os dados (url é opcional)
        const encryptedName = encrypt(name);
        const encryptedCnpj = encrypt(cnpj);
        const encryptedAddress = encrypt(address);
        const encryptedPhoneNumber = encrypt(phoneNumber);
        const encryptedUrl = url ? encrypt(url) : null;

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

        return { userId: result.insertId, ...company };
    } catch (error) {
        console.error("Erro ao criar a empresa:", error.message, error.stack);
        throw new Error(`Erro ao criar a empresa: ${error.message}`);
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

const deleteCompany = async (userId) => {
    const conn = await connect();
    const query = `DELETE FROM companies WHERE userId = ?`;
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
};
