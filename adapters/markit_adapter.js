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
				var security = JSON.parse(body);
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