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
if(document.title =="Reviews");