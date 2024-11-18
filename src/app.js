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
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(
    "/attachments",
    express.static(path.join(__dirname, "public/attachments"))
);

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src *; img-src * data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'"
    );
    next();
});

module.exports = app;
