const express = require("express");
const router = express.Router();
const {
  likePost,
  unlikePost,
  getLikesCount,
} = require("../controllers/likePost.controller");

router.post("/", likePost);

router.delete("/unlike", unlikePost);

router.get("/:id/likes", getLikesCount);

module.exports = router;
