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

router.post("/", createPostValidation, createPost);
router.put("/:id", updatePostValidation, updatePost);
router.get("/", viewPost);
router.get("/:id", viewPostById);
router.delete("/:id", deletePost);


module.exports = router;
