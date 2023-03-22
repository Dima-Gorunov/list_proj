const nodemailer = require('nodemailer')
const {serverName} = require("../constant")

class MailService {
    constructor() {
            this.transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "testconfirmemail8@gmail.com",
                    pass: "oufitrwoeqllavdu"
                    // "rmZn8WaTwQ9JFavgBaqk"
                }
            })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: "testconfirmemail8@gmail.com",
            to: to,
            subject: `Активация аккаунта на ${serverName}`,
            text: ``,
            html:
                `
                <div>
                    <h1>Для активации аккаунта перейдите по ссылке: </h1>
                    <a href=${link}>${link}</a>
                </div>    
            `
        })
    }

}

module.exports = new MailService()