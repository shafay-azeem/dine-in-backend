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
const modifier = require("./routes/ModifierRoute");
const qr = require("./routes/QrRoutes");

app.use("/api/menu/V1", menu);

app.use("/api/feedback/V1", feedback);

app.use("/api/user/V1", user);

app.use("/api/modifier/V1", modifier);

app.use("/api/qr/V1", qr);

module.exports = app;
