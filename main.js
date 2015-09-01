var express = require('express');
var app = express();
app.use(express.static(__dirname));
var bodyParser = require('body-parser');
var request = require('request');

app.get('/', function(req, res){
	res.send('Hello from Security Service');
})

app.listen(3000, function(){
	console.log('Server started at ' + 3000);
});