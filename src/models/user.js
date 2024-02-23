const db = require("../config/database");

const createUser = (data) => {
  let query = "INSERT INTO users (name,email,password,otp) VALUE(?,?,?,?)";
  let value = [data.name, data.email, data.password, data.otp];
  return db.execute(query, value);
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

module.exports = {
  createUser,
  findEmail,
};
