const path = require("path");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const User = require(path.join(__dirname, "..", "models", "User.js"));
const generateJWT = require(path.join(
  __dirname,
  "..",
  "utilities",
  "generateJWT"
));
const bcrypt = require("bcrypt");

exports.register = catchAsync(async (req, res, next) => {
  //check if user has inputted all required fields
  if (!User.checkFields(req.body))
    return next(
      new AppError(400, "Molim vas da upišete podatke u sva obavezna polja!")
    );

  //format users input
  const nameArr = req.body.fullName.toLowerCase().split(" ");
  formatedName = nameArr
    .map((el) => el[0].toUpperCase() + el.slice(1))
    .join(" ");

  req.body.fullName = formatedName;
  //save user
  const user = await User.create(req.body);

  //generate jwt that will be stored in cookie
  generateJWT(user.id, res);

  return res.status(200).json({
    status: "success",
    message: `${user.fullName}, dobrodošao!`,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return next(new AppError(400, "Molim vas unesite potrebne podatke!"));
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError(401, "Neispravan email/lozinka"));
  const decrypted = await bcrypt.compare(req.body.password, user.password);
  if (!decrypted) return next(new AppError(401, "Neispravan email/lozinka"));
  //generate jwt that will be stored in cookie
  generateJWT(user.id, res);
  res.status(200).json({
    status: "success",
    message: `Uspješno ste se prijavili`,
  });
});
