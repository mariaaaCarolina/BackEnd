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
        } = company;

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
                logo,
            ]
        );
        return { id: result.insertId, ...company };
    } catch (error) {
        console.error("Erro ao criar a empresa:", error.message);
        throw new Error("Erro ao criar a empresa");
    }
};

const getById = async (id) => {
    const conn = await connect();
    const query = await conn.query("SELECT * FROM companies WHERE id = ?", [
        id,
    ]);
    return query[0][0]; // Retorna um único usuário
};

const updateCompany = async (id, company) => {
    const conn = await connect();
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
    } = company;

    const query = `
        UPDATE companies
        SET name = ?, cnpj = ?, segment = ?, responsible = ?, email = ?, phoneNumber = ?, city = ?, cep = ?, address = ?, addressNumber = ?, uf = ?, password = ?, url = ?, logo = ?
        WHERE id = ?
    `;

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

    return result.affectedRows ? { id, ...company } : null;
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

module.exports = {
    getAll,
    createCompany,
    getById,
    updateCompany,
    deleteCompany,
};
