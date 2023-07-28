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

  const token = generateJWT(user.id);
  const expirationDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // 60 days in milliseconds

  //send cookie as response
  res.cookie("jwt", token, { expires: expirationDate });
  return res.status(200).json({
    status: "success",
    message: `${user.fullName}, dobrodošao!`,
  });
});
