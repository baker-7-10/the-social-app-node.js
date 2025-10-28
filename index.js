const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const Product = require('./models/product.model');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const ProductRouters = require('./routers/porduct'); 
const authRouters = require('./routers/auth'); 
const postRouters = require('./routers/post'); 

app.get('/', (req, res) => {
  res.send('Hello, mongoose!');
});
app.use('/api',ProductRouters );
app.use('/auth',authRouters );
app.use('/posts',postRouters );
  
// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
