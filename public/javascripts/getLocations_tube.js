// Author: Jayant Arora
// Functions to retrieve all cables from database.

var cables; // Global variable to store all the cables retrieved from the database.

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

// Find the right cable depending on cableID selected by user. addInputForStrands function will be invoked upon selection.
function updateTubeDataOnPage(cableID){
	for(var i=0; i<cables.length; i++){
		if(cables[i].cable_id == cableID){
			var num_of_tubes = cables[i].num_of_tubes;
			document.getElementById("tubes_info").innerHTML = "<fieldset id='total_tubes'>Total tubes: " + num_of_tubes + "</fieldset>";
			addInputForStrands(num_of_tubes);
			getStrandData(cableID); // This function will get the strand info from server
		}
	}
}

// Add input boxes for corresponding to num_of_strands parameter from cables.
function addInputForStrands(numOfTubes){
	for(var i=1; i<=numOfTubes; i++){
		document.getElementById("total_tubes").innerHTML += "<br><label>Tube "+ i +" has: <input class='tube' type='number' min='0' required> strands. </label>";
	}
}

//TODO: Get present number of strands for the current tube. 
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
		}
		//new update button that will just update the strand infomation.
		document.getElementById("strand_update_button").style.display = "inline";
		document.getElementById("save_strand_info").style.display = "none";
	}
	else{
		for(var i=0; i<tubesOnPage.length; i++){
			tubesOnPage[i].value = 0;
		}
		document.getElementById("strand_update_button").style.display = "none";
		document.getElementById("save_strand_info").style.display = "inline";

	}
}
