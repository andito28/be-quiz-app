const quizModel = require("../models/quiz");
const fs = require("fs");

function deletFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return;
    }
  });
}

const createQuiz = (req, res) => {
  if (req.file) {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024;
    // console.log(allowedMimes.includes(req.file.mimetype));
    if (allowedMimes.includes(req.file.mimetype) == false) {
      deletFile(req.file.path);
      return res.status(402).json({
        message: "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
      });
    }

    if (req.file.size > maxSize) {
      deletFile(req.file.path);
      return res.status(402).json({
        message:
          "File size exceeds the limit (2 MB). Please upload a smaller file.",
      });
    }
  }

  res.json({
    message: "Quiz berhasil dibuat",
    formData: req.body,
  });
};

module.exports = {
  createQuiz,
};
