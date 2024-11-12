const connect = require("../connection");

const getAll = async () => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM vacancy");
    return query[0];
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query(`SELECT * FROM vacancy WHERE id = ?`, [id]);
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
        } = vacancy;

        const [result] = await conn.query(
            `INSERT INTO vacancy (title, description, aboutCompany, benefits, 
            requirements, modality, locality, uf, contact, salary, level, companyId) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
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
            ]
        );

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
            isActive, // é opcional passar
            isFilled, // é opcional passar
        } = vacancyData;

        const fields = [
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
        ];
        let query = `UPDATE vacancy SET 
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
            companyId = ?`;

        // Verifica se isActive e isFilled foram passados para atualizar
        if (isActive !== undefined) {
            query += `, isActive = ?`;
            fields.push(isActive);
        }
        if (isFilled !== undefined) {
            query += `, isFilled = ?`;
            fields.push(isFilled);
        }

        query += ` WHERE id = ?;`;
        fields.push(id);

        const [result] = await conn.query(query, fields);

        if (result.affectedRows === 0) {
            throw new Error(`Vaga com ID ${id} não encontrada.`);
        }

        return { id, ...vacancyData };
    } catch (error) {
        console.error("Erro ao atualizar vaga:", error.message);
        throw new Error("Erro ao atualizar a vaga.");
    }
};

const deleteVacancy = async (id) => {
    const conn = await connect();
    try {
        const [result] = await conn.query(`DELETE FROM vacancy WHERE id = ?;`, [
            id,
        ]);

        if (result.affectedRows === 0) {
            throw new Error("Vaga nao encontrada.");
        }

        return { message: "Vaga deletada com sucesso." };
    } catch (error) {
        console.error("Erro ao deletar vaga:", error.message);
        throw new Error("Erro ao deletar a vaga.");
    }
};

module.exports = {
    getAll,
    getById,
    createVacancy,
    updateVacancy,
    deleteVacancy,
};
