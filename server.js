const path = require("path");
const app = require(path.join(__dirname, "App.js"));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
