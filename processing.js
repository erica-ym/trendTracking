var d3 = require("d3");
var fs = require('file-system');
var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");

app.listen(8080, function() {
    console.log("trendTracking server has started on port 8080");
} );

app.get("/", function(req,res){
    res.render("home");
})

var obj = JSON.parse(fs.readFileSync('testTwo.json', 'utf8'));
console.log(typeof(obj));
obj.forEach(function(tweet){
  console.log(tweet.user.retweet_count);
  console.log(tweet.user.time_zone);
  console.log(tweet.user.location);
  console.log(tweet.user.lang);
})
//how to extract data is above

//next steps are to save that data elsewhere and then figure out how to graph it



//get data out of json that you want to graph -- from test.json
//likely need to JSON.parse
//from that JSON, get language and location
//language: "iso_language_code" or "lang"
//"location", "geo" or "time_zone" doesn't always exist
//also get time

//put all of that into an object format that d3 can recognize
//you will want to look more into this

//d3 API reference
//https://github.com/d3/d3/blob/master/API.md

//examples of what you can use
//https://bl.ocks.org/mbostock

//an example of a server with D3
//https://gist.github.com/Caged/6407459
//another d3 server:
//https://gist.github.com/palanik/ba5e15dbbc7ea0574ae0d38252563b0d
