const express = require("express");
const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const memberValidationSchema =
require("../validation/memberValidation");

const Member =
require("../models/Member");

const Payment =
require("../models/payment");

const Settings =
require("../models/settings");

const sendWhatsAppMessage =
require("../config/whatsapp");

router.use(authMiddleware);

// ===============================
// ADD MEMBER
// ===============================

router.post("/add", async (req, res) => {

  try {

    const { error } =
      memberValidationSchema.validate(
        req.body
      );

    if (error) {

      return res.status(400).json({
        message:
          error.details[0].message,
      });

    }

    const member =
      new Member(req.body);

    const settings =
      await Settings.findOne();

    if (!settings) {

      return res.status(500).json({

        message:
          "Membership prices are not configured."

      });

    }

    let amount = 0;

    switch (member.plan) {

      case "1 Month":

        amount =
          settings.oneMonthPrice;
        break;

      case "3 Months":

        amount =
          settings.threeMonthPrice;
        break;

      case "6 Months":

        amount =
          settings.sixMonthPrice;
        break;

      case "12 Months":

        amount =
          settings.oneYearPrice;
        break;

      default:

        return res.status(400).json({

          message:
            "Invalid membership plan."

        });

    }

    member.paymentAmount =
      amount;

    member.paymentStatus =
      "Paid";

    await member.save();

    await Payment.create({

      memberId:
        member._id,

      memberName:
        member.name,

      amount,

      plan:
        member.plan,

      paymentStatus:
        "Paid",

    });

    try {

      await sendWhatsAppMessage(

        member.phone,

`🏋️ *Welcome to रामेष्ट Fitness Zone*

Hello ${member.name},

Your membership has been activated successfully.

📋 Plan: ${member.plan}

💰 Amount Paid: ₹${amount}

📅 Expiry Date:
${new Date(member.expiryDate).toDateString()}

We wish you a healthy fitness journey! 💪`

      );

    }

    catch (err) {

      console.log(
        "WhatsApp Error:",
        err.message
      );

    }

    res.status(201).json({

      message:
        "Member added successfully",

      member,

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

});
// ===============================
// GET ALL MEMBERS
// ===============================

router.get("/all", async (req, res) => {

  try {

    const members =
      await Member.find()
      .sort({ createdAt: -1 });

    res.json(members);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

});

// ===============================
// GET MEMBER BY ID
// ===============================

router.get("/:id", async (req, res) => {

  try {

    const member =
      await Member.findById(
        req.params.id
      );

    if (!member) {

      return res.status(404).json({

        message:
          "Member not found",

      });

    }

    res.json(member);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

});

// ===============================
// DELETE MEMBER
// ===============================

router.delete("/delete/:id", async (req, res) => {

  try {

    const member =
      await Member.findById(
        req.params.id
      );

    if (!member) {

      return res.status(404).json({

        message:
          "Member not found",

      });

    }

    await Payment.deleteMany({

      memberId:
        member._id,

    });

    await Member.findByIdAndDelete(
      req.params.id
    );

    res.json({

      message:
        "Member deleted successfully",

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

});
// ===============================
// RENEW MEMBERSHIP
// ===============================

router.put("/renew/:id", async (req, res) => {

  try {

    const member =
      await Member.findById(req.params.id);

    if (!member) {

      return res.status(404).json({

        message:
          "Member not found",

      });

    }

    const { plan } = req.body;

    const settings =
      await Settings.findOne();

    if (!settings) {

      return res.status(500).json({

        message:
          "Membership prices are not configured."

      });

    }

    let amount = 0;

    switch (plan) {

      case "1 Month":

        amount =
          settings.oneMonthPrice;

        break;

      case "3 Months":

        amount =
          settings.threeMonthPrice;

        break;

      case "6 Months":

        amount =
          settings.sixMonthPrice;

        break;

      case "12 Months":

        amount =
          settings.oneYearPrice;

        break;

      default:

        return res.status(400).json({

          message:
            "Invalid membership plan."

        });

    }

    const expiry =
      new Date(member.expiryDate);

    if (expiry < new Date()) {

      expiry.setTime(
        Date.now()
      );

    }

    switch (plan) {

      case "1 Month":

        expiry.setMonth(
          expiry.getMonth() + 1
        );

        break;

      case "3 Months":

        expiry.setMonth(
          expiry.getMonth() + 3
        );

        break;

      case "6 Months":

        expiry.setMonth(
          expiry.getMonth() + 6
        );

        break;

      case "12 Months":

        expiry.setFullYear(
          expiry.getFullYear() + 1
        );

        break;

    }

    member.plan = plan;

    member.paymentAmount =
      amount;

    member.paymentStatus =
      "Paid";

    member.expiryDate =
      expiry;

    member.notificationSent =
      false;

    await member.save();

    const payment =
      await Payment.create({

        memberId:
          member._id,

        memberName:
          member.name,

        amount,

        plan,

        paymentStatus:
          "Paid",

      });

    console.log(
      "Payment created:",
      payment._id
    );

    try {

      await sendWhatsAppMessage(

        member.phone,

`✅ *Membership Renewed*

Hello ${member.name},

Your membership has been renewed successfully.

📋 Plan: ${plan}

💰 Amount Paid: ₹${amount}

📅 New Expiry Date:
${member.expiryDate.toDateString()}

Thank you for choosing
*रामेष्ट Fitness Zone!* 💪`

      );

    }

    catch (err) {

      console.log(

        "WhatsApp Error:",

        err.message

      );

    }

    res.json({

      message:
        "Membership renewed successfully",

      member,

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

});

module.exports = router;