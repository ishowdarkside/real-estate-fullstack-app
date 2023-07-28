const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./config.env" });
const userRouter = require(path.join(__dirname, "Routes", "userRouter"));

const app = express();

//parse incoming json
app.use(express.json());

//Using User Router for authentication
app.use("/api/auth", userRouter);

module.exports = app;
