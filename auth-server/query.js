const mysql = require("mysql2");
const constants = require("./constants.js");

const db = mysql.createConnection(constants.dbConnection);

let authenticateAsync = (username, callback) => {
  db.query(
    `
        SELECT u.username, u.password
        FROM ${constants.usersTableName} AS u
        WHERE username = '${username}'`,
    async (err, results) => {
      if (err) {
        throw err;
      } else {
        return callback(results.at(0));
      }
    }
  );
};

module.exports = { authenticateAsync };
