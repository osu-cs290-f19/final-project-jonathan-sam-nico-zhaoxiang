 var divs = document.getElementsByClassName('post');	//list of the posts
 var titles = document.getElementsByClassName('post-title');
 var addbutton = document.getElementById('sell-something-button');	//button to sell
 var updatebutton = document.getElementById('filter-update-button');	//button to update
 var modalnode;
 var modalbackdrop;
 updatebutton.addEventListener('click', function(event){
    var check;
	for(var i = 0; i<divs.length; i++){
		check = divs[i].getAttribute('data-condition');
		if(nuevo.checked && (check != 'new')){
			divs[i].remove();
			i--;
			continue;
		}
		else if(excellent.checked && (check!= 'excellent') ){
			divs[i].remove();
			i--;
			continue;
		}
		else if(good.checked && (check!= 'good') ){
			divs[i].remove();
			i--;
			continue;
		}
		else if(fair.checked && (check!= 'fair')){
			divs[i].remove();
			i--;
			continue;
		}
		else if(poor.checked && (check != 'poor')){
			divs[i].remove();
			i--;
			continue;
		}
		check = Number(divs[i].getAttribute('data-price'));
		if((check < min) & minchanged){
			divs[i].remove();
			i--;
			continue;
		}
		else if((check>max)& maxchanged){
			divs[i].remove();
			i--;
			continue;
		}
		check = titles[i].textContent.toLowerCase().includes(txt.toLowerCase());
		if(!check){
			divs[i].remove();
			i--;
			continue;
		}
		check = divs[i].getAttribute('data-city');

		if(check != citys.value && ischanged){
			divs[i].remove();
			i--;
			continue;
		}
		else{}

	}
 });
 addbutton.addEventListener('click', function(event){
	 modalnode = document.getElementById('sell-something-modal');
	 modalnode.classList.remove('hidden');
	 modalbackdrop = document.getElementById('modal-backdrop');
	 modalbackdrop.classList.remove('hidden');
 });

 var text = document.getElementById('filter-text');	//filter by this text
 var minprice = document.getElementById('filter-min-price');
 var maxprice = document.getElementById('filter-max-price');
 var max;
 var min;
 var maxchanged = 0;
 var minchanged = 0;
 var txt = "";
 var nuevo = document.getElementById('filter-condition-new');
 var excellent = document.getElementById('filter-condition-excellent');
 var good = document.getElementById('filter-condition-good');
 var fair = document.getElementById('filter-condition-fair');	//can do fair.checked to return a bool
 var poor = document.getElementById('filter-condition-poor');
 var citys = document.getElementById('filter-city');
 var ischanged =0;
 var close = document.getElementById('modal-close');
 var cancel = document.getElementById('modal-cancel');
 var addpost = document.getElementById('modal-accept');

 var description = document.getElementById('post-text-input');
 var url= document.getElementById('post-photo-input');
 var price= document.getElementById('post-price-input');
 var city = document.getElementById('post-city-input');
 var condition = document.getElementById('post-condition-fieldset');

 function closemodal(){git
	modalnode.classList.add('hidden')
	modalbackdrop.classList.add('hidden');
	url.value = city.value = price.value = description.value = '';
 }
 function parameters(){
	if(city.value=='' || price.value =='' || url.value=='' || description.value==''){
		return false;
	}
 	return true;
 }
 function createpost(){
	var temp;
	var newnode = divs[divs.length-1].cloneNode(true);
	newnode.setAttribute('data-price', price.value);
	newnode.setAttribute('data-city', city.value);
	var condicion = condition.getElementsByTagName('input');
	for(var i = 0; i< condicion.length; i++){
	 console.log(condicion[i].checked);
		if(condicion[i].checked == true){
		newnode.setAttribute('data-condition', condicion[i].value);
		}
	}
	var image = newnode.getElementsByTagName('img');
	image[0].setAttribute('src', url.value);
	image[0].setAttribute('alt', description.value);
	temp = newnode.getElementsByClassName('post-price');
	temp[0].textContent = "$"+ price.value;
	temp = newnode.getElementsByClassName('post-title');
	temp[0].textContent = description.value;
	temp = newnode.getElementsByClassName('post-city');
	temp[0].textContent = "("+city.value+")";
	divs[0].parentNode.appendChild(newnode);
	closemodal();
 }
 addpost.addEventListener('click', function(event){
	if(parameters()){
		createpost();
	}
	else{
		window.alert('All parameters must be filled!');
	}
 })

close.addEventListener('click', function(event){
	closemodal();
})
cancel.addEventListener('click', function(event){
	closemodal();
})

 citys.addEventListener('change', function(event){
	ischanged = 1;
 });
 text.addEventListener('change', function(event){
	txt = event.currentTarget.value;
 });

  minprice.addEventListener('change', function(event){
	 min = Number(event.currentTarget.value);
	 minchanged = true;
 });

  maxprice.addEventListener('change', function(event){
	max = Number(event.currentTarget.value);
	maxchanged = true;
 });
