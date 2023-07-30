const express = require("express");
const router = express.Router();
const path = require("path");
const { register, login, registerAgency, verify } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController.js"
));
router.post("/user/register", register);
router.post("/login", login);
router.post("/agency/register", registerAgency);
router.get("/verify", verify);
module.exports = router;
