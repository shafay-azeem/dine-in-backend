const mongoose = require("mongoose");

const subSectionItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
  },
  itemDescription: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("SubSectionItem", subSectionItemSchema);
