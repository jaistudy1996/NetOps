// Author: Jayant Arora
// Function to retrieve all cables from database.

var cables;

window.onload = function getLoc(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/tube/getCables', true);
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			cables = xhr.response;
			updateCablesOnPage(cables);
		}
		if(this.status != 200){
			console.log(xhr.response, this.status);
		}
	}
	xhr.send();
}

function updateCablesOnPage(cables){
		for (var i = 0; i<cables.length; i++){
			document.getElementById("cable").innerHTML += "<option value=" + cables[i].cable_id + ">" + cables[i].from_building + " -- " + cables[i].from_closet + " ==> " + cables[i].to_dest_building + " -- " + cables[i].to_closet + "</option>";
		}
		return
}

function updateTubeDataOnPage(cableID){
	for(var i=0; i<cables.length; i++){
		if(cables[i].cable_id == cableID){
			var num_of_tubes = cables[i].num_of_tubes;
			document.getElementById("tubes_info").innerHTML = "<fieldset id='total_tubes'>Total tubes: " + num_of_tubes + "</fieldset>";
			addInputForStrands(num_of_tubes);
		}
	}
}

function addInputForStrands(numOfTubes){
	for(var i=1; i<=numOfTubes; i++){
		document.getElementById("total_tubes").innerHTML += "<br><label>Tube "+ i +" has: <input type='number' min='0' required> strands. </label>";
	}
}
