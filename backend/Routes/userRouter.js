const express = require("express");
const router = express.Router();
const path = require("path");
const { check } = require("express-validator");
const {
  register,
  login,
  registerAgency,
  verify,
  getProfileData,
} = require(path.join(__dirname, "..", "controllers", "authController.js"));
router.post("/user/register", register);
router.post("/login", login);
router.post("/agency/register", registerAgency);
router.get("/verify", verify);
router.get(
  "/profile/:profileId",
  [check("profileId").isMongoId().withMessage("Invalid Id")],
  getProfileData
);
module.exports = router;
