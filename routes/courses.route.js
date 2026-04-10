const express = require("express");
const router = express.Router();

const { courseValidationRules } = require("../middleware/validationSchema");
const {
  getAllCourses,
  addCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses.controller");

router.route("/").get(getAllCourses).post(courseValidationRules(), addCourse);

router
  .route("/:id")
  .get(getCourseById)
  .patch(courseValidationRules(), updateCourse)
  .delete(deleteCourse);

module.exports = router;
