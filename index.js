$(function(){
	$('#getSecurityButton').click(function(){
		$.get('/Security')
		.done(function(response){
			$('#securityDescriptionLabel').text(response);
		})
		.fail(function(xhr){
			console.log(xhr);
    		alert(xhr.status + ' ' + xhr.responseText);
		})
	});
});