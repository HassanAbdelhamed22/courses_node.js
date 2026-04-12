const User = require("../models/user.model");
const AppError = require("../utils/appError");
const { SUCCESS } = require("../utils/httpStatusText");

const getAllUsers = async (req, res) => {
  const query = req.query;

  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { "-__v": false, "-password": false })
    .limit(limit)
    .skip(skip);
  res.status(200).json({
    status: SUCCESS,
    data: { users },
  });
};

const changeUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!id) {
    throw new AppError("User ID is required", 400);
  }

  if (!role) {
    throw new AppError("Role is required", 400);
  }

  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  res.status(200).json({
    status: SUCCESS,
    message: "User role updated successfully",
    data: { user },
  });
};

module.exports = {
  getAllUsers,
  changeUserRole,
};
