const mongoose =
require("mongoose");

const settingsSchema =
new mongoose.Schema({

  oneMonthPrice: {
    type: Number,
    default: 1000,
  },

  threeMonthPrice: {
    type: Number,
    default: 2500,
  },

  sixMonthPrice: {
    type: Number,
    default: 4500,
  },

  oneYearPrice: {
    type: Number,
    default: 8000,
  },

});

module.exports =
mongoose.model(
  "Settings",
  settingsSchema
);
groupLink: {
  type: String,
  default: "",
},