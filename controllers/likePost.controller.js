const {Like} = require("../models/post.models");
const { Post } = require("../models/post.models");

 
exports.toggleLike = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "❌ Post not found" });

    const existingLike = await Like.findOne({ user: userId, post: postId });

    if (existingLike) {
      await existingLike.remove();
      return res.json({ message: "👍 Like removed" });
    } else {
      const like = new Like({ user: userId, post: postId });
      await like.save();
      return res.json({ message: "❤️ Like added" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error while toggling like" + err });
  }
};

 
exports.getLikesCount = async (req, res) => {
  try {
    const postId = req.params.postId;
    const count = await Like.countDocuments({ post: postId });
    res.json({ postId, likes: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error while fetching likes count" });
  }
};
