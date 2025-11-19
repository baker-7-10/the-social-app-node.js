const tokens = require("../config/tokens"); // حسب مكان ملف التوكن عندك

module.exports = (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      const err = new Error("Verification token is required");
      err.statusCode = 400;
      throw err;
    }

    // يفك تشفير التوكن ويتأكد أنه valid & not expired
    const decoded = tokens.verify(token, "verify");

    // نخزن الداتا في req لمعالجتها لاحقًا
    req.decodedVerifyToken = decoded;

    next();
  } catch (err) {
    // إذا انتهت مدة التوكن أو invalid
    err.statusCode = 400;
    err.message = "Invalid or expired verification token";
    next(err);
  }
};
