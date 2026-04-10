const { validationResult } = require("express-validator");
const Course = require("../models/course.model");

const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({
    message: "Courses retrieved successfully",
    data: courses,
  });
};

const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.status(200).json({
    message: "Course retrieved successfully",
    data: course,
  });
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, price } = req.body;
  const course = new Course({ title, description, price });
  await course.save();
  res.status(201).json({
    message: "Course added successfully",
    data: course,
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
  res.status(200).json({
    message: "Course updated successfully",
    data: course,
  });
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  const course = await Course.findByIdAndDelete(id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.status(200).json({
    message: "Course deleted successfully",
    data: course,
  });
};

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
