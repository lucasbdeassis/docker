const express = require("express");
const mysql = require("mysql");
const path = require("path");
const app = express();
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the MySQL server.");
});

// Set the view engine to ejs
app.set("view engine", "ejs");

// Set the path for static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  connection.query("SELECT * FROM persons", function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).send("Error executing query");
    } else {
      res.render("index", {
        title: "fullcyle",
        message: "FULL CYCLE ROCKS",
        persons: results,
      });
    }
  });
});

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});
