const {
  Client,
  LocalAuth,
} = require("whatsapp-web.js");

const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, {
    small: true,
  });
});

client.on("ready", () => {
  console.log(
    "WhatsApp Client Ready"
  );
});

client.initialize();

const sendWhatsAppMessage = async (
  phone,
  message
) => {

  try {

    const cleanPhone =
      phone.toString().replace(/\D/g, "");

    const chatId =
      `91${cleanPhone}@c.us`;

    await client.sendMessage(
      chatId,
      message
    );

    console.log(
      `WhatsApp sent to ${phone}`
    );

  } catch (error) {
    console.log(error);
  }
};

module.exports = sendWhatsAppMessage;