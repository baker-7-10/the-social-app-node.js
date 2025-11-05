const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    // ======================
    // الأساسيات
    // ======================
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true, // يسمح أن يكون فاضي لبعض المستخدمين
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ======================
    // بيانات إضافية اختيارية
    // ======================
    bio: {
      type: String,
      default: "I'm new here 👋",
    },

    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    coverImage: {
      type: String,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    dateOfBirth: {
      type: Date,
    },

    location: {
      type: String,
    },

    website: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "banned", "deleted"],
      default: "active",
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    // ======================
    // العلاقات
    // ======================
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;

