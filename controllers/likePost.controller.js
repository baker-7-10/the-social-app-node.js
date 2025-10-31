const Like = require("../models/like.model"); // موديول اللايك إذا كان في ملف منفصل


// ✅ عمل إعجاب على بوست
exports.likePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    // تحقق إذا المستخدم عمل لايك قبل كذا
    const existing = await Like.findOne({ user: userId, post: postId });
    if (existing)
      return res.status(400).json({ message: "❌ You already liked this post" });

    const like = new Like({ user: userId, post: postId });
    await like.save();
    res.status(201).json({ message: "❤️ Post liked successfully", like });
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(500).json({ message: "❌ Server error while liking post" });
  }
};

// ✅ إلغاء الإعجاب
exports.unlikePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const removed = await Like.findOneAndDelete({ user: userId, post: postId });
    if (!removed)
      return res.status(404).json({ message: "❌ Like not found for this post" });

    res.status(200).json({ message: "💔 Like removed successfully" });
  } catch (err) {
    console.error("Error unliking post:", err);
    res.status(500).json({ message: "❌ Server error while unliking post" });
  }
};

// ✅ عدد الإعجابات
exports.getLikesCount = async (req, res) => {
  try {
    const postId = req.params.id;
    const count = await Like.countDocuments({ post: postId });
    res.status(200).json({ likesCount: count });
  } catch (err) {
    console.error("Error getting likes count:", err);
    res.status(500).json({ message: "❌ Server error while counting likes" });
  }
};
