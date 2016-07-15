var express = require('express');
var superagent = require('superagent');
var app = express();


app.use(express.static('./client')); // Set the web root to be ./client

require('./api/routes')(app);

app.get('*', function (req, res) {

	res.sendFile('/client/views/index.html', { root: __dirname });
});

// Heroku cannot use a specific port
// Heroku uses process.env.PORT to dynamically choose a port
// For local testing, 8080 will be used
app.listen(process.env.PORT || 8080, function () {
	console.log('Server is running on 8080.')
});
