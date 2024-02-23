const bcrypt = require("bcryptjs");
const { sendEmail } = require("../helper/emailhelper");
const mail = require("../mail/otpMail");
const userModel = require("../models/user");

const generateRandomNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

//function send otp
const sendOtp = async (username, email, otp) => {
  try {
    const emailBodyOtp = mail.generateEmailBody(username, otp);
    const result = await sendEmail(
      email,
      "OTP for email verification",
      emailBodyOtp
    );
    console.log(` success ${result}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

//function register user
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

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  let otp = generateRandomNumber();
  const dataRequest = {
    name: name,
    email: email,
    password: hash,
    otp: otp,
  };

  try {
    const checkUser = await userModel.findEmail(email);

    if (checkUser.length > 0) {
      return res.status(400).json({
        message: "email has been registered",
      });
    }

    //call function send otp
    sendOtp(name, email, otp);

    await userModel.createUser(dataRequest);
    return res.status(201).json({
      message: "Success register user",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  register,
};
