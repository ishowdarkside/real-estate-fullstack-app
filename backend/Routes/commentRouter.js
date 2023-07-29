const express = require("express");
const path = require("path");
const router = express.Router();
const { comment, answerComment } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "commentController"
));
const { protect } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

router.post("/:postId", protect, comment);
router.post("/answer/:commentId", protect, answerComment);

module.exports = router;
