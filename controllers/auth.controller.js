const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");
const { SUCCESS } = require("../utils/httpStatusText");

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email is already exists", 400);
  }

  // password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await user.save();

  const response = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  res.status(201).json({
    status: SUCCESS,
    message: "User registered successfully",
    data: { user: response },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const response = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  res.status(200).json({
    status: SUCCESS,
    message: "Login successful",
    data: { user: response },
  });
};

module.exports = { register, login };
