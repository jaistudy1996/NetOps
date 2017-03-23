/**
 * @author Jayant Arora <jaistudy1996@gmail.com>
 * @description This script manages all XHR and DOM manipulation for strand.ejs file.
 */

var cables; // Global variable to store cables from db.
var colors; // Global varibale to store all colors of fiber.

window.onload = function (){
	getStrandColor();
	getLoc();
}

function getLoc(){
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

function getStrandColor(){
	var xhr = new XMLHttpRequest();
	var url = '/strand/strandColor/';
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			// console.log(xhr.response);
			window.colors = xhr.response;
			return;
		}
		else if(this.status != 200){
			console.log(xhr.response);
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
			// console.log(document.getElementById("tubes_info").innerHTML);
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

			var st = strands;	// Define again for scope issues.
			var tu = tubesOnPage; // Define agian for scope issues.

			// Make call to server to get individual strand information

			// Use self invoking function to shwo tables for all tubes
			var strInfo = (function (tubes, strands, i){
				var xhr = new XMLHttpRequest();
				var xhrURL = "/strand/strandInfo/" + strands[i].tube_id;
				xhr.open('GET', xhrURL, true);
				xhr.responseType = 'json';

				xhr.onreadystatechange = function(){
					if(this.readyState == 4 && this.status == 200){
						console.log(st[i].tube_id, xhr.response.length);
						var table = makeTable()
						console.log(colors);  // ===== remove this
						for(var j=0; j<st[i].num_of_strands; j++){
							if(j < xhr.response.length){
								var str_color = xhr.response[j].strand_color;
								var str_id = xhr.response[j].strand_id;
							}
							else{
								var str_color = 'NOT SET';
								var str_id = "NOT SET";
							}
							addRows(table, st[i].tube_id, colors, str_color, str_id);
						}
						tu[i].parentNode.parentNode.appendChild(table);
						return;
					}
					if(this.status != 200){
						console.log(xhr.response, this.status);
					}
				}
				xhr.send();
			})(tu, st, i);
		}
	}

	else{
		for(var i=0; i<tubesOnPage.length; i++){
			tubesOnPage[i].value = 0;
		}
	}
}

function makeTable(){
	var table = document.createElement('table');
	var tableBody = document.createElement('tbody');
	var row = document.createElement('tr');
	var tubeIDHead = document.createElement('th');
	var strandIDHead = document.createElement('th');
	var strandColorHead = document.createElement('th');
	var textTube = document.createTextNode("Tube Id");
	var strandIDText = document.createTextNode("Strand ID")
	var textColor = document.createTextNode("Strand Color");

	strandIDHead.appendChild(strandIDText);
	tubeIDHead.appendChild(textTube);
	strandColorHead.appendChild(textColor);

	row.appendChild(tubeIDHead);
	row.appendChild(strandIDHead);
	row.appendChild(strandColorHead);

	tableBody.appendChild(row);
	table.appendChild(tableBody);

	return table;
}

function addRows(table, tubeId, colors, select, strandId){
	// TODO add default selection of color
	var row = document.createElement('tr');
	var tubeIdData = document.createElement('td');
	var strandIdData = document.createElement('td');
	var strColorData = document.createElement('td');

	// tubeIdData.name = 'tubeID';
	// strandIdData.name = 'strandId';

	var colorSelect = document.createElement('select');
	colorSelect.name = "color";
	//Set default value.
	var option = document.createElement('option');
	var data = document.createTextNode('NOT SET');
	option.disabled = true;
	option.selected = true;
	option.value = "NOT SET";
	option.append(data);
	colorSelect.append(option);
	for(var i=0; i<colors.length; i++){
		var option = document.createElement('option');
		var data = document.createTextNode(colors[i].color_name);
		if(colors[i].color_id == select){
			option.selected = true;
			colorSelect.onchange = function(){
				updateInfo();
			};
		}
		option.value = colors[i].color_id;
		option.appendChild(data);
		colorSelect.appendChild(option);
	}
	if(colorSelect.selectedIndex == 0){
		colorSelect.onchange = function(){
			saveInfo()
		};
	}

	var idTextInput = document.createElement('input');
	var strandIdInput = document.createElement('input');

	idTextInput.name = 'tubeID';
	idTextInput.value = tubeId;
	idTextInput.readOnly = true;

	strandIdInput.readOnly = true;
	strandIdInput.name = 'strandID';
	strandIdInput.value = strandId;
	
	strandIdData.appendChild(strandIdInput);
	tubeIdData.appendChild(idTextInput);
	strColorData.appendChild(colorSelect);
	row.appendChild(tubeIdData);
	row.appendChild(strandIdData);
	row.appendChild(strColorData);
	table.appendChild(row);
	return;
}

function saveInfo(){
	document.getElementById('warning').style.display = 'inline';
	document.getElementById('save_strand_info').style.display = 'inline';
	document.getElementById('strand_update_button').style.display = 'none';

}

function updateInfo(){
	document.getElementById('warning').style.display = 'inline';
	document.getElementById('strand_update_button').style.display = 'inline';
	document.getElementById('save_strand_info').style.display = 'none';
}

