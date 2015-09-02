var request = require('request');
function TradierAdapter()
{
	this.template = 'https://sandbox.tradier.com/v1/markets/quotes?symbols=#{identifier}'
	
	this.getUrl = function(identifier)
	{
		return this.template.replace('#{identifier}', identifier);
	}
}

TradierAdapter.prototype.getPrice = function(identifierType, identifier, success, fail)
{
	var url = this.getUrl(identifier);
	console.log('Tradier adapter called for ' + identifier);
	console.log(url);
	var options = {
		url : url,
  		method: 'GET',
		headers: {Authorization : 'Bearer ' +  'lkNtdEejGNnzlsvrrYAP6g0LgMvh', Accept : 'application/json'}
    }
	
	request.get(options, function(error, response, body){
		try {
			if(!error && response.statusCode == 200)
			{
				var sourceSecurities = JSON.parse(body);
				console.log(sourceSecurities);
				var sourceSecurity = sourceSecurities.quotes.quote;
				var security = {
					Source: "Tradier",
					Symbol : sourceSecurity.symbol,
					Description : sourceSecurity.description,
					Type : sourceSecurity.type,
					Last : sourceSecurity.last,
					Open : sourceSecurity.open,
					Low : sourceSecurity.low,
					High : sourceSecurity.high,
					Change : sourceSecurity.change,
					ChangePercent : sourceSecurity.change_percentage,
					LastVolume : sourceSecurity.volume,
					Bid : sourceSecurity.bid,
					BidSize : sourceSecurity.bidsize,
					Ask : sourceSecurity.ask,
					AskSize : sourceSecurity.asksize,
					High52Weeks : sourceSecurity.week_52_high,
					Low52Weeks : sourceSecurity.week_52_low
				};
				success(security);
			}
			else
				throw error;
		} catch (error) {
			fail(error);
		}
	});
}

module.exports = TradierAdapter;