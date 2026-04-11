const express = require("express");
const { getAllUsers } = require("../controllers/users.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.route("/").get(verifyToken, getAllUsers);

module.exports = router;
