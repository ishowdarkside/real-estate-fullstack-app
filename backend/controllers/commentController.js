const { default: mongoose } = require("mongoose");
const path = require("path");
const Post = require(path.join(__dirname, "..", "models", "Post.js"));
const Comment = require(path.join(__dirname, "..", "models", "Comment"));
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));

exports.comment = catchAsync(async (req, res, next) => {
  const comment = req.body.comment;
  if (!comment) return next(new AppError(400, "Unesite poruku!"));

  const post = await Post.findById(req.params.postId).populate({
    path: "creator",
    select: "email",
  });

  if (!post)
    return next(
      new AppError(
        400,
        "Došlo je do pogreške pri objavljivanju vašeg komentara"
      )
    );

  if (post.creator.email === req.user.email)
    return next(
      new AppError(400, "Ne možete postavljati javna pitanja na svoje objave!")
    );

  const newComm = await Comment.create({
    post: post.id,
    creator: req.user.id,
    creatorType: req.user.role,
    comment,
  });

  post.comments.push(newComm.id);
  await post.save({ validateBeforeSave: false });
  res.status(201).json({
    status: "success",
    message: "Uspješno ste objavili javni komentar!",
  });
});

exports.answerComment = catchAsync(async (req, res, next) => {
  //odgovaras na komentar tako sto kad pozivas api na param stavljas id komentara
  //zatim provjeravas da li je creator posta current user koji poziva api
  //ako jeste, stavljas odgovor na answer property ovog comment objekta
  const comment = await Comment.findById(req.params.commentId).populate({
    path: "post",
    populate: { path: "creator" },
  });

  const { creator } = comment.post;
  if (creator.email !== req.user.email)
    return next(new AppError(401, "Nemate dozvolu da vršite ovu radnju!"));

  if (!req.body.answer) return next(new AppError(400, "Unesite odgovor!"));

  comment.answer = req.body.answer;
  await comment.save({ validateBeforeSave: false });
  return res.status(200).json({
    status: "success",
    message: "Upješno ste objavili odgovor na pitanje",
  });
});
