const mysql = require("mysql2/promise");
const fs = require("fs");
require("dotenv").config();

const connect = async () => {
    const path = "./src/DigiCertGlobalRootG2.crt.pem"; //alterar o caminho conforme onde o certificado está

    try {
        const ca = fs.readFileSync(path, "utf8");

        conn = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            port: process.env.MYSQLPORT,
            ssl: {
                ca: ca, // certificado SSL
            },
        });

        console.log("Conexão ao banco de dados bem-sucedida!");
        return conn;
    } catch (err) {
        console.error(`Erro ao conectar ao banco de dados: ${err.message}`);
    }
};

module.exports = connect;
