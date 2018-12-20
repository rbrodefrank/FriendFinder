var mysql = require("mysql");

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

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        //Display JSON of all possible friends
        connection.query("SELECT * FROM profiles",
            function (err, data) {
                if (err) return res.status(500).end();
                console.log(data);
                res.json(data);
            }
        )
    });

    app.post("/api/friends", function (req, res) {
        // handles incoming survey results
        // console.log(req.body) //req.body is an object with name, img, and scores info
        var answers = "";
        var scores = req.body.scores;
        for (var i = 0; i < req.body.scores.length; i++) {
            var num = parseInt(req.body.scores[i]);
            if (!Number.isNaN(num) && 0 < num && num <= 5) {
                if (i == 0) {
                    answers += num;
                } else {
                    answers += ", " + num;
                }
            } else {
                res.json(null).end();
                console.log("Input Error");
                return;
            }
        }
        connection.query("SELECT * FROM profiles", function (err, response) {
            if (err) throw err;
            //a fun trick for converting mysql's returned 'rowPacketData' obj into more usable JSON
            var data = JSON.stringify(response);
            friends = JSON.parse(data);
            // console.log(friends);
            // loop over your data converting the string of numbers into an array (using split??)
            var indexBF = 0;
            var diffBF = -4;
            for (var i = 0; i < friends.length; i++) {
                var arr = friends[i].scores.split(", ");
                for (var j = 0; j < arr.length; j++) {
                    arr[j] = parseInt(arr[j]);
                }
                console.log(arr);
                var diff = 0;
                for (var j = 0; j < arr.length; j++) {
                    diff += Math.abs(arr[j] - scores[j]);
                }
                console.log(`\nname: ${friends[i].name}`);
                console.log(`diffBF: ${diffBF}`);
                console.log(`diff: ${diff}`);
                if (diffBF < 0 || diffBF > diff) {
                    indexBF = i;
                    diffBF = diff;
                }
            }
            var bf = {
                name: friends[indexBF].name,
                photo: friends[indexBF].photo
            }
            res.json(bf);

            connection.query("INSERT INTO profiles (name, photo, scores) VALUES (?, ?, ?)",
                [req.body.name, req.body.img, answers],
                function (err, results) {
                    if (err) res.status(500).end();
                    console.log(`Affected Rows: ${results.affectedRows}`);
                }
            );
        });

    });
}