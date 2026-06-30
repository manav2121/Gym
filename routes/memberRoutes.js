const Settings =
require("../models/settings");

const Payment =
require("../models/payment");



router.put("/renew/:id", async (req, res) => {

try {

```
const { plan } = req.body;

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

const today =
  new Date();

let expiryDate =
  new Date(today);

if (plan === "1 Month") {

  expiryDate.setMonth(
    expiryDate.getMonth() + 1
  );

}

else if (plan === "3 Months") {

  expiryDate.setMonth(
    expiryDate.getMonth() + 3
  );

}

else if (plan === "6 Months") {

  expiryDate.setMonth(
    expiryDate.getMonth() + 6
  );

}

else if (plan === "12 Months") {

  expiryDate.setFullYear(
    expiryDate.getFullYear() + 1
  );

}

member.plan = plan;

member.expiryDate =
  expiryDate;

member.paymentAmount =
  amount;

member.paymentStatus =
  "Paid";

member.notificationSent =
  false;

await member.save();

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

try {

  await sendBotMessage(

    member.phone,
```

`✅ *Membership Renewed*

Hello ${member.name},

Your membership has been renewed successfully.

📋 Plan: ${plan}

💰 Amount Paid: ₹${amount}

📅 New Expiry Date:
${member.expiryDate.toDateString()}

Thank you for choosing
*रामेष्ट Fitness Zone!* 💪`

```
  );

} catch (err) {

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
```

}

catch (error) {

```
res.status(500).json({

  message:
    error.message,

});
```

}

});
