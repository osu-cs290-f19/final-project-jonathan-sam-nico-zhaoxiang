var divs = document.getElementsByTagName('div');
var as = document.getElementsByTagName('a');
var title = document.getElementsByClassName('site-title');
var colormode = document.getElementById('color-mode');
var body = document.getElementsByTagName('body');
for(var i =0; i<divs.length; i++){	
	if(divs[i].classList.contains('upper-portion')||divs[i].classList.contains('lower-portion')){
		divs[i].classList.add('light2');
	}
	else{divs[i].classList.add('light');}
}
title[0].classList.add('light');
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
			if(divs[i].classList.contains('upper-portion')||divs[i].classList.contains('lower-portion')){
				divs[i].classList.add('light2');
			}
			else{divs[i].classList.add('light');
			}
			if(i==0){
			title[0].className = "light site-title";
			body[0].className ="lightmode"}
		}
		else if(event.target.value =="Dark Mode"){
			if(divs[i].classList.contains('upper-portion')||divs[i].classList.contains('lower-portion')){
				divs[i].classList.add('dark2');
			}
			else{divs[i].classList.add('dark');
			}
			if(i==0){
			title[0].className = "dark site-title";
			body[0].className ="darkmode"}
		}
		else{
			if(divs[i].classList.contains('upper-portion')||divs[i].classList.contains('lower-portion')){
				divs[i].classList.add('osu2');
			}
			else{divs[i].classList.add('osu');
			}
			if(i==0){
			title[0].className = "osu site-title";
			body[0].className ="osumode"}
		}
	}
 });
