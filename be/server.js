const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");
const cors = require("cors");
const sendBotMessage =
require("./config/sendBotMessage");
const Member = require("./models/Member");


dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://gym1-dusky.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/members",
  require("./routes/memberRoutes")
);

app.use(
  "/api/payments",
  require("./routes/paymentRoutes")
);

app.use(
  "/api/settings",
  require("./routes/settingsRoutes")
);

app.use(
  "/api/attendance",
  require("./routes/attendanceRoutes")
);

// CHECK MEMBERSHIP EXPIRY EVERY DAY AT 9:00 AM

cron.schedule("0 9 * * *", async () => {

  console.log("Checking expiring memberships...");

  try {

    const today = new Date();

    const members = await Member.find();

    for (const member of members) {

      const expiry =
        new Date(member.expiryDate);

      const diffDays =
        Math.ceil(
          (expiry - today) /
          (1000 * 60 * 60 * 24)
        );

      if (
        diffDays <= 3 &&
        diffDays >= 0 &&
        !member.notificationSent
      ) {

        await sendBotMessage(

          member.phone,

`🏋️ *रामेष्ट Fitness Zone*

Hello ${member.name},

Your membership will expire on

${expiry.toDateString()}.

Please renew your membership to continue enjoying uninterrupted access.

Thank you!`

        );

        member.notificationSent = true;

        await member.save();

        console.log(
          `Reminder sent to ${member.name}`
        );

      }

    }

  } catch (error) {

    console.log(error);

  }

});

const PORT =
process.env.PORT || 5000;
app.get("/test-wa", async (req, res) => {

  await axios.post(
  "http://GYM-PC-IP:3001/send-message",
  {
    phone,
    message,
  }
);

  res.send("Message sent");

});
app.get("/test-bot", async (req, res) => {

  try {

    const result =
      await sendBotMessage(
        "919798926145",
        "Message from Render 🚀"
      );

    res.json(result);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});
app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});