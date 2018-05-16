require('dotenv').config()
var Twitter = require('twitter'); //the github readme: https://github.com/desmondmorris/node-twitter
var fs = require('file-system');

//set these as environment variables when you download
var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

var params = {screen_name: 'nodejs'};

/*
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
*/

//gets a JSON with the search query specified
client.get('https://api.twitter.com/1.1/search/tweets.json?q=partido&l=es&src=typd', params, function(error, tweets, response) {
  if (!error) {
    fs.writeFile('new.json', JSON.stringify(tweets, null, 4), 'utf8');
    } else {
      console.log(err);
    }
  });

var streamingData = []

//streaming API
var stream = client.stream('statuses/filter', {track: 'airbnb'});
  stream.on('data', function(event) {
    // line below logs the entire event data
    //console.log(event);
    // line below logs just the tweet text
    console.log(event && event.text);
    var add = event;
    streamingData.push(add);
    fs.writeFile('test.json', JSON.stringify(streamingData, null, 4), 'utf8');
    });

stream.on('error', function(error) {
    throw error;
});

//from that JSON, get language and location
//language: "iso_language_code" or "lang"
//"location", "geo" or "time_zone" doesn't always exist

//Get your favourites
// client.get('favorites/list', function(error, tweets, response) {
//     if(error) throw error;
//     console.log(tweets);  // The favorites.
//     //console.log(response);  // Raw response object.
// });


// replace up to search with https://api.twitter.com/1.1/search/tweets.json
//  https://twitter.com/search?q=health%20in%20toronto&src=typd
//https://twitter.com/search?l=es&q=trump%20near%3A%22Toronto%2C%20Ontario%22%20within%3A15mi&src=typd


/*
client.get(path, params, callback);
client.post(path, params, callback);
client.stream(path, params, callback);
*/
