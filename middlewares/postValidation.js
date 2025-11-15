const { body } = require("express-validator");

exports.createPostValidation = [
  body("content")
    .optional()
    .isString()
    .withMessage("Content must be a string"),

  body("image")
    .optional()
    .isString()
    .withMessage("Image must be a string"),

  body("video")
    .optional()
    .isString()
    .withMessage("Video must be a string"),

  body("userId")
    .notEmpty()
    .withMessage("User ID is required"),
];

exports.updatePostValidation = [
  body("content")
    .optional()
    .isString()
    .withMessage("Content must be a string"),

  body("image")
    .optional()
    .isString()
    .withMessage("Image must be a string"),

  body("video")
    .optional()
    .isString()
    .withMessage("Video must be a string"),
];
