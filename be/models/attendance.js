const mongoose = require("mongoose");

const attendanceSchema =
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

  date: {
    type: String,
    required: true,
  },

  checkInTime: {
    type: String,
    required: true,
  },

});

module.exports =
mongoose.model(
  "Attendance",
  attendanceSchema
);