const express = require("express");
const Member = require("../models/Member");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.json(member);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const members = await Member.find();

    res.json(members);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;