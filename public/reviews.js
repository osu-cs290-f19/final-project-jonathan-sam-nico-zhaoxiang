var openbutton = document.getElementById("modal-close");
var backdrop = document.getElementById('modal-backdrop');
var modal = document.getElementById('review-modal');
var cancel = document.getElementById('modal-cancel');
var review = document.getElementById('add-review-button');
var body = document.getElementsByTagName('body');
var modal_body = document.getElementsByClassName('modal-body');
//console.log(body[0].classList[0]);
openbutton.addEventListener('click', function(event){
	modal_body[0].classList.add('neutral-color');
	modal.classList.remove('hidden');
	backdrop.classList.remove('hidden');

})
cancel.addEventListener('click', function(event){
	modal.classList.add('hidden');
	backdrop.classList.add('hidden');

})
review.addEventListener('click', function(event){
	modal.classList.add('hidden');
	backdrop.classList.add('hidden');

});