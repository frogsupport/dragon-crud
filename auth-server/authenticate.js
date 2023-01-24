const bcrypt = require("bcrypt");
const db = require("./query.js");

let authenticateAsync = (username, password, callback) => {
  db.authenticateAsync(username, async (result) => {
    if (await bcrypt.compare(password, result.password)) {
      return callback(true);
    } else {
      return callback(false);
    }
  });
};

module.exports = { authenticateAsync };
