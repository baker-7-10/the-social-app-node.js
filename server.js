const app = require('./app');
const connectDB = require('./config/db');

require('dotenv').config();

const PORT = process.env.PORT || 8000;

// DB Connect
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
});
