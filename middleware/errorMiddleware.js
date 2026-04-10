const { ERROR } = require("../utils/httpStatusText");

const errorHandler = (err, req, res, next) => {
  const response = {
    success: ERROR,
    message: err.message || "Server Error",
  };

  if (err.errors) {
    response.data = { errors: err.errors };
  }

  res.status(err.statusCode || 500).json(response);
};

module.exports = { errorHandler };
