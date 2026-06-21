const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp Client Ready");
});

client.initialize();

const sendWhatsAppMessage = async (
  phone,
  message
) => {

  const formattedNumber =
    `91${phone}@c.us`;

  await client.sendMessage(
    formattedNumber,
    message
  );
};

module.exports = sendWhatsAppMessage;