const bcrypt = require("bcrypt");

const authenticate = async (requestPassword, hashedPassword) => {
  return await bcrypt.compare(requestPassword, hashedPassword);
};

module.exports = { authenticate };
