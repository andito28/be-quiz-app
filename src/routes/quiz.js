const express = require("express");

const router = express.Router();

router.get("/get-quiz", (req, res) => {
  res.json({
    message: "test",
  });
});

module.exports = router;
