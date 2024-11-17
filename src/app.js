const express = require("express");
const router = require("./router");
const cors = require("cors");
const app = express();
const swagger = require("./swagger");
const path = require("path");

swagger(app);

app.use(express.json());
app.use(cors());
app.use(router);

app.use(express.urlencoded({ extended: true }));
app.use(
    "/public/images",
    express.static(path.join(__dirname, "public/images"))
);
app.use(
    "public/attachments",
    express.static(path.join(__dirname, "public/attachments"))
);

module.exports = app;
