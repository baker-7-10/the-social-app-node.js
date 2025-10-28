const Product = require('../models/product.model');
const { validationResult } = require('express-validator');
const Post = require("../models/post.models");

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { content, image, video, userId } = req.body;

  try {
    const post = new Post({
      user: userId,
      content,
      image,
      video,
    });

    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while creating post" });
  }
};

exports.viewPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email')
      .populate('comments.user', 'name email');

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching posts" });
  }
};
