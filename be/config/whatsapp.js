const { Client, LocalAuth } =
require("whatsapp-web.js");

const qrcode =
require("qrcode-terminal");

const client =
new Client({

  authStrategy:
    new LocalAuth(),

});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Scan WhatsApp QR");
});

client.on("authenticated", () => {
  console.log("WhatsApp Authenticated");
});

client.on("ready", () => {
  console.log("WhatsApp Connected");
});

client.on("auth_failure", (msg) => {
  console.log("WhatsApp Auth Failure:", msg);
});

client.on("disconnected", (reason) => {
  console.log("WhatsApp Disconnected:", reason);
});

client.initialize();
const sendWhatsAppMessage =
async (phone, message) => {

  try {

    const chatId =
      `91${phone}@c.us`;

    await client.sendMessage(
      chatId,
      message
    );

    console.log(
      "WhatsApp sent"
    );

  } catch (err) {

    console.log(
      "WhatsApp Error:",
      err
    );

  }

};

module.exports =
sendWhatsAppMessage;