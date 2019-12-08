document.getElementById("modal-close").addEventListener("click",modal_toggle);
document.getElementById("review-modal").addEventListener("click",modal_accept);


var posts = [];
var current_post = document.getElementById("posts").firstElementChild;
var size = document.getElemntByID("posts").childElementCount;
posts.push(current_post);

for(var i = 1; i < size; i++){
	posts.push(current_posts.nextElementSobling);
	current_post = current_post,nextElementSibling;
}

function modal_toggle(){
	document.getElementById("review-rating-1").checked = true;
	document.getElementById("reviewer-name-input").value= "";
	document.getElementById("description-input").value = "";
	document.getElementById("review-rating-would").checked=true;

	document.getElementById("review-modal").classList.toggle('hidden');
}

function modal_accept(){
	if(!modal_check_inputs()){
		alert("please fill in all the entries");
		return;
	}
	var last_post = document.getElementById("posts").lastElementChild;
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
}

function modal_check_inputs(){
	if (document.getElementById("reviewer-name-input").value == ""
	|| document.getElementById("description-input").value == ""){
	return false;
	}
	    return true;
}
