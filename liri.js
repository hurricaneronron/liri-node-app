require('dotenv').config( )

var keys = require('./keys.js')

var twitter = keys.twitter
var spotify = keys.spotify

// console.log(process.env.TWITTER_CONSUMER_KEY)

// test connection to keys.js
console.log(twitter.consumer_key)
console.log(twitter.consumer_secret)
console.log(twitter.access_token_key)
console.log(twitter.access_token_secret)
console.log(spotify.id)
console.log(spotify.secret)