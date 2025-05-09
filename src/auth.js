const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "chave-secreta";

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Token não fornecido." });

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido ou expirado." });
    }
};

module.exports = authenticate;
