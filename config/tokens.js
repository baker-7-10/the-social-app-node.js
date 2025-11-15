const jwt = require("jsonwebtoken");

const accessSecret = process.env.JWT_ACCESS;
const refreshSecret = process.env.JWT_REFRESH;
const verifySecret = process.env.JWT_VERIFY;
const resetSecret = process.env.JWT_RESET;

module.exports = {
  signAccessToken(payload) {
    return jwt.sign(payload, accessSecret, { expiresIn: "1h" });
  },

  signRefreshToken(payload) {
    return jwt.sign(payload, refreshSecret, { expiresIn: "7d" });
  },

  signVerifyToken(payload) {
    return jwt.sign(payload, verifySecret, { expiresIn: "15m" });
  },

  signResetToken(payload) {
    return jwt.sign(payload, resetSecret, { expiresIn: "15m" });
  },

  verify(token, type = "access") {
    const secrets = {
      access: accessSecret,
      refresh: refreshSecret,
      verify: verifySecret,
      reset: resetSecret,
    };
    return jwt.verify(token, secrets[type]);
  }
};
