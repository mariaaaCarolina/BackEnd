const express = require("express");
const router = require("./router");
const cors = require("cors");
const app = express();
const swagger = require("./swagger");
swagger(app);

app.use(express.json());
app.use(cors());
app.use(router);
app.use("/uploads/images", express.static("uploads"));

module.exports = app;
