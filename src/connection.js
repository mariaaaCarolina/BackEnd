const mysql = require("mysql2/promise");
require("dotenv").config();

const connect = async () => {
    try {
        const conn = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            port: process.env.MYSQLPORT,
            ssl: {
                rejectUnauthorized: false, // Desativa a verificação SSL (para desenvolvimento)
            },
        });

        console.log("✅ Conexão ao banco de dados bem-sucedida!");
        return conn;
    } catch (err) {
        console.error(`❌ Erro ao conectar ao banco de dados: ${err.message}`);
    }
};

module.exports = connect;
