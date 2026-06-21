const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const Settings =
require("../models/settings");

router.use(authMiddleware);

router.get("/", async (req, res) => {

  try {

    let settings =
      await Settings.findOne();

    if (!settings) {

      settings =
        await Settings.create({});
    }

    res.json(settings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/", async (req, res) => {

  try {

    let settings =
      await Settings.findOne();

    if (!settings) {

      settings =
        new Settings(req.body);
    }

    else {

      settings.oneMonthPrice =
        req.body.oneMonthPrice;

      settings.threeMonthPrice =
        req.body.threeMonthPrice;

      settings.sixMonthPrice =
        req.body.sixMonthPrice;

      settings.oneYearPrice =
        req.body.oneYearPrice;
    }

    await settings.save();

    res.json({
      message:
        "Settings updated successfully",
      settings,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;