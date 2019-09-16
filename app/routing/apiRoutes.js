// LOAD DATA
var friendsData = require("../data/friends");

// ROUTING
// ===============================================================================

module.exports = function(app) {
  // retrieve all friends data in json format
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // handle incoming survey results
  app.post("/api/friends", function(req, res) {
    // req.body property parses incoming request bodies in a middleware before handlers
    // record all user input
    var userData = req.body;
    var userScores = userData.scores;
    var totalDifference = 0;

    // compute match
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    // for each friend in the db
    for (var i = 0; i < friendsData.length; i++) {
      totalDifference = 0;
      // calculate the difference between their score and the user's score

      for (var j = 0; j < userScores.length; j++) {
        totalDifference += Math.abs(
          parseInt(friendsData[i].scores[j]) - parseInt(userScores[j])
        );
      }
      // find the friend with the lowest score variance and declare that friend as the match
      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.friendDifference = totalDifference;
        bestMatch.name = friendsData[i].name;
        bestMatch.photo = friendsData[i].photo;
      }
    }
    // add new user to db
    friendsData.push(userData);
    //console.log(userData);
    // send response with the match data
    res.json(bestMatch);
  });
};
