var http = require('http');
var path = require('path');
var fs = require ('fs');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var express = require('express');

const port = process.env.PORT||3000;
var app = express();

app.use(bodyParser.json());
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
app.post('/reviews/add', function (req, res, next) {
	console.log(req.body);
	reviewData.push({
		name: req.body.name,
		recommend: req.body.recommend,
		rating: req.body.rating,
		review: req.body.review
	  });
	fs.writeFile(
		__dirname + '/reviews.json',
		JSON.stringify(reviewData, 2, null),
		function (err) {
			if (!err) {
			res.status(200).send();
			} else {
			res.status(500).send("Failed to write data on server side.");
			}
		}
	);
});
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
app.post('/game/add', function (req, res, next) {
    if (req.body && req.body.name && req.body.highscore) {
		//for (i=0; i<scoreData.length; i++) {

		var dataLength = scoreData.length;
		for (i=0; i<dataLength; i++) {
			if (parseInt(scoreData[i].highscore) < parseInt(req.body.highscore)) {
				scoreData.splice(i,0,{
					name: req.body.name,
					highscore: req.body.highscore
				});
				break;
			}
		}
	}

	fs.writeFile(
		__dirname + '/scores.json',
		JSON.stringify(scoreData, 2, null),
		function (err) {
			if (!err) {
			res.status(200).send();
			} else {
			res.status(500).send("Failed to write data on server side.");
			}
		}
	);
});
////////////////////////////////////////////////////////////////////




app.listen(port, function(){
	console.log("listening to requests on port: ", port);
});