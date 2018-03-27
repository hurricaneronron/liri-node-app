require('dotenv').config( )

var keys = require('./keys.js')

var twitter = keys.twitter
var spotify = keys.spotify

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

// run a request to the omdb API
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {
  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating)
    console.log(JSON.parse(body))
  }
})

// take in commands:
var command = process.argv[2]

// switch-case to perform actions based on commands:
switch (command) {
  case "my-tweets":
    break
  
  case "spotify-this-song":
    break
  
  case "movie-this":
    break
  
  case "do-what-it-says":
    break
  }