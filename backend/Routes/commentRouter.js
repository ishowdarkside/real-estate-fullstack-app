const express = require("express");
const path = require("path");
const router = express.Router();
const { check } = require("express-validator");
const {
  comment,
  answerComment,
  deleteComment,
  deleteAnswer,
} = require(path.join(__dirname, "..", "controllers", "commentController"));
const { protect } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

router.post("/:postId", protect, comment);
router.post("/answer/:commentId", protect, answerComment);
router.delete(
  "/comment/:commentId",
  [check("commentId").isMongoId().withMessage("Invalid ID")],
  protect,
  deleteComment
);
router.patch("/answer/:commentId", protect, deleteAnswer);
module.exports = router;
