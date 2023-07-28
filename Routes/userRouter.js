const express = require("express");
const router = express.Router();
const path = require("path");
const { register } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController.js"
));
router.post("/register", register);

module.exports = router;
