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