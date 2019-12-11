var divs = document.getElementsByTagName('div');
var as = document.getElementsByTagName('a');
var title = document.getElementsByClassName('site-title');
var colormode = document.getElementById('color-mode');
var body = document.getElementsByTagName('body');
var openbutton = document.getElementById("modal-close");
var backdrop = document.getElementById('modal-backdrop');
var modal = document.getElementById('review-modal');
var cancel = document.getElementById('modal-cancel');
var review = document.getElementById('add-review-button');
var modal_body = document.getElementsByClassName('modal-body');


if(document.title != "Asteroids"){
	for(var i =0; i<divs.length; i++){	
		if(divs[i].classList.contains('upper-portion')||
				divs[i].classList.contains('lower-portion')||
				divs[i].classList.contains('game-details-container')||
				divs[i].classList.contains('modal-header') ||
				divs[i].classList.contains('modal-body')||divs[i].classList.contains('reviews')){

			divs[i].classList.add('light2');
		}
		else{divs[i].classList.add('light');}
	}

if(document.title!="Asteroids"){
	colormode.addEventListener('change', function(event){
		console.log(event.target.value);
		for(var i =0; i<divs.length; i++){
			divs[i].classList.remove("osu");
			divs[i].classList.remove('dark');
			divs[i].classList.remove('light');	
			divs[i].classList.remove("osu2");
			divs[i].classList.remove('dark2');
			divs[i].classList.remove('light2');
			if(event.target.value =="Light Mode"){
				if(divs[i].classList.contains('upper-portion')||
				divs[i].classList.contains('lower-portion')||
				divs[i].classList.contains('game-details-container')||
				divs[i].classList.contains('modal-header') ||
				divs[i].classList.contains('modal-body')||
				divs[i].classList.contains('review')){
				divs[i].classList.add('light2');
				}
				else{divs[i].classList.add('light');
				}
				if(i==0){
				body[0].className ="lightmode"}
			}
			else if(event.target.value =="Dark Mode"){
				if(divs[i].classList.contains('upper-portion')||
				divs[i].classList.contains('lower-portion')||
				divs[i].classList.contains('game-details-container')||
				divs[i].classList.contains('modal-header') ||
				divs[i].classList.contains('modal-body')||
				divs[i].classList.contains('review')){
				divs[i].classList.add('dark2');
				}
				else{divs[i].classList.add('dark');
				}
				if(i==0){
				body[0].className ="darkmode"}
			}
			else{
				if(divs[i].classList.contains('upper-portion')||
				divs[i].classList.contains('lower-portion')||
				divs[i].classList.contains('game-details-container')||
				divs[i].classList.contains('modal-header') ||
				divs[i].classList.contains('modal-body')||
				divs[i].classList.contains('review')){
				divs[i].classList.add('osu2');
				}
				else{divs[i].classList.add('osu');
				}
				if(i==0){
				body[0].className ="osumode"}
			}
		}
	});
}
//	***********************		REVIEWS PAGE	***********************

if(document.title =="Reviews"){
	document.getElementById("modal-close").addEventListener("click",modal_toggle);
	document.getElementById("modal-cancel").addEventListener("click",modal_toggle);
	document.getElementById("add-review-button").addEventListener("click",modal_accept);
	
	var reviews = [];
	var current_post = document.getElementById("reviews").firstElementChild;
	var size = document.getElementById("reviews").childElementCount;
	reviews.push(current_post);

	console.log("reviews==",reviews)
	console.log("current_post==",document.getElementById("reviews").firstElementChild);
	console.log("size==",document.getElementById("reviews").childElementCount);

	for(var i = 0; i < size; i++){
		reviews.push(current_post.nextElementSibling);
		current_post = current_post.nextElementSibling;
	}
	function modal_toggle(){
		document.getElementById("review-rating-1").checked = true;
		document.getElementById("reviewer-name-input").value= "";
		document.getElementById("description-input").value = "";
		document.getElementById("review-rating-would").checked=true;

		document.getElementById("review-modal").classList.toggle('hidden');
		document.getElementById("modal-backdrop").classList.toggle('hidden');
	}
	function modal_accept(){
	
		if(!modal_check_inputs()){
			alert("please fill in all the entries");
			return;
		}
	
		var last_post = document.getElementById("reviews").lastElementChild;
		var clone = last_post.cloneNode(true);
		
		var rate;
			if	(document.getElementById("review-rating-1").checked){rate = "1";}
			else if (document.getElementById("review-rating-2").checked){rate = "2";}
			else if (document.getElementById("review-rating-3").checked){rate = "3";}
			else if (document.getElementById("review-rating-4").checked){rate = "4";}
			else if (document.getElementById("review-rating-5").checked){rate = "5";}
	
		var would;
			if	(document.getElementById("review-rating-would").checked){would = "I would recommend this game";}
			else if (document.getElementById("review-rating-would-not").checked){would = "I would not recommend this game";}

		//change the data values
		clone.setAttribute("data-rating",rate);
		clone.setAttribute("data-recommend",would);
		
		//modify the HTML in the new post
		clone.lastElementChild.lastElementChild.lastElementChild.removeAttribute("alt");
		clone.getElementsByClassName("review-rating")[0].innerHTML = "Rating: "  + rate;
		clone.getElementsByClassName("review-recommend")[0].innerHTML = would;
		clone.firstElementChild.lastElementChild.firstElementChild.textContent = document.getElementById("reviewer-name-input").value;
		clone.firstElementChild.lastElementChild.lastElementChild.textContent = document.getElementById("description-input").value;
		
		reviews.push(clone);
		document.getElementById("reviews").appendChild(clone);
		modal_toggle();

		var reviews_made = document.getElementsByClassName('review-contents');
		var name_to_send = reviews_made[reviews_made.length-1].getElementsByClassName('reviewer-name')[0].textContent;
		var description_to_send = reviews_made[reviews_made.length-1].getElementsByClassName('review-description')[0].textContent;
		var recommend_to_send = reviews_made[reviews_made.length-1].getElementsByClassName('review-recommend')[0].textContent;
		console.log(name_to_send);
		console.log(description_to_send);
		console.log(recommend_to_send);
		console.log(rate);
		var postRequest = new XMLHttpRequest();
		var requestURL = '/reviews/add';
		postRequest.open('POST', requestURL);
		var requestBody = JSON.stringify({
			name: name_to_send,
			recommend: recommend_to_send,
			rating: rate,
			review: description_to_send
		});
		console.log("== requestBody:", requestBody);
		postRequest.setRequestHeader('Content-Type', 'application/json');
		postRequest.addEventListener('load', function (event) {
		});
		postRequest.send(requestBody);
	}
	function modal_check_inputs(){
		if (document.getElementById("reviewer-name-input").value == ""
		|| document.getElementById("description-input").value == ""){
		return false;
		}
		return true;
	}
}

var reviews_made = document.getElementsByClassName('review-contents');
		
var name_to_send = reviews_made[reviews_made.length-1].getElementsByClassName('reviewer-name')[0].textContent;
var description_to_send = reviews_made[reviews_made.length-1].getElementsByClassName('review-description')[0].textContent;
var recommend_to_send = reviews_made[reviews_made.length-1].getElementsByClassName('review-recommend')[0].textContent;
var postRequest = new XMLHttpRequest();
var requestURL = 'Reviews/add';
postRequest.open('POST', requestURL);


var requestBody = JSON.stringify({
	name: name_to_send,
	recommend: recommend_to_send,
	rating: rate,
	review: description_to_send
});

console.log("== requestBody:", requestBody);
postRequest.setRequestHeader('Content-Type', 'application/json');
postRequest.addEventListener('load', function (event) {
	var responseBody = event.target.response;
	alert("Error saving photo on server side: " + responseBody);
	var photoCardTemplate = Handlebars.templates.photoCard;
	var newreviewHTML = photoCardTemplate({
		name: name_to_send,
		recommend: recommend_to_send,
		rating: rate,
		review: description_to_send
	});
});

postRequest.send(requestBody);

hideModal();
 

//	***********************		HIGH SCORES		***********************	

//send the player's score to the server
if(document.title =="Asteroids"){

	//event listener on the accept button
	document.getElementById("input-username-button").addEventListener("click", sendScore);

	//do this when accept button is clicked
	function sendScore(){

		//get the inputted name and the score
		var score_name = document.getElementById('name-input').textContent;
		var score_number = document.getElementById('score-count').textContent;
		
		//if there is no name inputted, do not proceed and tell the user
		if(!score_name){
			alert("Please input a name.");
		}
		//otherwise, do it
		else{
		
			//create the message object
			var score_message = new XMLHttpRequest();
			var requestURL = '/game/add';
			score_message.open('POST', requestURL);
			
			//create a JSON object to send with the request
			var requestBody = JSON.stringify({
			  name: score_name,
			  highscore: score_number
			});

			score_message.setRequestHeader('Content-Type', 'application/json');

			score_message.addEventListener('load', function (event) {
			  if (event.target.status !== 200) {
				var responseBody = event.target.response;
				alert("Error sending high score: " + responseBody);
			  	});
				
			score_message.send(requestBody);
		}
	}
}
