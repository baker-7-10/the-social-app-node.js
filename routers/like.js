const express = require("express");
const router = express.Router();
const {
  toggleLike,
  getLikesCount,
} = require("../controllers/likePost.controller");

router.post("/:postId/toggle" , toggleLike); 

router.get("/:postId/count", getLikesCount);

module.exports = router;
