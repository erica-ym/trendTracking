require('dotenv').config()
var Twitter = require('twitter');
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

client.get('https://api.twitter.com/1.1/search/tweets.json?q=partido&l=es&src=typd', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
    var info = JSON.stringify(tweets, null, 4);
    fs.writeFile('new.txt', info, 'utf8', function(err,data) {
    if(err) {
        console.log(err);
    } else {
        fs.writeFile('new.json', info, 'utf8');
        //fs.unlink('new.txt');
    }
  });
  }
});

//fs.writeFile('test.json', JSON.stringify({ a:1, b:2, c:3 }, null, 4));


/*
var info = JSON.stringify(tweets);
    fs.writeFile('new.txt', info, 'utf8', function(err,data) {
    if(err) {
        console.log(err);
    }
  });

var update = JSON.parse('new.txt');
fs.writeFile('newUPDATE.json', update, 'utf8', function(err,data) {
    if(err) {
        console.log(err);
    }
  });
*/







// replace up to search with https://api.twitter.com/1.1/search/tweets.json
//  https://twitter.com/search?q=health%20in%20toronto&src=typd
//https://twitter.com/search?l=es&q=trump%20near%3A%22Toronto%2C%20Ontario%22%20within%3A15mi&src=typd


/*
client.get(path, params, callback);
client.post(path, params, callback);
client.stream(path, params, callback);
*/
