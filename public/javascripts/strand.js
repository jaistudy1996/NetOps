// Author: Jayant Arora
// Function to retrieve all tubes with respect to cables from db.

var cables; // Global variable to store cables from db.

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
			document.getElementById("cable_select").innerHTML += "<option value=" + cables[i].cable_id + ">" + cables[i].from_building + " -- " + cables[i].from_closet + " ==> " + cables[i].to_dest_building + " -- " + cables[i].to_closet + "</option>";
		}
		return
}

function updateTubeDataOnPage(cableID){
	for(var i=0; i<cables.length; i++){
		if(cables[i].cable_id == cableID){
			var num_of_tubes = cables[i].num_of_tubes;
			console.log(document.getElementById("tubes_info").innerHTML);
			document.getElementById("tubes_info").innerHTML = "<fieldset id='total_tubes'>Total tubes: " + num_of_tubes + "</fieldset>";
			addInputForStrands(num_of_tubes);
			getStrandData(cableID); // This function will get the strand info from server
		}
	}
}

function addInputForStrands(numOfTubes){
	for(var i=1; i<=numOfTubes; i++){
		document.getElementById("total_tubes").innerHTML += "<br><fieldset><label>Tube "+ i +" has: <input name='tubes_data' class='tube' type='number' required disabled> strands. </label></fieldset>";
	}
}

function getStrandData(cableID){
	var xhr = new XMLHttpRequest();
	var urlForXHR = '/tube/getStrandData/'+cableID;
	xhr.open('GET', urlForXHR, true);
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			updateStrandDataOnPage(xhr.response, cableID);
		}
		if(this.status != 200){
			console.log(xhr.response, this.status);
		}
	}
	xhr.send();
}

function updateStrandDataOnPage(strands, cableID){
	console.log(strands);
	var tubesOnPage = document.getElementsByClassName("tube");
	console.log(tubesOnPage);
	if(strands.length != 0){
		for(var i=0; i<tubesOnPage.length; i++){
			tubesOnPage[i].name = strands[i].tube_id;
			tubesOnPage[i].value = strands[i].num_of_strands;
			console.log(tubesOnPage[i].parentNode.parentNode);
			var table = document.createElement('table');
			var tableBody = document.createElement('tbody');
			var row = document.createElement('tr');
			var tubeIDHead = document.createElement('th');
			var strandIDHead = document.createElement('th');
			var strandColorHead = document.createElement('th');
			var textTube = document.createTextNode("TubeId");
			// var textStrand = document.createTextNode("StrandID");
			var textColor = document.createTextNode("Strand Color");
			tubeIDHead.appendChild(textTube);
			// strandIDHead.appendChild(textStrand);
			strandColorHead.appendChild(textColor);
			row.appendChild(tubeIDHead);
			// row.appendChild(strandIDHead);
			row.appendChild(strandColorHead);
			tableBody.appendChild(row);
			table.appendChild(tableBody);
			tubesOnPage[i].parentNode.parentNode.appendChild(table);
		}
	}
	else{
		for(var i=0; i<tubesOnPage.length; i++){
			tubesOnPage[i].value = 0;
		}
	}
}
