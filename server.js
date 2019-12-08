 var http = require('http');
 var fs = require ('fs');
 var homepage = fs.readFileSync('/public/homepage.html', 'utf-8');
 var Reviews = fs.readFileSync('/public/Reviews.html', 'utf-8');
 var game = fs.readFileSync('/public/game.html', 'utf-8');
 var controls = fs.readFileSync('/public/controls.html', 'utf-8');

 var style = fs.readFileSync('/public/style.css', 'utf-8');
 var javascript = fs.readFileSync('./public/index.js', 'utf-8');
 var error404 = fs.readFileSync('./public/404.html', 'utf-8');
 var benny = fs.readFileSync('./public/benny.jpg');

 const port = process.env.PORT||3000;
 //console.log('your port is ${port}');
	//command line PORT=XXXXX node server js, XXXX is the port I want
 function requesthandler(req, res){
	if(req.url == '/index.html' || req.url =='/'){
		res.writeHead(200,{
			'Content-Type':'text/html'});
		res.write(index);
		res.end();
	}
	else if(req.url == '/index.js'){
		res.writeHead(200,{
			'Content-Type':'text/javascript'});
		res.write(javascript);
		res.end();
	}
	else if(req.url == '/style.css'){
		res.writeHead(200,{
			'Content-Type':'text/css'});
		res.write(style);
		res.end();
	}
	else if(req.url == '/benny.jpg'){
	res.writeHead(200,{
		'Content-Type':'image/jpeg'});
	res.write(benny);
	res.end();
	}
	else if(req.url == '/404.html'){
	res.writeHead(200,{
		'Content-Type':'text/html'});
	res.write(error404);
	res.end();
	}
	else{
		res.writeHead(404,{
			'Content-Type':'text/html'});
		res.write(error404);
		res.end();
	}
 };

var server = http.createServer(requesthandler);

server.listen(port, function(){
	console.log("listening to requests on port: ", port);
});