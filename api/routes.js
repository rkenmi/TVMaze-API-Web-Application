var config = require('../config.json');
var superagent = require('superagent');

module.exports = function(app) {

  app.get('/api/shows/:leg', function(req, res){
    config.TVMaze.key = req.params.leg;
    superagent.get(config.TVMaze.url + config.TVMaze.key)
      .end(function (err, response) {
        if(err) console.error("Cannot retrieve url");
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

  app.get('/api/shows/:leg/details', function(req, res){
    console.log(req.params.leg);
  });
};
