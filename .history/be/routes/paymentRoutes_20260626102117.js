
const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");
const Member =
  require("../models/Member");
const Payment =
  require("../models/payment");
router.get("/recent", async (req, res) => {

  try {

    const recentPayments =
      await Payment.find()
      .sort({ paymentDate: -1 })
      .limit(5);

    res.json(recentPayments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});
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

router.get(
  "/stats",
  async (req, res) => {

    try {



      const Member =
        require("../models/Member");
const payments =
  await Payment.find();

const totalRevenue =
  payments
    .filter(
      (p) =>
        p.paymentStatus === "Paid"
    )
    .reduce(
      (acc, curr) =>
        acc + Number(curr.amount),
      0
    );

const currentMonth =
  new Date().getMonth();

const currentYear =
  new Date().getFullYear();

const monthlyRevenue =
  payments
    .filter((p) => {

      const date =
        new Date(
          p.paymentDate
        );

      return (
        p.paymentStatus === "Paid" &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );

    })
    .reduce(
      (acc, curr) =>
        acc + Number(curr.amount),
      0
    );
      

      // MONTHLY TREND
      const monthNames = [

        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",

      ];

      const monthlyTrend =
        monthNames.map(
          (month, index) => {

          const monthlyTotal =
            payments
            .filter((p) => {

              const date =
                new Date(
                  p.paymentDate
                );

              return (
                p.paymentStatus
                === "Paid"
                &&
                date.getMonth()
                === index
              );

            })
            .reduce(
              (acc, curr) =>
                acc +
                Number(curr.amount),
              0
            );

          return {

            month,

            revenue:
              monthlyTotal,

          };

        });

      // MEMBERSHIP PLAN DISTRIBUTION
      const members =
        await Member.find();
const today = new Date();

const activeMembers =
  members.filter(
    (m) =>
      new Date(m.expiryDate) >= today
  ).length;

const expiredMembers =
  members.filter(
    (m) =>
      new Date(m.expiryDate) < today
  ).length;
      const membershipPlans = [

        {
          plan: "1 Month",
          count:
            members.filter(
              (m) =>
                m.plan
                === "1 Month"
            ).length,
        },

        {
          plan: "3 Months",
          count:
            members.filter(
              (m) =>
                m.plan
                === "3 Months"
            ).length,
        },

        {
          plan: "6 Months",
          count:
            members.filter(
              (m) =>
                m.plan
                === "6 Months"
            ).length,
        },

        {
          plan: "12 Months",
          count:
            members.filter(
              (m) =>
                m.plan
                === "12 Months"
            ).length,
        },

      ];

      // PAYMENT DISTRIBUTION
      

      res.json({

  totalRevenue,

  monthlyRevenue,

  activeMembers,

  expiredMembers,

  monthlyTrend,

  membershipPlans,

});
    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);
router.get("/member/:id", async (
  req,
  res
) => {

  try {

    const payments =
      await Payment.find({

        memberId:
          req.params.id,

      })
      .sort({ paymentDate: -1 });

    res.json(payments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
