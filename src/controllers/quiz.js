const quizModel = require("../models/quiz");

const multer = require("multer");

// Konfigurasi penyimpanan dan validasi untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/coverquiz");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const createQuiz = (req, res) => {
  // Menggunakan middleware upload di sini
  upload.single("cover")(req, res, (err) => {
    if (err) {
      console.error("Error during file upload:", err);
      return res.status(400).json({ error: err.message });
    }
    console.log("File uploaded successfully:", req.file);
    res.json({
      message: "File berhasil diunggah",
      file: req.file,
    });
  });
};

module.exports = {
  createQuiz,
  upload,
};
