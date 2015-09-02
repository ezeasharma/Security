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

module.exports = TradierAdapter;