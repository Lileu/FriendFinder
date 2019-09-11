// LOAD DATA
var friends = require("../data/friends");

// ROUTING
// ===============================================================================

module.exports = function (app) {
    // retrieve all friends data in json format
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    // handle incoming survey results
    app.post('/api/friends', function (req, res) {
        // req.body property parses incoming request bodies in a middleware before handlers
        // record all user input
        var userInput = req.body;

        // record survey responses
        var userResponses = userInput.scores;

        // compute match
        var matchName = '';
        var matchImage = '';
        var totalVariance = 10000;


        // for each friend in the db
        for (var i = 0; i < friends.length; i++) {
            // calculate the difference between their score and the user's score
            var scoreVariance = 0;
            for (var j = 0; j < userResponses.length; j++) {
                scoreVariance += Math.abs(friends[i].scores[j] - userInput[j]);
            }
            // find the friend with the lowest score variance and declare that friend as the match
            if (scoreVariance < totalVariance) {

                totalVariance = scoreVariance;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }
        // add new user to db
        friends.push(userInput);
        // send response with the match data
        res.json({
            status: 'OK',
            matchName: matchName,
            matchImage: matchImage
        });

    });
};