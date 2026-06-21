const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const Attendance =
require("../models/attendance");

const Member =
require("../models/member");

router.use(authMiddleware);

router.post("/checkin/:id", async (req, res) => {

  try {

    const member =
      await Member.findById(
        req.params.id
      );

    if (!member) {

      return res.status(404).json({
        message: "Member not found",
      });
    }

    const today =
      new Date().toLocaleDateString();

    const existingAttendance =
      await Attendance.findOne({

        memberId: member._id,

        date: today,

      });

    if (existingAttendance) {

      return res.status(400).json({
        message:
          "Attendance already marked today",
      });
    }

    const attendance =
      new Attendance({

        memberId: member._id,

        memberName: member.name,

        date: today,

        checkInTime:
          new Date().toLocaleTimeString(),

      });

    await attendance.save();

    res.json({
      message:
        "Attendance marked successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/all", async (req, res) => {

  try {

    const attendance =
      await Attendance.find()
      .sort({ createdAt: -1 });

    res.json(attendance);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/stats", async (req, res) => {

  try {

    const attendance =
      await Attendance.find();

    const today =
      new Date().toLocaleDateString();

    const todayAttendance =
      attendance.filter((a) =>
        a.date === today
      ).length;

    res.json({

      totalAttendance:
        attendance.length,

      todayAttendance,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;