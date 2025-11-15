// const { validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const User = require("../models/user.model");
// const SECRET_KEY = process.env.SECRET_KEY

//  // ⚠️ Change this in .env for production

// // Email setup (Gmail or another SMTP service)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "swiftycs.notifications@gmail.com",      // ✉️ Your email
//     pass: "mdkt xtnc qpwp gcmx",                   // 🔑 App Password (not your normal password)
//   },
//   tls: {
//     rejectUnauthorized: false, // ✅ Ignore self-signed certificate
//   },
// });

// // =================== 📩 SIGNUP ===================
// exports.signup = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }

//   const { email, password, name } = req.body;

//   try {
//     const hashpass = await bcrypt.hash(password, 12);
//     const user = new User({
//       name,
//       email,
//       password: hashpass,
//       isVerified: false,
//     });
//     const result = await user.save();

//     // 🔐 Create a verification token valid for 15 minutes
//     const verifyToken = jwt.sign({ userId: result._id }, SECRET_KEY, {
//       expiresIn: "15m",
//     });

//     const verifyUrl = `http://localhost:8000/auth/verify-email?token=${verifyToken}`;

//     // ✉️ Send verification email
//     await transporter.sendMail({
//       from: '"baker" <your_email@gmail.com>',
//       to: email,
//       subject: "Email Verification",
//       html: `
//         <h2>Hello ${name} 👋</h2>
//         <p>Please click the link below to activate your account:</p>
//         <a href="${verifyUrl}" target="_blank">Activate Account</a>
//         <p>The link is valid for 15 minutes only.</p>
//       `,
//     });

//     res.status(201).json({
//       message: "✅ Account created! Please check your email to verify it.",
//       userId: result._id,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "❌ An error occurred while creating the account." });
//   }
// };

// // =================== 🔑 LOGIN ===================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // 🚫 Prevent login if email is not verified
//     if (!user.isVerified) {
//       return res.status(403).json({ message: "Please verify your email before logging in." });
//     }

//     const isEqual = await bcrypt.compare(password, user.password);
//     if (!isEqual) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // ✅ Generate JWT upon login
//     const token = jwt.sign(
//       {
//         userId: user._id.toString(),
//         email: user.email,
//       },
//       SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     return res.status(200).json({
//             message: "Logged in successfully",
//             token: token,
//             userData: {
//               _id: user._id,
//               name: user.name,
//               email: user.email,
//               avatar: user.avatar,
//               bio: user.bio,
//               role: user.role,
//               isVerified: user.isVerified,
//         },
//       });


//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // =================== 🔗 VERIFY EMAIL ===================
// exports.verifyEmail = async (req, res) => {
//   const token = req.query.token;
//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.isVerified) {
//       return res.status(400).json({ message: "Account already verified" });
//     }

//     user.isVerified = true;
//     await user.save();

//     res.status(200).json({ message: "✅ Account verified successfully!" });
//   } catch (err) {
//     res.status(400).json({ message: "❌ Verification link is invalid or expired." });
//   }
// };




// // =================== 🔄 FORGOT PASSWORD ===================
// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "Email not found" });
//     }

//     // Create JWT token valid for 15 minutes
//     const resetToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "15m" });

//     const resetUrl = `http://localhost:3000/auth/ResetPassword?token=${resetToken}`;

//     // Send email
//     await transporter.sendMail({
//       from: `"My App" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Password Reset",
//       html: `
//         <h2>Password Reset</h2>
//         <p>Click the link below to reset your password:</p>
//         <a href="${resetUrl}">Reset Password</a>
//         <p>The link is valid for 15 minutes only.</p>
//       `,
//     });

//     res.status(200).json({ message: "Password reset link sent to your email." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "An error occurred while sending the reset link." });
//   }
// };

// // =================== 🔁 RESET PASSWORD ===================
// exports.resetPassword = async (req, res) => {
//   const { token, newPassword } = req.body;

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 12);
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ message: "✅ Password updated successfully!" });
//   } catch (err) {
//     res.status(400).json({ message: "❌ The link is invalid or expired." });
//   }
// };




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
