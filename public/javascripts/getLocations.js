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
		//console.log(typeof(locations));
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
	//console.log("cable_type");
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/cable/getCableType', true)
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//updateCableTypeOnPage(xhr.response);
			cable_types_from_server.push(xhr.response);
		}
		if(this.status != 200){
			console.log(xhr.response);
		}
	}
	xhr.send();
}

function updateCableTypeOnPage(name){
	for(var i = 0; i<cable_types_from_server[0].length; i++){
		document.getElementsByName(name)[0].innerHTML += "<option value="+cable_types_from_server[0][i].type_id+">"+cable_types_from_server[0][i].name+"</option>";
	}
}


var counterForTypes = 1; // Used to prevent from duplicate copies of select boxes
function updateFiberTypeNumbers(){
	// TODO: add functionality to remove select boxes if a different number is selected.
	var types = document.getElementById("diff_type_of_fiber").value;
	for(var i = counterForTypes; i<= types; i++){
			document.getElementById("types_of_cable").innerHTML += "<label>Select cable "+i+ " type: <select name=cable_type_" + i + " required> <option value='' disabled selected>Select cable type</option> </select> </label>";
			counterForTypes++
			name = "cable_type_"+i;
			updateCableTypeOnPage(name);
	}
}
