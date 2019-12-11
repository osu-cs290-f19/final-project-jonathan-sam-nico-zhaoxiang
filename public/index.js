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


for(var i =0; i<divs.length; i++){	
	if(divs[i].classList.contains('upper-portion')||
			divs[i].classList.contains('lower-portion')||
			divs[i].classList.contains('game-details-container')||
			divs[i].classList.contains('modal-header') ||
			divs[i].classList.contains('modal-body')||
			divs[i].classList.contains('reviews')||
			divs[i].classList.contains('container-404')){

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
			divs[i].classList.contains('reviews')||
			divs[i].classList.contains('container-404')){

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
			divs[i].classList.contains('reviews')||
			divs[i].classList.contains('container-404')){
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
			divs[i].classList.contains('reviews')||
			divs[i].classList.contains('container-404')){
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


if(document.title =="Reviews"){
	document.getElementById("modal-close").addEventListener("click",modal_toggle);
	document.getElementById("modal-cancel").addEventListener("click",modal_toggle);
	document.getElementById("add-review-button").addEventListener("click",modal_accept);
	var reviews = [];
	console.log("reviews==",reviews)
	var current_post = document.getElementById("reviews").firstElementChild;
	console.log("current_post==",document.getElementById("reviews").firstElementChild);
	var size = document.getElementById("reviews").childElementCount;
	console.log("size==",document.getElementById("reviews").childElementCount);
	reviews.push(current_post);
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
		var rate = "";
			if(document.getElementById("review-rating-1").checked){
				rate = "1";
			}
			else if(document.getElementById("review-rating-2").checked){
				rate = "2";
			}
			else if(document.getElementById("review-rating-3").checked){
				rate = "3";
			}
			else if(document.getElementById("review-rating-4").checked){
				rate = "4";
			}
			else if(document.getElementById("review-rating-5").checked){
				rate = "5";
			}
		var would = "";
			if(document.getElementById("review-rating-would").checked){
				would = "I would reccomend this game";
			}
			else if (document.getElementById("review-rating-would-not").checked){
				would = "i would not reccomend this game";
			}
		clone.setAttribute("data-rating",rate);
		clone.setAttribute("data-recommend",would);
		console.log("this is rate==",rate);
		console.log("this is recommend==",would);
		clone.firstElementChild.lastElementChild.firstElementChild.textContent = document.getElementById("reviewer-name-input").value;
		console.log("this is name ==",document.getElementById("reviewer-name-input").value);
		clone.firstElementChild.lastElementChild.firstElementChild.textContent = document.getElementById("description-input").value;
		console.log("this is descrip",document.getElementById("description-input").value);
		clone.firstElementChild.firstElementChild.firstElementChild.removeAttribute("alt");
		reviews.push(clone);
		document.getElementById("reviews").appendChild(clone);
		modal_toggle();
	}
	function modal_check_inputs(){
		if (document.getElementById("reviewer-name-input").value == ""
		|| document.getElementById("description-input").value == ""){
		return false;
		}
		return true;
	}
}



