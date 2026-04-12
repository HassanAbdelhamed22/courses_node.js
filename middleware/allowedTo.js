const AppError = require("../utils/appError");

const allowedTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("This role is not authorized", 401);
    }
    next();
  };
};

module.exports = allowedTo;