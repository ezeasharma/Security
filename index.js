$(function(){
	$.get('/adapters')
	.done(function(adapters){
		var adaptersDropdown = $('#adaptersDropdown');
		adaptersDropdown.empty();
		for(var i = 0; i < adapters.length; i++)
		{
			adaptersDropdown.append(new Option(adapters[i].Name, adapters[i].Name, false, false));
		}
	})
	.fail(function(error){
		alert(error);
	});
	
	$('#getSecurityButton').click(function(){
		$('#securityDescriptionLabel').text('Loading.......');
		var securitiesArray = $('#symbolTextBox').val().split(';');
		for(var i = 0; i < securitiesArray.length; i++)
		{
			$.post('/Securities', { IdentifierType : 'Symbol', Identifier : securitiesArray[i], Adapter : $('#adaptersDropdown').val()})
				.done(function(response){
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