const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  req.token = token;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new AppError(
        "Token is invalid or expired, please login again",
        401,
      );
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
