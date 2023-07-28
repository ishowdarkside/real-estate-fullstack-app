const path = require("path");
const mongoose = require("mongoose");
const app = require(path.join(__dirname, "App.js"));

const DB = process.env.MONGODB_LINK.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => console.log("Successfully conected to database"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
