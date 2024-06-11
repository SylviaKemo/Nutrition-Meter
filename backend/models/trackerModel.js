const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trackerSchema = new Schema(
  {
    itemName: {
      type: String,
      require: true,
    },
    protein: {
      type: Number,
      require: true,
    },
    fat: {
      type: Number,
      require: true,
    },
    calories: {
      type: Number,
      require: true,
    },
    carbs: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tracker", trackerSchema);
