const bcrypt = require("bcryptjs");
const { sendEmail } = require("../helper/emailhelper");
const mail = require("../mail/otpMail");

const register = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  if (!name || !email || !password || !confirm_password) {
    return res.status(402).json({
      message: "input invalid",
    });
  }

  if (password != confirm_password) {
    return res.status(400).json({
      message: "password doesn't match",
    });
  }

  const emailBodyOtp = mail.generateEmailBody("test", 1213);

  try {
    const result = await sendEmail(
      "andito763@gmail.com",
      "TEST SEND EMAIL",
      ``
    );
    res.status(200).json({
      message: ` success ${result}`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Internal Server Error");
  }

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  const dataRequest = {
    name: name,
    email: email,
    password: hash,
  };

  try {
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }

  return res.json({
    message: name,
  });
};

module.exports = {
  register,
};
