const Settings =
require("../models/settings");
const authMiddleware =
require("../middleware/authMiddleware");

const memberValidationSchema =
require("../validation/memberValidation");

const express = require("express");

const router = express.Router();

router.use(authMiddleware);

const Member =
require("../models/Member");

const Payment =
require("../models/payment");

const sendWhatsAppMessage =
require("../config/whatsapp");
const Settings =
require("../models/settings");
const authMiddleware =
require("../middleware/authMiddleware");

const memberValidationSchema =
require("../validation/memberValidation");

const express = require("express");

const router = express.Router();

router.use(authMiddleware);

const Member =
require("../models/Member");

const Payment =
require("../models/payment");

const sendWhatsAppMessage =
require("../config/whatsapp");
const member = new Member(req.body);

const settings =
  await Settings.findOne();

let amount = 0;

if (member.plan === "1 Month") {

  amount =
    settings.oneMonthPrice;

}

else if (member.plan === "3 Months") {

  amount =
    settings.threeMonthPrice;

}

else if (member.plan === "6 Months") {

  amount =
    settings.sixMonthPrice;

}

else if (member.plan === "12 Months") {

  amount =
    settings.oneYearPrice;

}

member.paymentAmount =
  amount;

await member.save();

await Payment.create({

  memberId: member._id,

  memberName: member.name,

  amount,

  plan: member.plan,

  paymentStatus:
    member.paymentStatus,

});

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

res.status(201).json({

  message:
    "Member added successfully",

  member,

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
router.get("/:id", async (
  req,
  res
) => {

  try {

    const member =
      await Member.findById(
        req.params.id
      );

    if (!member) {

      return res.status(404)
      .json({
        message:
          "Member not found",
      });
    }

    res.json(member);

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

const settings =
  await Settings.findOne();

let amount = 0;

if (plan === "1 Month") {

  amount =
    settings.oneMonthPrice;

}

else if (plan === "3 Months") {

  amount =
    settings.threeMonthPrice;

}

else if (plan === "6 Months") {

  amount =
    settings.sixMonthPrice;

}

else if (plan === "12 Months") {

  amount =
    settings.oneYearPrice;

}
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

    else if (plan === "12 Months") {
      currentExpiry.setFullYear(
        currentExpiry.getFullYear() + 1
      );
    }

    member.expiryDate = currentExpiry;

    member.plan = plan;

    member.notificationSent = false;

    await member.save();
const payment =await Payment.create({

  memberId: member._id,

  memberName: member.name,

  amount,

  plan: member.plan,

  paymentStatus:
    member.paymentStatus,

});

console.log("Payment created:", payment);

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

console.log("Payment created:", payment);

res.json(member);
  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
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
router.get("/:id", async (
  req,
  res
) => {

  try {

    const member =
      await Member.findById(
        req.params.id
      );

    if (!member) {

      return res.status(404)
      .json({
        message:
          "Member not found",
      });
    }

    res.json(member);

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

const settings =
  await Settings.findOne();

let amount = 0;

if (plan === "1 Month") {

  amount =
    settings.oneMonthPrice;

}

else if (plan === "3 Months") {

  amount =
    settings.threeMonthPrice;

}

else if (plan === "6 Months") {

  amount =
    settings.sixMonthPrice;

}

else if (plan === "12 Months") {

  amount =
    settings.oneYearPrice;

}
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

    else if (plan === "12 Months") {
      currentExpiry.setFullYear(
        currentExpiry.getFullYear() + 1
      );
    }

    member.expiryDate = currentExpiry;

    member.plan = plan;

    member.notificationSent = false;

    await member.save();
const payment =await Payment.create({

  memberId: member._id,

  memberName: member.name,

  amount,

  plan: member.plan,

  paymentStatus:
    member.paymentStatus,

});

console.log("Payment created:", payment);

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

console.log("Payment created:", payment);

res.json(member);
  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;