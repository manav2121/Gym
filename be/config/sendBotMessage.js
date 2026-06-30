const axios = require("axios");

const sendBotMessage = async (phone, message) => {
  try {
    const response = await axios.post(
      "https://sandbar-importer-aids.ngrok-free.dev/send-message",
      {
        phone,
        message,
      }
    );

    return response.data;
  } catch (err) {
    console.log("Bot Error:", err.message);
    throw err;
  }
};

module.exports = sendBotMessage;