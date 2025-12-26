const { validationResult } = require("express-validator");
const {Post} = require("../models/post.models");

 
exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const { content, image, video, userId } = req.body;

  try {
    const post = new Post({
      user: userId,
      content,
      image,
      video,
    });

    await post.save();
    res.status(201).json({ message: "✅ Post created successfully", post });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "❌ Server error while creating post" });
  }
};

 
exports.viewPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
       

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "❌ Server error while fetching posts " +err });
  }
};


exports.viewPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("user", "name email")
      .populate("comments.user", "name email");   
    if (!post) {
      return res.status(404).json({ message: "❌ Post not found" });
    } 
    res.status(200).json(post);
  } catch (err) {
    console.error("Error fetching post by ID:", err);
    res.status(500).json({ message: "❌ Server error while fetching post" });
  }
};

 
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "❌ Post not found" });
    }

     
    if (post.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "❌ You are not allowed to delete this post" });
    }

    await post.remove();  
    res.status(200).json({ message: "🗑️ Post deleted successfully" });

  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "❌ Server error while deleting post" });
  }
};


 
exports.updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  try {
    const postId = req.params.id;
    const { content, image, video } = req.body;
    const updated = await Post.findByIdAndUpdate(
      postId,
      { content, image, video },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "❌ Post not found" });
    }
    res.status(200).json({ message: "✏️ Post updated successfully", updated });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ message: "❌ Server error while updating post" });
  }

};



