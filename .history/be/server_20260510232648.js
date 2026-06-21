const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");

const Member = require("./models/Member");

const sendWhatsAppMessage =
require("./config/whatsapp");

dotenv.config();

const app = express();

app.use(cors());
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

cron.schedule("0 9 * * *", async () => {

  console.log(
    "Checking expiring memberships..."
  );

  try {

    const today = new Date();

    const members = await Member.find();

    for (let member of members) {

      const diffTime =
        member.expiryDate - today;

      const diffDays = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
      );

      if (
        diffDays <= 3 &&
        !member.notificationSent
      ) {

        await sendWhatsAppMessage(
          member.phone,
          `Hello ${member.name},
your gym membership expires on
${member.expiryDate.toDateString()}.
Please renew soon.`
        );

        member.notificationSent = true;

        await member.save();

        console.log(
          `Notification sent to ${member.name}`
        );
      }
    }

  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});