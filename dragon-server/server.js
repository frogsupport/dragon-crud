const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const constants = require("./constants");

const server = express();

server.use(cors());
server.use(express.json());

const db = mysql.createConnection(constants.dbConnection);

// GET requests on the /dragons route
server.get(constants.dragonsRoute, (req, res) => {
  console.log("Received GET request");
  db.query(`SELECT * FROM ${constants.dragonsTableName}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// POST requests on the /dragons route
server.post(constants.dragonsRoute, (req, res) => {
  console.log("Received POST request");

  const name = req.body.name;
  const age = req.body.age;
  const dragonType = req.body.dragonType;
  const gender = req.body.gender;
  const size = req.body.size;

  db.query(
    `INSERT INTO ${constants.dragonsTableName} (name, age, dragonType, gender, size) VALUES (?,?,?,?,?)`,
    [name, age, dragonType, gender, size],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send();
      }
    }
  );
});

// Run the server
server.listen(constants.port, () => {
  console.log(`Server listening on port ${constants.port}...`);
});
