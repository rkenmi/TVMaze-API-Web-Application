var config = require('../config.json');
var superagent = require('superagent');

module.exports = function(app) {
  var arr;

  app.get('/api/shows/:leg', function(req, res){
    superagent.get(config.Search.url + req.params.leg)
      .end(function (err, response) {
        if(err) console.error("Error occured for search query");
        else{
          arr = [];
          if(response && response.body){
            for(var i = 0; i < response.body.length; i++){
              arr.push(response.body[i].show);
            }
            res.send(arr);
          }
        }
    });
  });

  app.get('/api/shows/:leg/details', function(req, res){
    var arr;
    var api_parts = config.Cast.url.split(':id');
    var url = api_parts[0] + req.params.leg;

    superagent.get(url)
      .end(function (err, response) {
        if(err) console.error("Error occured for show id lookup");
        else{
          arr = [];
          if(response && response.body){
            arr.push(response.body);

            superagent.get(url+api_parts[1])
              .end(function (err, response) {
                if(err) console.error("Error occured for show id cast lookup");
                else{
                  arr.push(response.body);
                  res.send(arr);
                }
              });
          }
        }
    });

  });
};
