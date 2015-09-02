// A simple templating method for replacing placeholders enclosed in curly braces.
	if (!String.prototype.supplant) {
		String.prototype.supplant = function (o) {
			return this.replace(/{([^{}]*)}/g,
				function (a, b) {
					var r = o[b];
					return typeof r === 'string' || typeof r === 'number' ? r : a;
				}
			);
		};
	}
	
$(function(){
	var securityFields = ["Symbol", "Source", "Description", "Type", "Last", "Open", "Low", "High", "Change", 
		"ChangePercent", "LastVolume", "Bid", "BidSize", "Ask", "AskSize", "High52Weeks", "Low52Weeks"];
 	var adapters = undefined;
	function getTableTemplate()
	{
		var template = '<table class="pure-table" id="priceTable"><thead><tr>'
		for(var i = 0; i < securityFields.length; i++)
		{
			template += '<th>' + securityFields[i] + '</th>';
		}
		template += '</tr></thead></table>';
		return template;
	}	
	
	function getRowTemplate()
	{
		var template = '<tr data-Id={Source}>';
		for(var i = 0; i < securityFields.length; i++)
		{
			template += '<td>{' + securityFields[i] + '}</td>';
		}
		template += '</tr>';
		return template;
	}
	
	
	$.get('/adapters')
	.done(function(result){
		adapters = result;
		var adaptersDropdown = $('#adaptersDropdown');
		adaptersDropdown.empty();
		for(var i = 0; i < adapters.length; i++)
		{
			adaptersDropdown.append(new Option(adapters[i].Name, adapters[i].Name, false, false));
		}
		adaptersDropdown.attr('size', adapters.length);
	})
	.fail(function(error){
		alert(error);
	});
	
	$('#getSecurityButton').click(function(){
		var displayDiv = $('#displayDiv');
		displayDiv.empty();
		displayDiv.html(getTableTemplate());
		
		
		for(var i = 0; i < adapters.length; i++)
		{
			var ticker = $('#symbolTextBox').val();
			$.post('/Securities', { IdentifierType : 'Symbol', Identifier : ticker, Adapter : adapters[i].Name})
				.done(function(response){
					//$('#securityDescriptionLabel').text(JSON.stringify(response));
					populateTable(response);
			})
			.fail(function(error){
				console.log(error);
    			alert('Error getting security Definition. Status = ' + error.status + ' ' + error.responseText);
				$('#securityDescriptionLabel').text("");
			})
		}
	});
	
	function populateTable(data)
	{		
		var stockTable = $('#priceTable');
		var stockTableRowTemplate = getRowTemplate();
		var rowData = stockTableRowTemplate.supplant(data);
		stockTable.append(rowData);
	}
});