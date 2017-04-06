
window.onload = function getLoc(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/cable/getLocations', true);
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			updateLocOnPage(xhr.response);
		}
		if(this.status != 200){
			console.log(xhr.response, this.status);
		}
	}
	xhr.send();
}

function updateLocOnPage(locations){
		//console.log(typeof(locations));
		for (var i = 0; i<locations.length; i++){
			document.getElementById("from_loc").innerHTML += "<option value="+locations[i].location_id+">"+
			locations[i].building+"  -->  "+locations[i].closet+"</option>";
			document.getElementById("to_loc").innerHTML += "<option value="+locations[i].location_id+">"+
			locations[i].building+"  -->  "+locations[i].closet+"</option>";
		}
		return
}

function onSubmitForm(){
	console.log("form submitted");
	var xhr = new XMLHttpRequest();
	var from_loc = document.getElementById('from_loc').options[document.getElementById('from_loc').selectedIndex].value;
	var param = 'from_loc='+from_loc;
	xhr.open('POST', '/patch/searchParams', true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			console.log(xhr.response);
		}
		if(this.status != 200){
			console.log(xhr.response, this.status);
		}
	}
	xhr.send(param);
}
