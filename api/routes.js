var config = require('../config.json');
var superagent = require('superagent');
var fs = require('fs');
var session = require('express-session');

module.exports = function(app) {

  var options = {
    host: 'luminous-heat-8130.firebaseio.com',
    token: 'OjohlfrWiPUwHHT7qVA8LWxN9KtZJH6kdC5ikeVI',
    reapInterval: 31540000000
  };

  var FirebaseStore = require('connect-firebase')(session);
  app.use(session({
    store: new FirebaseStore(options),
    secret: config.Cookies.token,
    resave: true,
    saveUninitialized: true,
    cookie: {
      searchHistory : [],
      maxAge : 31540000000
    }
  }))

  app.get('/api/searchHistory', function(req, res){
    var sess = req.session;
    res.send(sess.searchHistory);
  });

  app.get('/api/shows/:leg', function(req, res){
    var sess = req.session;

    if(sess.searchHistory){
      var searchHistory = sess.searchHistory;
      if (searchHistory.indexOf(req.params.leg) == -1){
        //console.log(searchHistory.indexOf(req.params.leg));
        ;
      } else {
        searchHistory.splice(searchHistory.indexOf(req.params.leg), 1);
      }
      searchHistory.push(req.params.leg);
      sess.searchHistory = searchHistory;
      sess.searchHistory;
    } else{
      sess.searchHistory = [];
      sess.searchHistory.push(req.params.leg);
    }

    //console.log(sess.searchHistory);

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
