const jwt = require("jsonwebtoken");
const generateJWT = function (id) {
  const token = jwt.sign({ payload: { id } }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

module.exports = generateJWT;
