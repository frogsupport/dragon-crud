require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const server = express();

server.use(cors());
server.use(express.json());

const posts = [
  {
    user: "kyle",
    title: "post 1",
  },
  {
    user: "Jon Fish",
    title: "Fishing for me",
  },
];

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

// GET on /posts route
server.get("/posts", authenticateToken, (req, res) => {
  console.log("Received GET request /posts");

  res.json(posts.filter((post) => post.user === req.user.username));
});

server.listen(4000, () => {
  console.log("Server listening on port 4000...");
});
