const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const constants = require("./constants.js");

const server = express();

server.use(cors());
server.use(express.json());

const db = mysql.createConnection(constants.dbConnection);

// TODO: Currently users with non unique usernames can be added. Don't want that

// POST request on /users/login route
// Takes in a username and password from the user
server.post(constants.usersLoginRoute, async (req, res) => {
  const username = req.body.username;

  db.query(
    `
  SELECT u.username, u.password
  FROM ${constants.usersTableName} AS u
  WHERE username = '${username}'`,
    async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        // If the user does not exist
        if (result.at(0) == null) {
          return res.status(400).send("Cannot find user");
        }
        try {
          console.log(result.at(0));
          if (await bcrypt.compare(req.body.password, result.at(0).password)) {
            // If the user is authenticated
            res.status(200).send("Login success");
          } else {
            // If the user is unsuccessfully authenticated
            res.status(400).send("Not allowed");
          }
        } catch (err) {
          console.log(err);
          // If bcrypt has an issue
          res.status(500).send();
        }
      }
    }
  );
});

// POST request on /users route
server.post(constants.usersRoute, async (req, res) => {
  console.log("Recieved POST request");

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;

    db.query(
      `INSERT INTO ${constants.usersTableName} (username, password) VALUES (?,?)`,
      [username, hashedPassword],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).send();
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

// GET requests on the /users route
server.get(constants.usersRoute, (req, res) => {
  console.log("Received GET request");
  db.query(`SELECT * FROM ${constants.usersTableName}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

server.listen(constants.port, () => {
  console.log("Server listening on port 3002...");
});
