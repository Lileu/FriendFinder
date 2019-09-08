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
app.use(express.urlencoded({ extended: true}));
app.use(express.json())
// Static middleware function which allows access to the public folder via its absolute path    
app.use('/static', express.static(path.join(__dirname, 'public')))

// ROUTER
// ===============================================================================
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

// LISTENER
// ===============================================================================
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  