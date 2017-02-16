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
			document.getElementById("to_loc").innerHTML += "<option value="+locations[i].location_id+">"+
			locations[i].building+"  -->  "+locations[i].closet+"</option>";
		}
		return
}

var cable_types_from_server = []

function getCableType(){
	console.log("cable_type");
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/cable/getCableType', true)
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			updateCableTypeOnPage(xhr.response);
			cable_types_from_server.push(xhr.response);
		}
		if(this.status != 200){
			console.log(xhr.response);
		}
	}
	xhr.send();
}

function updateCableTypeOnPage(name){
	for(var i = 0; i<cable_types_from_server.length; i++){
		console.log(cable_types_from_server[i]);
		// document.getElementsByName(name).innerHTML += "<option value="+types[i].type_id+">"+types[i].name+
		// "</option>";
	}
}

function updateFiberTypeNumbers(){
	var types = document.getElementById("diff_type_of_fiber").value;
	if(types > 1){
		for(var i = 2; i<= types; i++){
			document.getElementById("types_of_cable").innerHTML += "<label>Select cable "+i+ " type: <select id='cable_type' name='cable_type_'" + i + "required> <option value='' disabled selected>Select cable type</option> </select> </label>"
		}
	}
	updateCableTypeOnPage("cable_type_1");
}
