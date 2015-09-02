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
			if(!error && response.statusCode == 200)
			{
				var security = JSON.parse(body);
				if(security.Outcome != "Success")
					throw body;
				success(security);
			}
			else
				throw error;
		} catch (error) {
			fail(error);
		}
	});
}

module.exports = XIgniteAdapter;