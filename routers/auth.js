const express = require('express');
const { signup, login, verifyEmail, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const { signupValidation, loginValidation } = require('../middlewares/authValidation');

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
