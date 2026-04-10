const { body } = require("express-validator");

const courseValidationRules = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 2 })
      .withMessage("Title must be at least 2 characters long"),
    body("price")
      .isNumeric()
      .withMessage("Price must be a number")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number")
      .notEmpty()
      .withMessage("Price is required"),
    body("description")
      .optional({ nullable: true })
      .isLength({ min: 2 })
      .withMessage("Description must be at least 2 characters long")
      .isLength({ max: 500 })
      .withMessage("Description must be at most 500 characters long"),
  ];
};

module.exports = {
  courseValidationRules,
};
