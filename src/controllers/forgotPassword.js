const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const forgotPassword = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send("E-mail é obrigatório!");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    const resetLink = `https://primeira-oportunidade-frontend.vercel.app/recuperar-senha/resetPassword?token=${token}`;

    const msg = {
        to: email,
        from: "primeiraoportunidade1012@outlook.com",
        subject: "Recuperação de Senha",
        text: `Aqui está o link para recuperar sua senha: ${resetLink}`,
        html: `<div style="font-family: Arial, sans-serif; background-color: #F4F7FA; padding: 30px; text-align: center;">
        <div style="background-color: #004aad; padding: 20px; color: white; border-radius: 8px;">
            <h2 style="font-size: 24px; margin-top: 20px;">Recuperação de Senha</h2>
            <p style="font-size: 18px; margin: 20px 0;">Clique no botão para recuperar sua senha:</p>
            <a href="${resetLink}" style="background-color: #ff7b2a; color: white; padding: 15px 30px; font-size: 18px; font-weight: bold; text-decoration: none; border-radius: 8px;">
                Redefinir Senha
            </a>
            <p style="font-size: 14px; margin-top: 30px; color: #888;">Este link expira em 1 hora.</p>
        </div>
    </div>`,
    };

    sgMail
        .send(msg)
        .then(() => {
            res.status(200).send("E-mail de recuperação enviado!");
        })
        .catch((error) => {
            console.error(error.response.body);
            res.status(500).send("Erro ao enviar o e-mail.");
        });
};

const resetPassword = (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).send("Token e nova senha são obrigatórios!");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).send("Token inválido ou expirado.");
        }
        const { email } = decoded;

        User.findOneAndUpdate(
            { email },
            { password: newPassword },
            (err, user) => {
                if (err) {
                    return res.status(500).send("Erro ao atualizar a senha.");
                }

                if (!user) {
                    return res.status(404).send("Usuário não encontrado.");
                }

                res.status(200).send("Senha atualizada com sucesso!");
            }
        );
    });
};

module.exports = {
    forgotPassword,
    resetPassword,
};
