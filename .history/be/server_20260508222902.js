const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));

cron.schedule("0 9 * * *", async () => {
  console.log("Checking expiring memberships...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

const Member = require("./models/member");
const sendExpiryMail = require("./config/sendMail");

cron.schedule("0 9 * * *", async () => {
  const today = new Date();

  const members = await Member.find();

  for (let member of members) {
    const diffTime = member.expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 3 && !member.notificationSent) {
      if (member.email) {
        await sendExpiryMail(
          member.email,
          member.name,
          member.expiryDate.toDateString()
        );
      }

      member.notificationSent = true;
      await member.save();
    }
  }
});