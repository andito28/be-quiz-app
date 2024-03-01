const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./src/routes/auth");
const quizRoutes = require("./src/routes/quiz");

app.use("/api", authRoutes);
app.use("/api", quizRoutes);

app.listen(PORT, () => {
  console.log(`the server runs on port ${PORT}`);
});
