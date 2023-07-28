const path = require("path");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const Post = require(path.join(__dirname, "..", "models", "Post.js"));

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create({
    creatorType: req.user.role,
    creator: req.user.id,
    ...req.body,
  });

  const popularizovan = await Post.findById(post.id).populate({
    path: "creator",
  });

  return res.status(201).json({
    status: "success",
    popularizovan,
    message: "Uspješno ste objavili oglas!",
  });
});
