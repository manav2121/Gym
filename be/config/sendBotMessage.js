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

  } catch (error) {

    console.log("Bot Error:", error.message);
    throw error;

  }
};

module.exports = sendBotMessage;