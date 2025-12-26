 
const tokens = require("../config/tokens");  

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token is required" });
    }

    const token = authHeader.split(" ")[1];

     
    const decoded = tokens.verify(token, "access");

     
    req.user = decoded;

    next();  
  } catch (err) {
    console.error("Access token error:", err.message);
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};
