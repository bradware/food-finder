'use strict';

// Dependencies from NPM
var express = require('express');
var yelp = require('yelp');
var app = express();

// Constants
var port = process.env.PORT || 8000;
var consumer_key = 'dMy7osovALGZw-wy-P3P7g';
var consumer_secret = 'XSBYeVIvXv7gtAvHGqH9W08W-0w';
var token = 'qCX0ddXOnXGngJHcJpT16QyD6WFDqOpj';
var token_secret = 'ETPHr-bOb3dU6twK3fLhOGnf5QI';

// Makes static assets available and starts server listening on port
app.use(express.static('static'));
app.listen(port);

// Initializes Yelp API connection
var yelpApi = new yelp({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  token: token,
  token_secret: token_secret,
});

/**
* Back end API routing using Express
* Only listens for GET requests from client
* Takes query from client and passes request to Yelp API
* Returns response from Yelp API to client
*/
app.get('/search', function (req, res) {
  yelpApi.search(req.query)
	.then(function(data) {
	  res.send(data);
	})
	.catch(function(err) {
    res.status(err.statusCode).send(err.data);
	});
});
