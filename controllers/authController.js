const path = require("path");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const User = require(path.join(__dirname, "..", "models", "User.js"));

exports.register = catchAsync(async (req, res, next) => {
  if (!User.checkFields(req.body))
    return next(
      new AppError(400, "Molim vas da upišete podatke u sva obavezna polja!")
    );

  return res.status(200).json({
    status: "success",
    message: "BRAVO BAKI",
  });
});
