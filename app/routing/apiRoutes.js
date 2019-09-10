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
    var totalDifference = 5000;


    // check all friends in the db
    for (var i = 0; i < friends.length; i++) {

        var diff = 0;
        for (var j = 0; j < userResponses.length; j++) {

            diff += Math.abs(friends[i].scores[j] - userInput[j]);
        }
        // find friend with lowest difference
        if (diff < totalDifference) {

            totalDifference = diff;
            matchName = friends[i].name;
            matchImage = friends[i].photo;
        }
    }
    // add new user to db
    friends.push(userInput);
    // send response       
    res.json({
        status: 'OK',
        matchName: matchName,
        matchImage: matchImage
    });

});
};




// handle the compatibility logic


//    6. Determine the user's most compatible friend using the following as a guide:

//       * Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
//       * With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
//         * Example: 
//           * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
//           * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
//           * Total Difference: **2 + 1 + 2 =** **_5_**
//       * Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both `5-3` and `3-5` as `2`, and so on. 
//       * The closest match will be the user with the least amount of difference.
});
};