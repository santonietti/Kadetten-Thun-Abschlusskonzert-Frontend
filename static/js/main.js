
/*$('h2').click(function(){
	alert('hi');
});*/

$( "#ticketform" ).submit(function( event ) {
	//prevent submit event
	event.preventDefault();
	//gather form data
	var formData = JSON.stringify($("#ticketform").serializeArray());
	console.log(formData);
	// reset form
	$('input').val('');
	$('input[type="number"]').val('0');
	$('input[type="checkbox"]').prop('checked', false);
	//load feedback
	$('.content').load('/_static/formfeedback.html');
	$('body').css('background' , '#F2F2F2');
});

/*

$.ajax({
  type: "POST",
  url: "serverUrl",
  data: formData,
  success: function(){},
  dataType: "json",
  contentType : "application/json"
});*/