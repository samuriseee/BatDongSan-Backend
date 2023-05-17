const mysql = require("mysql");
require("dotenv").config();

connection = mysql.createConnection({
  host: process.env.HOST || "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Success connect database");
});

module.exports = connection;
