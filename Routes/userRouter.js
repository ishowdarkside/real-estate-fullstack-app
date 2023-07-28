const express = require("express");
const router = express.Router();
const path = require("path");
const { register, login, protect } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController.js"
));
router.post("/register", register);
router.post("/login", login);
router.get("/test", protect);
module.exports = router;
