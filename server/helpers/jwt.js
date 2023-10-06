const jwt = require("jsonwebtoken");

const token = (payload) => jwt.sign(payload, process.env.SECRET_JWT);
const verify = (token) => jwt.verify(token, process.env.SECRET_JWT);

module.exports = {
  token,
  verify,
};
