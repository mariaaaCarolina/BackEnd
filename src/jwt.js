const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "chave-secreta";

const generateToken = (payload, expiresIn = "1h") => {
    return jwt.sign(payload, secret, { expiresIn });
};

module.exports = {
    generateToken,
};
