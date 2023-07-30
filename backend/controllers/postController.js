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
        .toFile(`public/uploads/${filename}`);
      console.log(
        `Image ${file.originalname} processed and saved successfully`
      );
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
