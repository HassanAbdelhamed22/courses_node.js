const User = require("../models/user.model");
const { SUCCESS } = require("../utils/httpStatusText");

const getAllUsers = async (req, res) => {
  const query = req.query;

  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({}, "-__v").limit(limit).skip(skip);
  res.status(200).json({
    status: SUCCESS,
    data: { users },
  });
};

module.exports = {
  getAllUsers,
};
