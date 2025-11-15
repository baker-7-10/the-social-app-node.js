const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routers/auth');
const postRoutes = require('./routers/post');

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

module.exports = app;
