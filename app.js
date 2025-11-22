require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const verifyAccessToken = require("./middlewares/verifyAccessToken");



const authRoutes = require('./routers/auth');
const postRoutes = require('./routers/post');
const likeRoutes = require('./routers/like');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/like",verifyAccessToken , likeRoutes);
// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err); 

  res.status(err.statusCode || 400).json({
    status: "fail",
    message: err.message || "Internal server error"
  });
});


module.exports = app;
