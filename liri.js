require('dotenv').config( )
var keys = require('./keys.js')

var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)

var Twitter = require('twitter')
var client = new Twitter(keys.twitter)

// for OMDB API
var request = require("request")

// take in commands:
var command = process.argv[2]

// switch-case to perform actions based on commands:
switch (command) {
  case "my-tweets":
    var params = {screen_name: 'the_fingerTM'}
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for(var i = 0; i < tweets.length; i++) {
          console.log('Tweet: ' + tweets[i].text + ', Created at: ' + tweets[i].created_at)
        }
      }
    })
    break
  
  case "spotify-this-song":
    var song = process.argv[3]
    if (song === undefined) {
      spotify
        .request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
        .then(function(data) {
          console.log(data.name + ' by ' + data.artists[0].name + ' on ' + data.album.name + ' / Link: ' + data.preview_url); 
        })
        .catch(function(err) {
          console.error('Error occurred: ' + err); 
        })
    } else {
      spotify.search({ type: 'track', query: ''+song+'', limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err)
        }
      console.log(data.tracks.items)
      })
    }
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