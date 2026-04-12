const express = require("express");
const {
  getAllUsers,
  changeUserRole,
} = require("../controllers/users.controller");
const verifyToken = require("../middleware/verifyToken");
const userRoles = require("../utils/roles");
const allowedTo = require("../middleware/allowedTo");
const router = express.Router();

router.route("/").get(verifyToken, getAllUsers);

router
  .route("/:id")
  .patch(verifyToken, allowedTo(userRoles.admin), changeUserRole);

module.exports = router;
