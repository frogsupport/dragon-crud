const bcrypt = require("bcrypt");
const db = require("./query.js");

// Calls the database for user, compares passwords
let authenticateAsync = (username, password, callback) => {
  db.authenticateAsync(username, async (result) => {
    if (result == undefined) {
      return callback(false);
    }

    if (await bcrypt.compare(password, result.password)) {
      return callback(true);
    } else {
      return callback(false);
    }
  });
};

module.exports = { authenticateAsync };
