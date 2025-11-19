const authService = require("../services/auth.service");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res) => {
  const user = await authService.signup(req.body);
  res.status(201).json({ message: "Verify your email", userId: user._id });
});

exports.login = catchAsync(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  res.status(200).json({
    message: "Logged in",
    accessToken,
    refreshToken,
    userData: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }
  });
});
exports.verifyEmail = catchAsync(async (req, res) => {
  const token = req.query.token;
  await authService.verifyEmail(token);
  res.status(200).json({ message: "Email verified successfully" });
});

exports.forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  await authService.forgotPassword(email);
  res.status(200).json({ message: "Password reset link sent to your email" });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { token, newPassword } = req.body;
  await authService.resetPassword(token, newPassword);
  res.status(200).json({ message: "Password updated successfully" });
});
