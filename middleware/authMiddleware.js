const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  console.log("in middleware");
  const token = req.header("Authorization");
  console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
