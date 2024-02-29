const bcrypt = require("bcryptjs");
const { sendEmail } = require("../helper/emailhelper");
const mail = require("../mail/otpMail");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

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

//function resend OTP
const resendOtp = async (req, res) => {
  const { email } = req.body;

  const checkEmail = await userModel.findEmail(email);

  if (checkEmail.length < 1 || checkEmail[0].is_active == 1) {
    return res.status(400).json({
      message: "incorrect email or user is active",
    });
  }

  let otp = generateRandomNumber();
  let name = checkEmail[0].name;

  await userModel.updateOtp(otp, email);
  sendOtp(name, email, otp);

  return res.status(201).json({
    message: "success resend OTP",
  });
};

//function login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await userModel.findEmail(email);

    if (checkUser.length < 1) {
      return res.status(400).json({
        message: "incorrect email",
      });
    }

    const match = await bcrypt.compare(password, checkUser[0].password);

    if (!match) {
      return res.status(400).json({
        message: "incorrect password",
      });
    }
    const userId = checkUser[0].id;
    const name = checkUser[0].name;

    const token = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

//function verify otp
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const checkOtp = await userModel.findOtp(email, otp);

    if (checkOtp.length > 0) {
      await userModel.updateStatusUser(checkOtp[0].email);
      res.status(200).json({
        message: "OTP verification successful",
      });
    } else {
      res.status(400).json({
        message: "The provided OTP is not correct",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  register,
  verifyOtp,
  login,
  resendOtp,
};
