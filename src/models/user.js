const db = require("../config/database");

const createUser = (data) => {
  let query = "INSERT INTO users (name,email,password,otp) VALUE(?,?,?,?)";
  let values = [data.name, data.email, data.password, data.otp];
  return db.execute(query, values);
};

const findEmail = (email) => {
  let query = "SELECT * FROM users WHERE email = ?";
  value = [email];

  return db
    .execute(query, value)
    .then(([rows]) => {
      return rows;
    })
    .catch((error) => {
      throw error;
    });
};

const findOtp = (email, otp) => {
  let query = "SELECT email, otp FROM users WHERE email = ? AND otp = ?";
  let values = [email, otp];
  return db
    .execute(query, values)
    .then(([rows]) => {
      return rows;
    })
    .catch((error) => {
      throw error;
    });
};

const updateStatusUser = (email) => {
  let query = "UPDATE users SET otp = ?, is_active = ? WHERE email = ?";
  let values = [null, true, email];
  return db.execute(query, values);
};

const updateOtp = (otp, email) => {
  let query = "UPDATE users SET otp = ? WHERE email = ?";
  let values = [otp, email];
  return db.execute(query, values);
};

module.exports = {
  createUser,
  findEmail,
  findOtp,
  updateStatusUser,
  updateOtp,
};
