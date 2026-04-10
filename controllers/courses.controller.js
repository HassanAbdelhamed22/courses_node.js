const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatusText");

const getAllCourses = async (req, res) => {
  const courses = await Course.find({}, "-__v");
  res.status(200).json({
    status: SUCCESS,
    data: { courses },
  });
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ status: FAIL, data: { course: null } });
    }

    res.status(200).json({
      status: SUCCESS,
      data: { course },
    });
  } catch (error) {
    res.status(500).json({ status: ERROR, data: null, message: error.message });
  }
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: FAIL, data: { errors: errors.array() } });
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
    return res
      .status(400)
      .json({ status: FAIL, data: { message: "Course ID is required" } });
  }

  const course = await Course.findByIdAndDelete(id);

  if (!course) {
    return res.status(404).json({ status: FAIL, data: { course: null } });
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
