const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { createPost , viewPost } = require("../controllers/post.controller");

// ✅ Create Post
router.post(
  "/",
  [
    body("content").optional().isString(),
    body("image").optional().isString(),
    body("video").optional().isString(),
  ],
 createPost);

router.get(
  "/",
 viewPost);

module.exports = router;
