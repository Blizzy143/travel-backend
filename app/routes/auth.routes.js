const auth = require("../controllers/auth.controller.js");
const userController = require("../controllers/user.controller.js");

const express = require('express');

var router = express.Router();

// Register
router.post("/register", userController.create);

// Login
router.post("/login", auth.login);

// Logout
router.post("/logout", auth.logout);

module.exports = router;
