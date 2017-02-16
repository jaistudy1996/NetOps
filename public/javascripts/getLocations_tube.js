// Author: Jayant Arora
// Function to retrieve all locations from database.

window.onload = function getLoc(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/tube/getCables', true);
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			updateCablesOnPage(xhr.response);
			//getCableType();
		}
		if(this.status != 200){
			console.log(xhr.response, this.status);
		}
	}
	xhr.send();
}

function updateCablesOnPage(cables){
		for (var i = 0; i<cables.length; i++){
			console.log(cables[i]);
			document.getElementById("cable").innerHTML += "<option value=" + cables[i].cable_id + ">" + cables[i].from_building + " -- " + cables[i].from_closet + " ==> " + cables[i].to_dest_building + " -- " + cables[i].to_closet + "</option>";
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
