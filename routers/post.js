const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createPost,
  viewPost,
} = require("../controllers/post.controller");

router.post(
  "/",
  [
    body("content").optional().isString(),
    body("image").optional().isString(),
    body("video").optional().isString(),
    body("userId").notEmpty().withMessage("User ID is required"),
  ],
  createPost
);

router.get("/", viewPost);


module.exports = router;
