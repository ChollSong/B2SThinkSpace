var mHead = '';
var mText = '';
var mSeat = '';

$(document).ready(function(){

	callPage('home.html');

	$('a').on('click', function(e){  
		e.preventDefault( ); 
		var pageRef = $(this).attr('href');
		callPage(pageRef);
	});

});

function getInfo(num){

	var url = "url:/v/areas?subArea=" + num;

	$.ajax({
		url: url,
		type: 'GET',
		datatype: 'json',
		async: false,
		success: function(response){
			$('#m_name').text(response.area_name);
			$('#m_info').text(response.infomation);
			$('#m_snum').text(response.seat_available);
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


// The functions below are the API in which may or may not be use in the future

//Get floor info.
function getFloor(num){

	$.ajax({
		url: "url:/v/areas",
		type: 'GET',
		datatype: 'json',
		success: function(response){
			
		},
		error: function(response){
			
		}
	});
	
}

//Get list of subarea
function getArea(num){

	var url = "url:/v/areas?subArea=" + num;

	$.ajax({
		url: url,
		type: 'GET',
		datatype: 'json',
		success: function(response){
			
		},
		error: function(response){
			
		}
	});

}

//User log-in
function userLogIn(){
	
	$.ajax({
		url: '/v/user',
		type: 'POST',
		datatype: 'json',
		data: JSON.stringify({
			"username": $('#username').val(),
			"password": $('#password').val()
		}),
		success: function(response){
			
		},
		error: function(response){
			
		}
	});

}