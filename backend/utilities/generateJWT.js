const jwt = require("jsonwebtoken");
const generateJWT = function (id, res) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const expirationDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // 60 days in milliseconds
  //send cookie as response
  res.cookie("jwt", token, { expires: expirationDate });
  return token;
};

module.exports = generateJWT;
