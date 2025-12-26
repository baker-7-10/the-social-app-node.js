const { body } = require('express-validator');
const User = require('../models/user.model');

 
exports.signupValidation = [
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject('Email is already in use');
      }
    })
    .normalizeEmail(),

  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
];


 
exports.loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
    
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be valid')
];
