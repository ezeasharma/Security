var request = require('request');
function MarkitAdapter()
{
	this.template = 'http://dev.markitondemand.com/Api/v2/Quote/json?Symbol=#{identifier}'
	
	this.getUrl = function(identifier)
	{
		return this.template.replace('#{identifier}', identifier);
	}
}

MarkitAdapter.prototype.getPrice = function(identifierType, identifier, success, fail)
{
	var url = this.getUrl(identifier);
	console.log('Tradier adapter called for ' + identifier);
	console.log(url);
	var options = {
		url : url,
  		method: 'POST'
    }
	
	request.get(options, function(error, response, body){
		try {
			if(!error && response.statusCode == 200)
			{
				var sourceSecurity = JSON.parse(body);
				var security = {
					Source: "MarkitOnDemand",
					Symbol : sourceSecurity.Symbol,
					Description : sourceSecurity.Name,
					Type : "Not Provided",
					Last : sourceSecurity.LastPrice,
					Open : sourceSecurity.Open,
					Low : sourceSecurity.Low,
					High : sourceSecurity.High,
					Change : sourceSecurity.Change,
					ChangePercent : sourceSecurity.ChangePercent,
					LastVolume : sourceSecurity.Volume,
					Bid : "Not Provided",
					BidSize : "Not Provided",
					Ask : "Not Privided",
					AskSize : "Not Privided",
					High52Weeks : "Not Privided",
					Low52Weeks : "Not Privided"
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

module.exports = MarkitAdapter;