require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("./constants.js");
const authProvider = require("./authenticate.js");

const server = express();

server.use(cors());
server.use(express.json());

const db = mysql.createConnection(constants.dbConnection);

// TODO: Currently users with non unique usernames can be added. Don't want that

// Login user
// POST request on /users/login route
// Takes in a username and password from the user
server.post(constants.usersLoginRoute, (req, res) => {
  console.log("Received POST request /users/login");

  const username = req.body.username;
  const password = req.body.password;

  try {
    authProvider.authenticateAsync(username, password, (authorized) => {
      if (authorized) {
        const user = {
          username: username,
          password: password,
        };

        // Generates the jwt token, expires in 15 minutes
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "15min",
        });

        res.status(200).json({ accessToken: accessToken });
      } else {
        res.status(204).send();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// Create user
// POST request on /users route
server.post(constants.usersRoute, async (req, res) => {
  console.log("Recieved POST request /users");

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

// List users
// GET requests on the /users route
server.get(constants.usersRoute, (req, res) => {
  console.log("Received GET request /users");
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

// Middleware function
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};
