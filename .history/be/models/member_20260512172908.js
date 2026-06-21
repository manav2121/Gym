const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({

  name: String,

  phone: String,

  email: String,

  plan: String,

  startDate: Date,

  expiryDate: Date,

  paymentAmount: {
    type: Number,
    default: 0,
  },

  paymentStatus: {
    type: String,
    default: "Pending",
  },

  attendanceCount: {
    type: Number,
    default: 0,
  },

  notificationSent: {
    type: Boolean,
    default: false,
  },

});

module.exports =
  mongoose.models.Member ||
  mongoose.model("Member", memberSchema);