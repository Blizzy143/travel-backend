const auth = require("../controllers/auth.controller.js");

const express = require('express');

var router = express.Router();

// Register
router.post("/register", auth.register);

// Login
router.post("/login", auth.login);

// Logout
router.post("/logout", auth.logout);

module.exports = router;
