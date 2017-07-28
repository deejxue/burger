var express = require("express");
// Require and set Handlebars.
var exphbs = require("express-handlebars");

var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var connection = require("./config/connection.js");

var app = express();
var port = (process.env.PORT || 3000);

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: false }));
// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ 
    defaultLayout: "main" 
    })
  );

app.set("view engine", "handlebars");
// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

app.listen(port);