$(document).ready(function(){

	callPage('home.html');

	$('a').on('click', function(e){  
		e.preventDefault( ); 
		var pageRef = $(this).attr('href');
		callPage(pageRef);
	});

});

//Making this a single-page app
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

//Map page main function
function changeImg(id, imgURL){
	$("#f1").hide();
	$("#f2").hide();
	$("#t1").hide();
	$("#t2").hide();
	$(id).show();
	$('#map_img').attr('src', imgURL);
}

//API for getting information of subarea
function getInfo(num){

	var url = "/v/areas?subArea=" + num;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(response){
			$('#m_name').text(response.area_name);
			$('#m_info').text(response.information);
			$('#m_snum').text(response.seat_available);
		},
		error: function(response){
			$('#m_name').text('Error');
			$('#m_info').text('Cannot connect to the server');
			$('#m_snum').text('??');
		}
	});

}

function getInfoAndProductList(num){

	var url = "/v/areas?subArea=" + num;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(response){
			console.log(response.items.length);
            $('#listOfProduct').empty();
			for(var i = 0; i < response.items.length; i++){
				createProductElement('img/test.jpg', response.items[i].name, 'LOREM IPSUM');
			}
		},
		error: function(response){
			$("#ErrorResponseProduct").show();
			$("#ErrorResponseProduct").delay(3000).fadeOut('slow');
		}
	});

}

//API for User log-in
function userLogIn(){
	
	$.ajax({
		url: '/v/user',
		type: 'POST',
		datatype: 'json',
		data: {
			"username": $('#usr').val(),
			"password": $('#pwd').val()
		},
		success: function(response){
			if(response.status == '0'){
				$('#loginUsr').text($('#usr').val());
				$("#noUsr").hide();
				$("#loggedIn").show();
				$("#loggedInAlert").show();
				$('#loggedInAlert').delay(3000).fadeOut('slow');
				callPage('home.html');
			}else{
				$("#ErrorLogInAlert").show();
				$("#ErrorLogInAlert").delay(3000).fadeOut('slow');
			}
		},
		error: function(response){
			$("#ErrorResponseAlert").show();
			$("#ErrorResponseAlert").delay(3000).fadeOut('slow');
		}
	});

}

//User log-in without API for debugging
function userLogInForTest(){
	console.log('logged in');
	$('#loginUsr').text($('#usr').val());
	$("#noUsr").hide();
	$("#loggedIn").show();
	$("#loggedInAlert").show();
	$('#loggedInAlert').delay(3000).fadeOut('slow');
	callPage('home.html');
}

function userLogOut(){
	console.log('logged out');
	$("#loggedIn").hide();
	$("#noUsr").show();
}

function createProductElement(img, productName, productInfo){
	 $('<div class="col-sm-6 col-md-4"><div class="thumbnail"><img src="' + img + '"><div class="caption"><h3>' + productName + '</h3><p>' + productInfo + '</p></div></div></div>').appendTo("#listOfProduct");
}