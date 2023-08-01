const express = require("express");
const path = require("path");
const router = express.Router();
const { check } = require("express-validator");
const {
  createPost,
  queryPosts,
  querySinglePost,
  deletePost,
} = require(path.join(__dirname, "..", "controllers", "postController"));
const { protect } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

//za objavljivanje posta
router.post("/createPost", protect, upload.array("photos", 7), createPost);
router.get("/", queryPosts);
router.get(
  "/:postId",
  [check("postId").isMongoId().withMessage("Invalid id")],
  querySinglePost
);
router.delete("/:postId", protect, deletePost);
module.exports = router;
