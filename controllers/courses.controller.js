const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatusText");
const AppError = require("../utils/appError");

const getAllCourses = async (req, res) => {
  const query = req.query;

  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, "-__v").limit(limit).skip(skip);
  res.status(200).json({
    status: SUCCESS,
    data: { courses },
  });
};

const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  res.status(200).json({
    status: SUCCESS,
    data: { course },
  });
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new AppError("Validation failed", 400, errors.array());
    throw error;
  }

  const { title, description, price } = req.body;
  const course = new Course({ title, description, price });
  await course.save();
  res.status(201).json({
    status: SUCCESS,
    message: "Course created successfully",
    data: { course },
  });
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  const course = await Course.findByIdAndUpdate(
    id,
    { title, description, price },
    { new: true },
  );

  if (!course) {
    return res.status(404).json({ status: FAIL, data: { course: null } });
  }

  res.status(200).json({
    status: SUCCESS,
    message: "Course updated successfully",
    data: { course },
  });
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError("Course ID is required", 400);
  }

  const course = await Course.findByIdAndDelete(id);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  res.status(200).json({
    status: SUCCESS,
    message: "Course deleted successfully",
    data: null,
  });
};

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
