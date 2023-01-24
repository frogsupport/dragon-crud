// Constants uses in the server logic
const port = 3001;
const dragonsRoute = "/dragons";
const postsRoute = "/posts";
const dragonsTableName = "dragons";
const dbConnection = {
  user: "root",
  host: "localhost",
  password: "password",
  database: "dragon",
};

module.exports = {
  port,
  dragonsRoute,
  postsRoute,
  dragonsTableName,
  dbConnection,
};
