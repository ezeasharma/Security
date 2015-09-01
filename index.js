$(function(){
	var securityFields = ["Outcome","Last", "LastSize", "Open", "High", "Low", "Close", "Volume", "Message", "Delay", "Date", "Time", "UTCOffset", ];
	
	$.get('/IdentifierTypes')
	.done(function(response){
		var identifiersDropdown = $('#securityIdentifiersDropdown');
		identifiersDropdown.empty();
		for(var i = 0; i < response.length; i++)
		{
			identifiersDropdown.append(new Option(response[i].Name, response[i].Name, false, false));
		}
	})
	.fail(function(error){
		console.log(error);
    	alert('Error getting security identifiers. Status = ' + error.status + ' ' + error.responseText);
	})
	$('#getSecurityButton').click(function(){
		$('#securityDescriptionLabel').text('Loading.......');
		var securitiesArray = $('#symbolTextBox').val().split(';');
		for(var i = 0; i < securitiesArray.length; i++)
		{
			$.post('/Securities', { IdentifierType : $('#securityIdentifiersDropdown').val(), Identifier : securitiesArray[i]})
				.done(function(response){
				//$('#securityDescriptionLabel').text("");
					
				// $.each(response, function(key, value) {
   				// 	$('#displayDiv').append('<p>' + key + '-->' + value + '</p>')
				// });
				$('#securityDescriptionLabel').text(JSON.stringify(response));
			})
			.fail(function(error){
				console.log(error);
    			alert('Error getting security Definition. Status = ' + error.status + ' ' + error.responseText);
				$('#securityDescriptionLabel').text("");
			})
		}
	});
});