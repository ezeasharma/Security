var XIgniteAdapter = require('./adapters/xignite_adapter');
var TradierAdapter = require('./adapters/tradier_adapter');
var MarkitAdapter = require('./adapters/markit_adapter');

function PriceAdapter()
{
	this.adapters = [];
	this.adapters["xignite"] = new XIgniteAdapter();
	this.adapters["tradier"] = new TradierAdapter();
	this.adapters["markit"] = new MarkitAdapter();
}

PriceAdapter.prototype.getPrice = function(identifierType, identifier, success, fail, source)
{
	console.log(source + ' adapter called for ' + identifier);
	if(!source || typeof(source) == "undefined")
		this.adapters["tradier"].getPrice(identifierType, identifier, success, fail);
	else
		this.adapters[source].getPrice(identifierType, identifier, success, fail);
}

PriceAdapter.prototype.getAdapters = function()
{
	return [{Name : "tradier"}, {Name : "xignite"}, {Name : "markit"}];
}

module.exports = PriceAdapter;