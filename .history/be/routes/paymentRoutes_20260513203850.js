const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const Payment =
require("../models/Payment");

router.use(authMiddleware);

router.get("/all", async (req, res) => {

  try {

    const payments =
      await Payment.find()
      .sort({ paymentDate: -1 });

    res.json(payments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;