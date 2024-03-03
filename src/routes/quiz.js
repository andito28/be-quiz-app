const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const quizController = require("../controllers/quiz");
const upload = require("../helper/uploadfile");
const router = express.Router();

router.post(
  "/quiz",
  verifyToken,
  upload.single("cover"),
  quizController.createQuiz
);
module.exports = router;
