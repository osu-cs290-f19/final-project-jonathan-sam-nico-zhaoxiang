var http = require('http');
var path = require('path');
var fs = require ('fs');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var express = require('express');

const port = process.env.PORT||3000;
var app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
var scoreData = require('./scores');
var reviewData = require('./reviews');

app.get('', function (req, res) {
	res.status(200).sendFile(__dirname+'/public/homepage.html');
});
app.get('/home', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/homepage.html');
});
app.get('/homepage', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/homepage.html');
});
app.get('/reviews', function (req, res, next) {
	res.status(200).render('reviewPage', {
		reviewData: reviewData
	});
});
app.get('/controls', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/controls.html');
});
app.get('/scores', function (req, res, next) {
	res.status(200).render('scorePage', {
		scoreData: scoreData
	});
});
app.get('/game', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/game.html');
});
app.get('/', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/homepage.html');
});




////////////////////////////////////////////////////////////////////
app.get('/reviews/add', function (req, res, next) {





});
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
app.get('/game/add', function (req, res, next) {





});
////////////////////////////////////////////////////////////////////




app.listen(port, function(){
	console.log("listening to requests on port: ", port);
});