//console.log("modal-close ",document.getElementById('modal-close'));
//var addbutton = document.getElementById('modal-close');
document.getElementById("modal-close").addEventListener("click",modal_toggle);
document.getElementById("modal-cancel").addEventListener("click",modal_toggle);
document.getElementById("add-review-button").addEventListener("click",modal_accept);
//document.getElementById("modal-close").addEventListener("click",modal_toggle);
//document.getElementById("review-modal").addEventListener("click",modal_toggle);


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
//	document.getElementById("modal-close").classList.toggle('hidden');
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
	//reviews.push(current_post);
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



