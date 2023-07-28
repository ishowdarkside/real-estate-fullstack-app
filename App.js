const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });
const userRouter = require(path.join(__dirname, "Routes", "userRouter"));
const errorMiddleware = require(path.join(
  __dirname,
  "controllers",
  "errorController"
));

const app = express();

app.use(morgan("dev"));

//parse incoming json
app.use(express.json());

//parse incoming cookies
app.use(cookieParser());

//Using User Router for authentication
app.use("/api/auth", userRouter);

//handling unhandled routes
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found!",
  });
});

app.use(errorMiddleware);

module.exports = app;
