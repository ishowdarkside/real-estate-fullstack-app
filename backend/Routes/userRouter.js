const express = require("express");
const router = express.Router();
const path = require("path");
const {
  register,
  login,
  protect,
  registerAgency,
  loginAgency,
  verify,
} = require(path.join(__dirname, "..", "controllers", "authController.js"));
router.post("/user/register", register);
router.post("/user/login", login);
router.post("/agency/register", registerAgency);
router.post("/agency/login", loginAgency);
router.get("/verify", verify);
module.exports = router;
