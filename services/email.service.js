const transporter = require("../config/email");

module.exports = {
  async sendVerificationEmail(email, name, token) {
    const url = `${process.env.FRONTEND_URL}/verify?token=${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Verify your email",
      html: `<h1>Hello ${name}</h1><p>Click here: <a href="${url}">Verify</a></p>`
    });
  },

  async sendResetEmail(email, token) {
    const url = `${process.env.FRONTEND_URL}/reset?token=${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Reset Password",
      html: `<p>Reset link: <a href="${url}">Reset Password</a></p>`
    });
  }
};
