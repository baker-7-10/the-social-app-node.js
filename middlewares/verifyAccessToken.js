// middlewares/verifyAccessToken.js
const tokens = require("../config/tokens"); // الملف اللي فيه JWT verify

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token is required" });
    }

    const token = authHeader.split(" ")[1];

    // يفك التوكن ويتأكد أنه صالح
    const decoded = tokens.verify(token, "access");

    // نخزن بيانات المستخدم في req
    req.user = decoded;

    next(); // إذا التوكن صحيح، يسمح للروت بالعمل
  } catch (err) {
    console.error("Access token error:", err.message);
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};
