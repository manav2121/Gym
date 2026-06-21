const memberValidationSchema =
require("../validation/memberValidation");

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

    const { plan } = req.body;

    const currentExpiry =
      new Date(member.expiryDate);

    if (plan === "1 Month") {
      currentExpiry.setMonth(
        currentExpiry.getMonth() + 1
      );
    }

    else if (plan === "3 Months") {
      currentExpiry.setMonth(
        currentExpiry.getMonth() + 3
      );
    }

    else if (plan === "6 Months") {
      currentExpiry.setMonth(
        currentExpiry.getMonth() + 6
      );
    }

    else if (plan === "1 Year") {
      currentExpiry.setFullYear(
        currentExpiry.getFullYear() + 1
      );
    }

    member.expiryDate = currentExpiry;

    member.plan = plan;

    member.notificationSent = false;

    await member.save();

    res.json(member);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;