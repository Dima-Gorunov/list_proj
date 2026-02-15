const nodemailer = require("nodemailer");
const { serverName, smtpHost, smtpPort, smtpUser, smtpPassword } = require("../constant");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: false,
            auth: {
                user: smtpUser,
                pass: smtpPassword,
            },
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: smtpUser,
            to: to,
            subject: `Активация аккаунта на ${serverName}`,
            text: ``,
            html: `
                <div>
                    <h1>Для активации аккаунта перейдите по ссылке: </h1>
                    <a href=${link}>${link}</a>
                </div>    
            `,
        });
    }
}

module.exports = new MailService();
