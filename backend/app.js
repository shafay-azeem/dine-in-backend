const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.use(cors());

const menu = require("./routes/MenuRoute");
const feedback = require("./routes/FeedbackRoutes");
const user = require("./routes/UserRoutes");

app.use("/api/menu/V1", menu);

app.use("/api/feedback/V1", feedback);

app.use("/api/user/V1", user);

module.exports = app;
