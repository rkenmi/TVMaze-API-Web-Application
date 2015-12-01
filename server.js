var express = require('express');
var superagent = require('superagent');
var app = express();


app.use(express.static('./client')); // Set the web root to be ./client

require('./api/routes')(app);

app.get('*', function (req, res) {

	res.sendFile('/client/views/index.html', { root: __dirname });
});

app.listen(8080, function () {
	console.log('Server is running on 8080.')
});
