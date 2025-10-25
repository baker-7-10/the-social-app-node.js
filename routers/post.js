const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { createPost } = require("../controllers/post.controller");

// ✅ Create Post
router.post(
  "/",
  [
    body("content").optional().isString(),
    body("image").optional().isString(),
    body("video").optional().isString(),
  ],
 createPost);

module.exports = router;
