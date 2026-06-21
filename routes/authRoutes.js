const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const router = express.Router();

router.post("/register", async (req, res) => {

  try {

    const { email, password } =
      req.body;

    const existingAdmin =
      await Admin.findOne({ email });

    if (existingAdmin) {

      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const admin = new Admin({

      email,

      password: hashedPassword,

    });

    await admin.save();

    res.status(201).json({
      message: "Admin registered",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {

  try {

    const { email, password } =
      req.body;

    const admin =
      await Admin.findOne({ email });

    if (!admin) {

      return res.status(400).json({
        message: "Admin not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(

      {
        id: admin._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;