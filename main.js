var express = require('express');
var app = express();
app.use(express.static(__dirname));
var bodyParser = require('body-parser');
var request = require('request');

app.get('/', function(req, res){
	res.sendFile('index.html');
});


app.get('/Security', function(req, res){
	res.send('Hold your horses, i am still trying to figure out integration with 3rd party market data providers');
});

app.listen(3000, function(){
	console.log('Server started at ' + 3000);
});