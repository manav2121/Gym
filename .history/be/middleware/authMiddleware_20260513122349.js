const jwt = require("jsonwebtoken");

const authMiddleware = (
  req,
  res,
  next
) => {

  try {

    console.log(
      "Authorization Header:",
      req.headers.authorization
    );

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      console.log("No auth header");

      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token =
      authHeader.split(" ")[1];

    console.log("Token:", token);

    if (!token) {

      console.log("No token found");

      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();

  } catch (error) {

    console.log(
      "JWT ERROR:",
      error.message
    );

    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = authMiddleware;