const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendExpiryMail = async (email, name, expiryDate) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Gym Membership Expiry Reminder",
      html: `
        <h2>Hello ${name}</h2>
        <p>Your membership expires on ${expiryDate}</p>
        <p>Please renew your membership.</p>
      `,
    });

    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendExpiryMail;