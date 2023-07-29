const path = require("path");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const Post = require(path.join(__dirname, "..", "models", "Post.js"));
const sharp = require("sharp");

exports.createPost = catchAsync(async (req, res, next) => {
  //ako user ne providuje slike, baci error
  if (req.files.length === 0)
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

  const post = new Post({
    creatorType: req.user.role,
    creator: req.user.id,
    ...req.body,
  });

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
