const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/roles");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.admin, userRoles.user, userRoles.manager],
    default: userRoles.user,
  },
  avatar: {
    type: String,
    default: "uploads/profile.png",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
