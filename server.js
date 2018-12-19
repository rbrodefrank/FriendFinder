var express = require("express");
var path = require("path");

var app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: ""
});
