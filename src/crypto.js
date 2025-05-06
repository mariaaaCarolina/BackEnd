const crypto = require("crypto");

const algorithm = "aes-256-gcm";
const key = Buffer.from(process.env.SECRET_KEY, "utf-8");
console.log("KEY LENGTH:", key.length);

function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final(),
    ]);
    const tag = cipher.getAuthTag();

    const result = {
        iv: iv.toString("hex"),
        content: encrypted.toString("hex"),
        tag: tag.toString("hex"),
    };

    return JSON.stringify(result);
}

function decrypt(data) {
    try {
        const bData = JSON.parse(data);
        const decipher = crypto.createDecipheriv(
            algorithm,
            key,
            Buffer.from(bData.iv, "hex")
        );
        decipher.setAuthTag(Buffer.from(bData.tag, "hex"));
        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(bData.content, "hex")),
            decipher.final(),
        ]);
        return decrypted.toString("utf8");
    } catch (err) {
        console.error("Erro ao descriptografar:", err.message);
        return data; // Retorna o valor original se falhar
    }
}

module.exports = { encrypt, decrypt };
