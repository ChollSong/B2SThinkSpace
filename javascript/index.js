$(document).ready(function(){

	callPage('home.html');

	$('a').on('click', function(e){  
		e.preventDefault( ); 
		var pageRef = $(this).attr('href');
		callPage(pageRef);
	});

});

function callPage(pageRefInput){

	console.log(pageRefInput);

	$.ajax({
		url: pageRefInput,
		type: 'GET',
		datatype: 'text/html',
		success: function(response){
			console.log('Loaded', response);
			$('.content').html(response);
		},
		error: function(response){
			console.log('Error', response);
		}
	});

}

function changeImg(id, imgURL){
	$("#f1").hide();
	$("#f2").hide();
	$("#t1").hide();
	$("#t2").hide();
	$(id).show();
	$('#map_img').attr('src', imgURL);
}