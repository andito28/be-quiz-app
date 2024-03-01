const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const quizController = require("../controllers/quiz");
const router = express.Router();

router.post("/quiz", verifyToken, quizController.createQuiz);
module.exports = router;
