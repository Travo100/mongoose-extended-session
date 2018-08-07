// Movie model
// ==========

// Require mongoose
var mongoose = require("mongoose");
// Create the schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the movieSchema with the schema object
var movieSchema = new Schema({

});

// Create the movie model using the movieSchema
var Movie = mongoose.model("Movie", movieSchema);

// Export the movie model
module.exports = Movie;
