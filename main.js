var express = require('express');
var app = express();
app.use(express.static(__dirname));
var bodyParser = require('body-parser');
var request = require('request');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

var securityIdentifiers = [{Name :"Symbol"}, {Name :"CIK"}, {Name : "CUSIP"}, {Name : "ISIN"}, {Name : "VALOREN"}, {Name : "SEDOL"}];

var PriceAdapter = require('./price_adapter');
var adapter = new PriceAdapter();

app.get('/', function(req, res){
	res.sendFile('index.html');
});

app.get('/IdentifierTypes', function(req, res){
	res.json(securityIdentifiers);
});

app.get('/adapters', function(req, res){
	res.json(adapter.getAdapters());
});

app.post('/Securities', function(req, res){	
	var identifierType = req.body.IdentifierType;
	var identifier = req.body.Identifier;
	var priceAdapter = req.body.Adapter;
	console.log(req.body);
	var success = function(result)
	{
		res.json(result);
	}
	var fail = function(error)
	{
		res.status(400).send(error);
	}
	adapter.getPrice(identifierType, identifier, success, fail, priceAdapter);
});

app.listen(3000, function(){
	console.log('Server started at ' + 3000);
});


function createXigniteUrl(identifier, ticker)
{
	var template = 'http://globalquotes.xignite.com/v3/xGlobalQuotes.json/GetGlobalDelayedQuote?_token=BE130EE38FD84F0B93917BBF0B6F437F&Identifier=#{identifier}&IdentifierType=#{identifierType}';
	template = template.replace('#{identifier}', ticker);
	return template.replace('#{identifierType}', identifier);
}