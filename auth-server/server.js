const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const constants = require("./constants.js");
const authProvider = require("./authenticate.js");

const server = express();

server.use(cors());
server.use(express.json());

const db = mysql.createConnection(constants.dbConnection);

// TODO: Currently users with non unique usernames can be added. Don't want that

const posts = [
  {
    user: "Kyle",
    title: "post 1",
  },
  {
    user: "Jon Fish",
    title: "Fishing for me",
  },
];

// GET on /posts route
server.get("/posts", (req, res) => {
  res.json(posts);
});

// POST request on /users/login route
// Takes in a username and password from the user
server.post(constants.usersLoginRoute, (req, res) => {
  console.log("Received POST request");

  const username = req.body.username;
  const password = req.body.password;

  try {
    authProvider.authenticateAsync(username, password, (authorized) => {
      if (authorized) {
        res.status(200).send("Authentication successful");
      } else {
        res.status(204).send("Authentication failed");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
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
