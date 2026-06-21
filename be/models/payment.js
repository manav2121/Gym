const mongoose = require("mongoose");

const paymentSchema =
new mongoose.Schema({

  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member",
    required: true,
  },

  memberName: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  plan: {
    type: String,
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Paid",
  },

  paymentDate: {
    type: Date,
    default: Date.now,
  },

});

module.exports =
mongoose.model(
  "Payment",
  paymentSchema
);