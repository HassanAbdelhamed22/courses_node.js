const { ERROR } = require("../utils/httpStatusText");

const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: ERROR,
    message: err.message || "Server Error",
  });
};

module.exports = { errorHandler };