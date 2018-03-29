require('dotenv').config( )
var keys = require('./keys.js')

// take in commands:
var command = process.argv[2]
var search = process.argv[3]

// for twitter API
var Twitter = require('twitter')
var client = new Twitter(keys.twitter)
function tweets ( ) {
  var params = {screen_name: 'the_fingerTM'}
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(var i = 0; i < tweets.length; i++) {
        console.log('Tweet: ' + tweets[i].text + ', Created at: ' + tweets[i].created_at)
      }
    }
  })
}

// for spotify API
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
function spot ( ) {
  if (search === undefined) {
    // default if no search term is provided
    spotify
      .request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
      .then(function(data) {
        console.log(data.name + ' by ' + data.artists[0].name + ' on ' + data.album.name + ' / Link: ' + data.preview_url); 
      })
      .catch(function(err) {
        console.error('Error occurred: ' + err); 
      })
  } else {
    spotify.search({ type: 'track', query: ''+search+'' }, function(err, data) {
      for(var i = 0; i <= 10; i++) {
      if (err) {
        return console.log('Error occurred: ' + err)
      } 
      console.log(data.tracks.items[i].name + ' by ' + data.tracks.items[i].artists[i].name + ' on ' + data.tracks.items[i].album.name + ' / Link: ' + data.tracks.items[i].preview_url)
      }
    })
  }
}

// for OMDB API
var request = require("request")
function omdb ( ) {
  // default if no search term is provided
  if (search === undefined) {
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
    request("http://www.omdbapi.com/?t="+search+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
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
}

// for do-what-it-says command
var fs = require('fs')
var path = 'random.txt'
function random ( ) {
  fs.readFile(path, 'utf8', function (err, d) {
    if (err) {console.log(err)}
    var arr = d.split(',')
    command = arr[0]
    search = arr[1]
    if (command === 'spotify-this-song') {
      spot( )
    }
    if (command === 'my-tweets') {
      tweets( )
    }  
    if (command === 'movie-this') {
      omdb( )
    }
  })
}

// switch-case to perform actions based on commands:
switch (command) {
  case "my-tweets":
    tweets ( )
    break
  case "spotify-this-song":
    spot ( )
    break
  case "movie-this":
    omdb( )
    break
  case "do-what-it-says":
    random( )
    break
}

// questions: (1) how to limit tweets to 20 instead of the entire array; (2) spotify breaks after first 2 returns