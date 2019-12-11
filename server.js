var http = require('http');
var fs = require ('fs');
var express = require('express');

const port = process.env.PORT||3000;
var app = express();

app.use(express.static('public'));

app.get('', function (req, res) {
	res.status(200).sendFile(__dirname+'/public/homepage.html');
});
app.get('/home', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/homepage.html');
});
app.get('/homepage', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/homepage.html');
});
app.get('/Reviews', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/Reviews.html');
});
app.get('/controls', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/controls.html');
});
app.get('/game', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/game.html');
});
app.get('/', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/homepage.html');
});
app.listen(port, function(){
	console.log("listening to requests on port: ", port);
});