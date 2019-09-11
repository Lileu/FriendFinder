// DEPENDENCIES
// ===============================================================================
var express = require("express");
var path = require("path");

// EXPRESS CONFIGURATION
// ===============================================================================

var app = express();
var PORT = process.env.PORT || 8080;

// EXPRESS MIDDLEWARE
// ===============================================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// Static middleware function which allows access to the public folder via its absolute path    
app.use(express.static(path.join(__dirname, 'public')))

// ROUTER
// ===============================================================================
require(path.join(__dirname, "./app/routing/apiRoutes"))(app);
require(path.join(__dirname, "./app/routing/htmlRoutes"))(app);

// LISTENER
// ===============================================================================
app.listen(PORT, function() {
    console.log("Friend Finder App is listening on PORT: " + PORT);
  });
  