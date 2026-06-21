const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  plan: String,
  startDate: Date,
  expiryDate: Date,
  notificationSent: {
    type: Boolean,
    default: false,
  },
});

module.exports =
  mongoose.models.Member ||
  mongoose.model("Member", memberSchema);