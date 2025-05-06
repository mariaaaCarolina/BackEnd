const crypto = require("crypto");

const algorithm = "aes-256-gcm";
const key = Buffer.from(process.env.SECRET_KEY, "utf-8");

// Verifique o comprimento da chave: deve ser 32 bytes para aes-256
if (key.length !== 32) {
    console.log("KEY LENGTH:", key.length);
    console.log("KEY VALUE:", process.env.SECRET_KEY); // apenas para debug, remova depois

    throw new Error("SECRET_KEY inválida. Deve conter 32 bytes.");
}

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
        if (typeof data !== "string") {
            throw new Error("Entrada inválida para descriptografia.");
        }

        const bData = JSON.parse(data);

        if (!bData.iv || !bData.content || !bData.tag) {
            throw new Error("Formato JSON inválido para descriptografia.");
        }

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
