require('dotenv').config( )

var keys = require('./keys.js')

var twitter = keys.twitter
var spotify = keys.spotify

// for OMDB API
var request = require("request")

// take in commands:
var command = process.argv[2]

// switch-case to perform actions based on commands:
switch (command) {
  case "my-tweets":
    break
  
  case "spotify-this-song":
    break
  
  case "movie-this":
    var movie = process.argv[3]

    if (movie === undefined) {
      request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log('Title: ' + JSON.parse(body).Title)
          console.log('Release: ' + JSON.parse(body).Year)
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
          console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value)
          console.log("Country: " + JSON.parse(body).Country)
          console.log("Language: " + JSON.parse(body).Language)
          console.log("Plot: " + JSON.parse(body).Plot)
          console.log("Starring: " + JSON.parse(body).Actors)
        }
      })
    } else {
      // run a request to the omdb API
      request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
          console.log('Title: ' + JSON.parse(body).Title)
          console.log('Release: ' + JSON.parse(body).Year)
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
          console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value)
          console.log("Country: " + JSON.parse(body).Country)
          console.log("Language: " + JSON.parse(body).Language)
          console.log("Plot: " + JSON.parse(body).Plot)
          console.log("Starring: " + JSON.parse(body).Actors)
        }
      })
    }
    break
  
  case "do-what-it-says":
    break
  }