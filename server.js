var express = require("express");
var path = require("path");
var mysql = require("mysql");
var app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "friendfinder_db"
    });
}

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        //once successfully connected, you may want to query your database for the info you'll need later!
    }
});

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

function loadProfiles() {
    // Selects all of the data from the MySQL profiles table
    connection.query("SELECT * FROM profiles", function(err, res) {
      if (err) throw err;
      //a fun trick for converting mysql's returned 'rowPacketData' obj into more usable JSON
      var data = JSON.stringify(res);
      data = JSON.parse(data);
      // loop over your data converting the string of numbers into an array (using split??)
      friends = data;
    });
  }
  