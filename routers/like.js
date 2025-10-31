const express = require("express");
const router = express.Router();
const {
  viewPost,
  likePost,
  unlikePost,
  getLikesCount,
} = require("../controllers/post.controller");


router.get("/", viewPost);

router.post("/like", likePost);

router.delete("/unlike", unlikePost);

router.get("/:id/likes", getLikesCount);

module.exports = router;
