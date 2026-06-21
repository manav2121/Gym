const express = require("express");

const router = express.Router();

const Member = require("../models/Member");

router.post("/add", async (req, res) => {

  try {

    const member = new Member(req.body);

    await member.save();

    res.status(201).json(member);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/all", async (req, res) => {

  try {

    const members =
      await Member.find();

    res.json(members);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {

  try {

    await Member.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Member deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/renew/:id", async (req, res) => {

  try {

    const member =
      await Member.findById(req.params.id);

    if (!member) {

      return res.status(404).json({
        message: "Member not found",
      });
    }

    const currentExpiry =
      new Date(member.expiryDate);

    const months =
  req.body.months || 1;

currentExpiry.setMonth(
  currentExpiry.getMonth() + months
);

    member.expiryDate = currentExpiry;

    member.notificationSent = false;

    await member.save();

    res.json(member);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;