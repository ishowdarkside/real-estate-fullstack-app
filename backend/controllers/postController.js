const { copyFileSync } = require("fs");
const path = require("path");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const Post = require(path.join(__dirname, "..", "models", "Post.js"));
const User = require(path.join(__dirname, "..", "models", "User.js"));
const Agency = require(path.join(__dirname, "..", "models", "Agency.js"));
const sharp = require("sharp");
const { validationResult } = require("express-validator");

exports.createPost = catchAsync(async (req, res, next) => {
  //ako user ne providuje slike, baci error
  if (!req.files || req.files.length === 0)
    return next(new AppError(400, "Priložite slike vaše nekretnine!"));

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

  //save-aj current logged in useru novi post u post array
  const [user, agency] = await Promise.all([
    User.findById(req.user.id),
    Agency.findById(req.user.id),
  ]);

  const validProfile = user || agency;

  const post = await Post.create({
    creatorType: req.user.role,
    creator: req.user.id,
    ...req.body,
  });

  validProfile.posts.push(post.id);
  await validProfile.save({ validateBeforeSave: false });

  for (const file of req.files) {
    if (!file.mimetype.startsWith("image"))
      return next(
        new AppError(400, "Slike nisu dobrog formata. Pokušajte ponovo")
      );
    const filename = `${file.originalname
      .split(" ")
      .join("")}-${Date.now()}.jpeg`;
    try {
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/dist/${filename}`);

      post.imgs.push(filename);
    } catch (err) {
      console.error(`Error processing image ${file.originalname}:`, err);
    }
  }

  await post.save({ validateBeforeSave: true });
  return res.status(201).json({
    status: "success",
    message: "Uspješno ste objavili oglas!",
  });
});

exports.queryPosts = catchAsync(async (req, res, next) => {
  const {
    pricegte,
    pricelte,
    tipNekretnine,
    vrstaOglasa,
    location,
    page = 1,

    search,
  } = req.query;
  const filters = { finished: false };

  const skip = page * 9 - 9;
  if (pricegte) filters.price = { $gte: pricegte };
  if (pricelte) filters.price = { $lte: pricelte };
  if (search) {
    const regex = new RegExp(search, "i");
    filters.title = regex;
  }
  if (pricegte && pricelte) {
    filters.$and = [
      { price: { $gte: pricegte } },
      { price: { $lte: pricelte } },
    ];

    delete filters.price;
  }
  if (tipNekretnine) filters.tipNekretnine = tipNekretnine;
  if (vrstaOglasa) filters.vrstaOglasa = vrstaOglasa;
  if (location) filters.location = location;

  const totalPosts = await Post.find(filters);
  const posts = await Post.find(filters)
    .limit(9)
    .skip(skip)
    .sort({ createdAt: -1 });

  const totalShown = skip * 2 || 9;
  return res.status(200).json({
    posts,
    total: totalPosts.length,
    left: totalPosts.length - totalShown,
  });
});

exports.querySinglePost = catchAsync(async (req, res, next) => {
  const results = validationResult(req);
  if (results.errors.length !== 0) return next(new AppError(400, "Invalid id"));
  const post = await Post.findOne({ _id: req.params.postId })
    .populate({
      path: "creator",
      select: "-posts -password",
    })
    .populate({
      path: "comments",

      populate: { path: "creator", select: "agencyName fullName" },
    });
  post.comments.reverse();
  if (!post) return next(new AppError(404, "Došlo je do pogreške!"));
  return res.status(200).json({
    post,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (post.creator.toString() !== req.user._id.toString())
    return next(
      new AppError(401, "You don't have permission to perform this operation!")
    );
  await Post.findByIdAndDelete(req.params.postId);
  res.status(200).json({
    status: "success",
    message: "Objava uspješno obrisana",
  });
});

exports.finishPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  post.finished = true;
  await post.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "Oglas uspješno završen",
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ finished: false });
  return res.status(200).json({
    posts,
  });
});
