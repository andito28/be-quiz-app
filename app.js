const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.use(express.json());

const authRoutes = require("./src/routes/auth");

app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`the server runs on port ${PORT}`);
});
