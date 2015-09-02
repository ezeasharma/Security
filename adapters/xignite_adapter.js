var request = require('request');
function XIgniteAdapter()
{
	this.template = 'http://globalquotes.xignite.com/v3/xGlobalQuotes.json/GetGlobalDelayedQuote?_token=BE130EE38FD84F0B93917BBF0B6F437F&Identifier=#{identifier}&IdentifierType=#{identifierType}';
	
	this.getUrl = function(identifier, ticker)
	{
		var template = this.template.replace('#{identifier}', ticker);
		return template.replace('#{identifierType}', identifier);
	}
}

XIgniteAdapter.prototype.getPrice = function(identifierType, identifier, success, fail)
{
	var url = this.getUrl(identifierType, identifier);
	var options = {
		url : url,
  		method: 'GET'
    }
	
	request.get(options, function(error, response, body){
		try {
			console.log('Response recieved - ' + response.statusCode + ' - ' + error) ;
			if(!error && response.statusCode == 200)
			{
				var sourceSecurity = JSON.parse(body);
				if(sourceSecurity.Outcome != "Success")
					throw body;
				var security = {
					Source: "XIgnite",
					Symbol : sourceSecurity.Security.Symbol,
					Description : sourceSecurity.Security.Name,
					Type : "Not Provided",
					Last : sourceSecurity.Last,
					Open : sourceSecurity.Open,
					Low : sourceSecurity.Low,
					High : sourceSecurity.High,
					Change : sourceSecurity.ChangeFromPreviousClose,
					ChangePercent : sourceSecurity.PercentChangeFromPreviousClose,
					LastVolume : sourceSecurity.Volume,
					Bid : sourceSecurity.Bid,
					BidSize : sourceSecurity.bidSize,
					Ask : sourceSecurity.Ask,
					AskSize : sourceSecurity.AskSize,
					High52Weeks : sourceSecurity.High52Weeks,
					Low52Weeks : sourceSecurity.Low52Weeks
				};
				success(security);
			}
			else
				{
					console.log('Errro - ' + error);
					throw error;
				}
		} catch (error) {
			fail(error);
		}
	});
}

module.exports = XIgniteAdapter;