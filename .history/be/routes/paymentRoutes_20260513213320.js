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

router.get("/stats", async (req, res) => {

  try {

    const payments =
      await Payment.find();

    const totalRevenue =
      payments
      .filter((p) =>
        p.paymentStatus === "Paid"
      )
      .reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);

    const pendingRevenue =
      payments
      .filter((p) =>
        p.paymentStatus === "Pending"
      )
      .reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);

    const monthlyRevenue =
      payments
      .filter((p) => {

        const paymentDate =
          new Date(p.paymentDate);

        const today =
          new Date();

        return (
          paymentDate.getMonth()
          === today.getMonth()
        );

      })
      .reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);

    res.json({

      totalRevenue,

      pendingRevenue,

      monthlyRevenue,

      totalTransactions:
        payments.length,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;