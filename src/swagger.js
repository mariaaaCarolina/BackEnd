const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Primeira Oportunidade",
            version: "1.0.0",
            description: "Documentação da API Primeira Oportunidade",
        },
        servers: [
            {
                url: "http://localhost:3333",
            },
        ],
    },
    apis: ["./routes/router.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
