const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());

const menu = require("./routes/MenuRoute");
const feedback = require("./routes/FeedbackRoutes");

app.use("/api/menu/V1", menu);

app.use("/api/feedback/V1", feedback);

module.exports = app;
