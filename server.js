// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

// models route 
var db = require("./models");

// Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

// Instantiate our Express App
var app = express();

// Designate our public folder as a static directory
app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use bodyParser in our app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// If deployed, use the deployed database. Otherwise use the local movie database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/movie";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

// GET all the movies that favorite is set to false
// and render them to the index.handlebars page
app.get("/", function(req, res) {
  db.Movie.find({ favorite: false })
    .then(function(data){
      // res.json(data);
      res.render("index", {movie: data});
    }).catch(function(err){
      res.status(404).send(err);
    });
});

// GET all the movies that favorite is set to true
// and render them to the favorite.handlebars page
app.get("/favorites", function(req, res) {
  db.Movie.find({ favorite: true})
    .then(function(data){
      // res.json(data);
      res.render("favorite", {movie: data});
    }).catch(function(err){
      res.status(404).send(err);
    });
});

// POST a new movie to the mongo database
app.post("/api/movie", function(req, res){
  db.Movie.create(req.body)
    .then(function(){
      // res.json(dbMovie);
      res.redirect("/")
    }).catch(function(err){
      res.status(400).send(err);
    });
});

// PUT (UPDATE) a movie by its _id 
// Will set the movie favorite to whatever the value 
// of the req.body.favorite boolean is
app.put("/api/movie/:id", function(req, res){
  db.Movie.findByIdAndUpdate(req.params.id, {favorite: req.body.favorite}, {new: true})
    .then(function(dbMovie){
      res.json(dbMovie);
    }).catch(function(err){
      res.status(400).send(err);
    });
});

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
