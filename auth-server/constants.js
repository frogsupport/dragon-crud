// Constants uses in the server logic
const port = 3002;
const usersRoute = "/users";
const usersLoginRoute = "/users/login";
const usersTableName = "users";
const dbConnection = {
  user: "root",
  host: "localhost",
  password: "password",
  database: "dragon",
};

module.exports = {
  port,
  usersRoute,
  usersLoginRoute,
  usersTableName,
  dbConnection,
};
