const mongoose = require("mongoose");
const Section = require("../models/SectionModel");
const Item = require("../models/ItemModal");

const menuSchema = new mongoose.Schema({
  userName: {
    type: String,
    ref: "User",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  menuName: {
    type: String,
  },
  menuStatus: {
    type: Boolean,
    default: false
  },

  menuDescription: {
    type: String,
  },

  availaibility: [{
    day: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
  }],
  menuNote: {
    type: Number,
  },
  section: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Section",
    },
  ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Menu", menuSchema);
