// Author: Jayant Arora
// Function to retrieve all locations from database.

window.onload = function getLoc(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/cable/getLocations', true);
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			updateLocOnPage(xhr.response);
			getCableType();
		}
		if(this.status != 200){
			console.log(xhr.response, this.status);
		}
	}
	xhr.send();
}

function updateLocOnPage(locations){
		console.log(typeof(locations));
		for (var i = 0; i<locations.length; i++){
			document.getElementById("from_loc").innerHTML += "<option value="+locations[i].location_id+">"+
			locations[i].building+"  -->  "+locations[i].closet+"</option>";
			// document.getElementById("to_loc").innerHTML += "<option value="+locations[i].location_id+">"+
			// locations[i].building+"  -->  "+locations[i].closet+"</option>";
		}
		return
}

function getCableType(){
	console.log("cable_type");
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/cable/getCableType', true)
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			updateCableTypeOnPage(xhr.response);
		}
		if(this.status != 200){
			console.log(xhr.response);
		}
	}
	xhr.send();
}

function updateCableTypeOnPage(types){
	for(var i = 0; i<types.length; i++){
		document.getElementById("cable_type").innerHTML += "<option value="+types[i].type_id+">"+types[i].name+
		"</option>";
	}
}
