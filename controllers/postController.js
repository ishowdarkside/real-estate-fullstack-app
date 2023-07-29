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
  //dinamicki odredi poruku u slucaju da user ne providuje sprat
  if (!req.body.sprat)
    return next(
      new AppError(
        400,
        `${
          req.body.tipNekretnine === "kuća"
            ? "Navedite na koliko spratova je kuća"
            : "Navedite na kojem spratu je stan"
        }`
      )
    );
  const post = await Post.create({
    creatorType: req.user.role,
    creator: req.user.id,
    ...req.body,
  });

  return res.status(201).json({
    status: "success",
    message: "Uspješno ste objavili oglas!",
  });
});
