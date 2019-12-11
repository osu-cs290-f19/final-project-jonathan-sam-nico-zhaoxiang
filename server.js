 var http = require('http');
 var fs = require ('fs');
 var express = require('express');


 const port = process.env.PORT||3000;
 //console.log('your port is ${port}');
	//command line PORT=XXXXX node server js, XXXX is the port I want
var app = express();


app.use(express.static('public'));

app.get(' ', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/homepage.html');
	});
app.get('', function (req, res, next) {
	res.status(200).sendFile(__dirname+'/public/homepage.html');
	});
app.get('/home', function (req, res, next) {
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