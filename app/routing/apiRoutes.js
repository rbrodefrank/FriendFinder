
app.get("/api/friends", function(req, res){
    //Display JSON of all possible friends
});

app.post("/api/friends", function(req, res){
    //handles incoming survey results
});

var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "YOURPASSWORD",
        database: "YOURDBNAME"
    });
}

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        //once successfully connected, you may want to query your database for the info you'll need later!
    }
});
