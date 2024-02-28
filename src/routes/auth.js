const express = require("express");
const authController = require("../controllers/auth");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.login);

module.exports = router;
