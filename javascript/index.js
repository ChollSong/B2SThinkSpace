$(document).ready(function(){

	callPage('home.html');

	$('a').on('click', function(e){  
		e.preventDefault( ); 
		var pageRef = $(this).attr('href');
		callPage(pageRef);
	});

});

function getSubAreaInfo(num){

	console.log('HELLO!')

	$.ajax({
		url: "url:/v/areas?subArea=’" + num + "’" ,
		type: 'GET',
		datatype: 'json',
		success: function(response){
			console.log(response);
		},
		error: function(response){
			console.log('error');
		}
	});

}

function getSubAreaInfoTest(){

	console.log('TESTING ONLY')

	$.ajax({
		url: "url:/v/areas?subArea=1" ,
		type: 'GET',
		datatype: 'json',
		success: function(response){
			console.log(response);
		},
		error: function(response){
			console.log('error');
		}
	});

}

function callPage(pageRefInput){

	$.ajax({
		url: pageRefInput,
		type: 'GET',
		datatype: 'text/html',
		success: function(response){
			$('.content').html(response);
		},
		error: function(response){
		}
	});

}

function changeImg(id, imgURL){
	$("#f1").hide();
	$("#f2").hide();
	$("#t1").hide();
	$(id).show();
	$('#map_img').attr('src', imgURL);
}