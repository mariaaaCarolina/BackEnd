const connect = require("../connection");
const { encrypt, decrypt } = require("../crypto");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM vacancies");

    return query[0].map((row) => ({
        ...row,
        title: decrypt(row.title),
        description: decrypt(row.description),
        aboutCompany: decrypt(row.aboutCompany),
        benefits: decrypt(row.benefits),
        requirements: decrypt(row.requirements),
        modality: decrypt(row.modality),
        locality: decrypt(row.locality),
        uf: decrypt(row.uf),
        contact: decrypt(row.contact),
        salary: decrypt(row.salary),
        level: decrypt(row.level),
        companyName: decrypt(row.companyName),
    }));
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query(`SELECT * FROM vacancies WHERE id = ?`, [
        id,
    ]);
    const vacancy = query[0][0];

    if (vacancy) {
        vacancy.title = decrypt(vacancy.title);
        vacancy.description = decrypt(vacancy.description);
        vacancy.aboutCompany = decrypt(vacancy.aboutCompany);
        vacancy.benefits = decrypt(vacancy.benefits);
        vacancy.requirements = decrypt(vacancy.requirements);
        vacancy.modality = decrypt(vacancy.modality);
        vacancy.locality = decrypt(vacancy.locality);
        vacancy.uf = decrypt(vacancy.uf);
        vacancy.contact = decrypt(vacancy.contact);
        vacancy.salary = decrypt(vacancy.salary);
        vacancy.level = decrypt(vacancy.level);
        vacancy.companyName = decrypt(vacancy.companyName);
    }

    return vacancy;
};

const createVacancy = async (vacancy) => {
    const conn = await connect();
    try {
        const {
            title,
            description,
            aboutCompany,
            benefits,
            requirements,
            modality,
            locality,
            uf,
            contact,
            salary,
            level,
            companyId,
            companyName,
        } = vacancy;

        const encryptedTitle = encrypt(title);
        const encryptedDescription = encrypt(description);
        const encryptedAboutCompany = encrypt(aboutCompany);
        const encryptedBenefits = encrypt(benefits);
        const encryptedRequirements = encrypt(requirements);
        const encryptedModality = encrypt(modality);
        const encryptedLocality = encrypt(locality);
        const encryptedUf = encrypt(uf);
        const encryptedContact = encrypt(contact);
        const encryptedSalary = encrypt(salary.toString());
        const encryptedLevel = encrypt(level);
        const encryptedCompanyName = encrypt(companyName);

        const query = `INSERT INTO vacancies (title, description, aboutCompany, benefits, 
            requirements, modality, locality, uf, contact, salary, level, companyId, companyName) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        const values = [
            encryptedTitle,
            encryptedDescription,
            encryptedAboutCompany,
            encryptedBenefits,
            encryptedRequirements,
            encryptedModality,
            encryptedLocality,
            encryptedUf,
            encryptedContact,
            encryptedSalary,
            encryptedLevel,
            companyId,
            encryptedCompanyName,
        ];

        const [result] = await conn.query(query, values);

        return { id: result.insertId, ...vacancy };
    } catch (error) {
        console.error("Erro ao criar a vaga:", error.message);
        throw new Error("Erro ao criar a vaga.");
    }
};

const updateVacancy = async (id, vacancyData) => {
    const conn = await connect();
    try {
        const {
            title,
            description,
            aboutCompany,
            benefits,
            requirements,
            modality,
            locality,
            uf,
            contact,
            salary,
            level,
            companyId,
            companyName,
        } = vacancyData;

        const encryptedTitle = encrypt(title);
        const encryptedDescription = encrypt(description);
        const encryptedAboutCompany = encrypt(aboutCompany);
        const encryptedBenefits = encrypt(benefits);
        const encryptedRequirements = encrypt(requirements);
        const encryptedModality = encrypt(modality);
        const encryptedLocality = encrypt(locality);
        const encryptedUf = encrypt(uf);
        const encryptedContact = encrypt(contact);
        const encryptedSalary = encrypt(salary.toString());
        const encryptedLevel = encrypt(level);
        const encryptedCompanyName = encrypt(companyName);

        const [result] = await conn.query(
            `UPDATE vacancies SET 
                title = ?, 
                description = ?, 
                aboutCompany = ?, 
                benefits = ?, 
                requirements = ?, 
                modality = ?, 
                locality = ?, 
                uf = ?, 
                contact = ?, 
                salary = ?, 
                level = ?, 
                companyId = ?,
                companyName = ?
            WHERE id = ?;`,
            [
                encryptedTitle,
                encryptedDescription,
                encryptedAboutCompany,
                encryptedBenefits,
                encryptedRequirements,
                encryptedModality,
                encryptedLocality,
                encryptedUf,
                encryptedContact,
                encryptedSalary,
                encryptedLevel,
                companyId,
                encryptedCompanyName,
                id,
            ]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Vaga com ID ${id} não encontrada.`);
        }

        return { id, ...vacancyData };
    } catch (error) {
        console.error("Erro ao atualizar vaga:", error.message);
        throw new Error("Erro ao atualizar a vaga.");
    }
};

const updateIsActive = async (id, isActive) => {
    const conn = await connect();
    try {
        const [result] = await conn.query(
            `UPDATE vacancies SET isActive = ? WHERE id = ?;`,
            [isActive, id]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Vaga com ID ${id} não encontrada.`);
        }

        return { id, isActive };
    } catch (error) {
        console.error("Erro ao atualizar o status da vaga:", error.message);
        throw new Error("Erro ao atualizar o status da vaga.");
    }
};

const updateIsFilled = async (id, isFilled) => {
    const conn = await connect();
    try {
        const [result] = await conn.query(
            `UPDATE vacancies SET isFilled = ? WHERE id = ?;`,
            [isFilled, id]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Vaga com ID ${id} não encontrada.`);
        }

        return { id, isFilled };
    } catch (error) {
        console.error(
            "Erro ao atualizar o status de preenchimento da vaga:",
            error.message
        );
        throw new Error("Erro ao atualizar o status de preenchimento da vaga.");
    }
};

const deleteVacancy = async (id) => {
    const conn = await connect();
    try {
        await conn.beginTransaction();
        await conn.query(
            `DELETE FROM answers WHERE questionId IN (SELECT id FROM questions WHERE vacancyId = ?);`,
            [id]
        );

        await conn.query(`DELETE FROM questions WHERE vacancyId = ?;`, [id]);

        const [result] = await conn.query(
            `DELETE FROM vacancies WHERE id = ?;`,
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Vaga não encontrada.");
        }

        await conn.commit();

        return {
            message:
                "Vaga e seus dados relacionados foram deletados com sucesso.",
        };
    } catch (error) {
        await conn.rollback();
        console.error("Erro ao deletar vaga:", error.message);
        throw new Error("Erro ao deletar a vaga e seus dados relacionados.");
    }
};

module.exports = {
    getAll,
    getById,
    createVacancy,
    updateVacancy,
    deleteVacancy,
    updateIsActive,
    updateIsFilled,
};
