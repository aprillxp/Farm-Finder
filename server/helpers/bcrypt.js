const bcrypt = require("bcrypt");

const hash = (password) => bcrypt.hashSync(password, 10);
const compare = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  hash,
  compare,
};
