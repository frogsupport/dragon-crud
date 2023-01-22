const express = require("express");
const server = express();
const mysql = require("mysql2");
const cors = require("cors");

server.use(cors());
server.use(express.json());

const port = 3001;
const dragonsRoute = "/dragons";
const dragonsTableName = "dragons";

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "dragon",
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})


server.post(dragonsRoute, (req, res) => {
    console.log("Received POST request");
    console.log("Request body is: " + req.body);

    const name = req.body.name;
    const age = req.body.age;
    const dragonType = req.body.dragonType;
    const gender = req.body.gender;
    const size = req.body.size;

    console.log("Recieved POST request");

    db.query(
        `INSERT INTO ${dragonsTableName} (name, age, dragonType, gender, size) VALUES (?,?,?,?,?)`, 
        [name, age, dragonType, gender, size],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Inserted Successfully\n" +
                "Name: " +
                name +
                "\nAge: " +
                age +
                "\nDragon Type: " +
                dragonType +
                "\nGender: " +
                gender +
                "\nSize: " +
                size)
            }
        });
});
