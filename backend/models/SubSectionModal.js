const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  sectionDescription: {
    type: String,
  },
  sectionNote: {
    type: Number,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("SubSection", subSectionSchema);
