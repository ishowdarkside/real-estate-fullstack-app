const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });
const userRouter = require(path.join(__dirname, "Routes", "userRouter"));
const postRouter = require(path.join(__dirname, "Routes", "postRouter"));
const commentRouter = require(path.join(__dirname, "Routes", "commentRouter"));
const errorMiddleware = require(path.join(
  __dirname,
  "controllers",
  "errorController"
));
const cors = require("cors");

const app = express();

app.use(morgan("dev"));

app.use(cors());

//parse incoming json
app.use(express.json());

//parse incoming cookies
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, "public", "dist")));

//Using User Router for authentication
app.use("/api/auth", userRouter);

//using post router for posts
app.use("/api/posts", postRouter);

//use comment router for comments
app.use("/api/comments", commentRouter);

//handling unhandled routes
app.use("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

app.use(errorMiddleware);

module.exports = app;
