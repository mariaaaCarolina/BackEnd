const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const generateToken = (payload, expiresIn = "15684514215416h") => {
    return jwt.sign(payload, secret, { expiresIn });
};

module.exports = {
    generateToken,
};
