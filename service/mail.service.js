const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "abrorbekweb@gmail.com",
        pass: "gatn jtzz oqhd dtyo",
      },
    });
  }

  async sendActivationMail(email, activationLink) {
    await this.transporter.sendMail({
      from: "abrorbekweb@gmail.com",
      to: email,
      subject: `Activation account link ${activationLink}`,
      html: `  
				<div>
					<a href="${activationLink}">Click to activate account</a>
				</div>
			`,
    });
  }

  async sendForgotPasswordMail(email, activationLink) {
    await this.transporter.sendMail({
      from: "abrorbekweb@gmail.com",
      to: email,
      subject: `Forgot password.`,
      html: `
				<div>
					<h1>Time to hacking. If you want to recover your account just click the link below.</h1>
					<a href="${activationLink}">Link to recovery account</a>

					<b>This link will work during 15 minutes</b>
				</div>
			`,
    });
  }
}

module.exports = new MailService();
