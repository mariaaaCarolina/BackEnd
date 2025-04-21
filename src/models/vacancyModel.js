const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM vacancies");
    return query[0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query(`SELECT * FROM vacancies WHERE id = ?`, [
        id,
    ]);
    return query[0][0];
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

        // Verifique o número de parâmetros e colunas
        const query = `INSERT INTO vacancies (title, description, aboutCompany, benefits, 
            requirements, modality, locality, uf, contact, salary, level, companyId, companyName) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        const values = [
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
        ];

        console.log("Valores sendo inseridos:", values); // Debugging

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
