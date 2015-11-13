var express = require('express');
var superagent = require('superagent');
var app = express();


app.use(express.static(__dirname + '/public')); // Set the web root to be /public


app.get('/', function (req, res) {
	res.sendFile('./public/index.html');
});

app.get('/api/shows/:leg', function(req, res){
  console.log(req.params.leg);
  var search = req.params.leg;
  var TVMazeURL = 'http://api.tvmaze.com/search/shows?q=' + search;
  superagent.get(TVMazeURL)
    .end(function (err, response) {
      if(err) console.error("HALP PLS");
      else{
        if(response && response.body){
          var arr = [];
          for(var i = 0; i < response.body.length; i++){
            arr.push(response.body[i].show);
          }
          res.send(arr);
        }
      }
  });
});

app.listen(8080, function () {
	console.log('Server is running.')
});
