const express = require("express");
const path = require("path");
const router = express.Router();
const { createPost } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "postController"
));
const { protect } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

router.post("/", protect, createPost);

module.exports = router;
