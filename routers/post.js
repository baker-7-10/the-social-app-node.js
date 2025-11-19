const express = require("express");
const router = express.Router();

const {
  createPost,
  viewPost,
  viewPostById,
  deletePost,
  updatePost,
} = require("../controllers/post.controller");

const {
  createPostValidation,
  updatePostValidation,
} = require("../middlewares/postValidation");
const verifyEmailToken = require("../middlewares/verifyEmailToken");

router.post("/",verifyEmailToken, createPostValidation, createPost);

router.get("/", viewPost);

router.get("/:id", viewPostById);

router.delete("/:id", deletePost);

router.put("/:id", updatePostValidation, updatePost);

module.exports = router;
