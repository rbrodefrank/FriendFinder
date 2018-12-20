var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

function loadProfiles() {
    // Selects all of the data from the MySQL profiles table
    connection.query("SELECT * FROM profiles", function (err, res) {
        if (err) throw err;
        //a fun trick for converting mysql's returned 'rowPacketData' obj into more usable JSON
        var data = JSON.stringify(res);
        data = JSON.parse(data);
        // loop over your data converting the string of numbers into an array (using split??)
        friends = data;
    });
}

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
