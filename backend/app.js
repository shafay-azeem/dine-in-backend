const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(express.json());


const menu = require("./routes/MenuRoute");
const section = require("./routes/MenuRoute");





app.use("/api/menu/V1", menu);

app.use("/api/section/V1", section);



module.exports = app