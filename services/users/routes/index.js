const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../../../middleware/authMiddleware");

// User Routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authMiddleware, userController.getUser);
router.get("/", userController.getUser);

module.exports = router;
