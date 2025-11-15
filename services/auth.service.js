const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const tokens = require("../config/tokens");
const emailService = require("./email.service");
FRONTEND_URL = process.env.FRONTEND_URL;

module.exports = {
  async signup({ name, email, password }) {
    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashed,
      isVerified: false,
    });

    const verifyToken = tokens.signVerifyToken({ userId: user._id });

    await emailService.sendVerificationEmail(email, name, verifyToken);

    return user;
  },

  async login({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) throw new Error("Invalid email or password");
    if (!user.isVerified) throw new Error("Email not verified");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid email or password");

    const accessToken = tokens.signAccessToken({ userId: user._id });
    const refreshToken = tokens.signRefreshToken({ userId: user._id });

    return { user, accessToken, refreshToken };
  },

  async verifyEmail(token) {
    const decoded = tokens.verify(token, "verify");
    const user = await User.findById(decoded.userId);

    if (!user) throw new Error("User not found");

    user.isVerified = true;
    await user.save();
  },

  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email not found");

    const resetToken = tokens.signResetToken({ userId: user._id });

    await emailService.sendResetEmail(email, resetToken);
  },

  async resetPassword(token, newPassword) {
    const decoded = tokens.verify(token, "reset");
    const user = await User.findById(decoded.userId);
    if (!user) throw new Error("User not found");

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
  },
};
