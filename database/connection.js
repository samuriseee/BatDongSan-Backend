const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10, // Set the maximum number of connections in the pool
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database: ", err.stack);
    return;
  }
  console.log("Success connect database");
  connection.release();
});

module.exports = pool;
