const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const tokens = require("../config/tokens");
const emailService = require("./email.service");
FRONTEND_URL = process.env.FRONTEND_URL;

module.exports = {
   
  async signup({ name, email, password }) {

     
    const exists = await User.findOne({ email });
    if (exists) {
      const err = new Error("Email already exists");
      err.statusCode = 400;
      throw err;
    }

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

    if (!user) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    if (!user.isVerified) {
      const err = new Error("Email not verified");
      err.statusCode = 403;
      throw err;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    const accessToken = tokens.signAccessToken({ userId: user._id });
    const refreshToken = tokens.signRefreshToken({ userId: user._id });

    return { user, accessToken, refreshToken };
  },

   
  async verifyEmail(token) {
  const decoded = tokens.verify(token, "verify");
  const user = await User.findById(decoded.userId);

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  const EXPIRATION_MS = 24 * 60 * 60 * 1000;  
  if (!user.isVerified && (new Date() - user.createdAt) > EXPIRATION_MS) {
    await User.findByIdAndDelete(user._id);
    const err = new Error("Verification expired. Account deleted.");
    err.statusCode = 410;  
    throw err;
  }

  if (user.isVerified) {
    const err = new Error("Account already verified");
    err.statusCode = 400;
    throw err;
  }

  user.isVerified = true;
  await user.save();
},


   
  async forgotPassword(email) {
    const user = await User.findOne({ email });

    if (!user) {
      const err = new Error("Email not found");
      err.statusCode = 404;
      throw err;
    }

    const resetToken = tokens.signResetToken({ userId: user._id });

    await emailService.sendResetEmail(email, resetToken);
  },

   
  async resetPassword(token, newPassword) {
    const decoded = tokens.verify(token, "reset");

    const user = await User.findById(decoded.userId);
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
  },
};
