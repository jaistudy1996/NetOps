/**
 * @author Jayant Arora <jaistudy1996@gmail.com>
 * @description This file handles all the frame, select and option events for patch.ejs file.
 */

// Get respective frames from DOM by ID.
var from_frame = document.getElementById('from_strand');
var to_frame = document.getElementById('to_strand');

// These variables will hold the strandID that the user selects to send to the database.
var from_strand;
var to_strand;

from_frame.onload = function() {
	load(from_frame, from_strand, 'from_strand_details');
}

to_frame.onload = function() {
	load(to_frame, to_strand, 'to_strand_details');
}

/**
 * @param {frame object} frame - send a frame object to identify specific part of iframe.
 * @param {number} place - this variable is used to store the returned value of the strand selected.
 * @param {string} id - this is the id of the place where the data is displayed to the user about the selected strand. 
 */
function load(frame, place, id){
	var body = frame.contentWindow.document.getElementsByTagName('body');
	
	body[0].onclick = function(){
		var num = 0; // Count the number of radio buttons in TR tags.
		var selectTags = frame.contentWindow.document.getElementsByTagName("select");
		var trTags = frame.contentWindow.document.getElementsByTagName('tr');
		for(var i=0; i<selectTags.length; i++){
			if(selectTags[i].name == 'color'){
				selectTags[i].onchange = function(){return false;}
				selectTags[i].disabled = true;
			}
		}

		// Use indexVal to set value of checkbox. If you use i as the value then when it skips for loop, it makes some of the checkboxes have no strandID and no tubeID.
		indexVal = 1
		for(var i=0; i<trTags.length; i++){
			// Need children.length to stop recurring construction of checkbox buttons. i != 0
			// Do not add checbox if it is a heading.

			if(trTags[i].children.length < 4 && num < trTags.length-1 && trTags[i].children[0].matches('th') == false){
				var td = document.createElement('td');
				var checkbox = document.createElement('input');
				checkbox.name = 'selection';
				checkbox.type = 'checkbox';
				checkbox.value = indexVal;
				indexVal++;
				checkbox.onchange = function(){
					if(frame.contentWindow.document.querySelectorAll('input[name="selection"]:checked').length > 2){
						this.checked = false;
					}
					if(frame.contentWindow.document.querySelectorAll('input[name="selection"]:checked').length == 2){
						// this cableID will get the cable ID of the selected cable from the list.
						// the values of these options actually are the cable ID's from the database.
						// UPDATE: change to selectedIndex as the value attr can change overtime for cables
						var cableID = frame.contentWindow.document.querySelector('#cable_select').selectedIndex;
						// subtract 1 because cablesID's start with 1 and we are accessing the db will give us the info for the next one.. 
						var cableInfo = frame.contentWindow.cables[cableID-1];
						document.getElementById(id+'_loc_1').innerHTML = cableInfo.from_building;
						document.getElementById(id+'_loc_1').value = cableInfo.from_location;
						//Needs to be done only once. 
						document.getElementById(id+'_loc_1').parentNode.onchange = function(){
							document.getElementById(id+'_enclosure_no').readOnly = true;
							if(id[0] == 'f'){
								document.getElementById(id+'_enclosure_no').value = cableInfo.from_enclosure_no;
							}
							else{
								document.getElementById(id+'_enclosure_no').value = cableInfo.to_enclosure_no;
							}
							
						}
						document.getElementById(id+'_loc_2').innerHTML = cableInfo.to_dest_building;
						document.getElementById(id+'_loc_2').value = cableInfo.dest_location;
					}
					return;
				}
				td.appendChild(checkbox);
				trTags[i].appendChild(td);
				num++;
			}
		}
		try{
			// Place refers to all the selected checkboxes in the iframe.
			place = frame.contentWindow.document.querySelectorAll('input[name="selection"]:checked');
			// Declare tubeID and strandID variables to save computation time.
			console.log("Place: ", place);
			var tubeID = frame.contentWindow.document.getElementsByName('tubeID')[place[0].value-1].value;
			var strandID = frame.contentWindow.document.getElementsByName('strandID')[place[0].value-1].value;
			console.log("TubeID - 1: ", tubeID);
			console.log("StrandID - 1: ", strandID);
			document.getElementById(id).innerHTML = 'Selected ' + id + ' strand - 1 has Tube ID = ' + tubeID + ' Strand ID = ' + strandID + '.';

			var tubeID_2 = frame.contentWindow.document.getElementsByName('tubeID')[place[1].value-1].value;
			var strandID_2 = frame.contentWindow.document.getElementsByName('strandID')[place[1].value-1].value;
			console.log("TubeID - 2: ", tubeID_2);
			console.log("StrandID - 2: ", strandID_2);

			document.getElementById(id+'_2').innerHTML = 'Selected ' + id + ' strand - 2 has Tube ID = ' + tubeID_2 + ' Strand ID = ' + strandID_2 + '.';


			// Warning handled here
			if(strandID == 'NOT SET'){
				if(id == 'from_strand_details'){
					document.getElementById('warning_from').style.display = 'inline';
					// document.getElementById('patch_submit').disabled = true;
				}
				if(id == 'to_strand_details'){
					document.getElementById('warning_to').style.display = 'inline';
					// document.getElementById('patch_submit').disabled = true;
				}
			}
			else{
				if(id == 'from_strand_details'){
					document.getElementById('warning_from').style.display = 'none';
					// set the valaue to hidden input field to send it with the form. 
					document.getElementsByName('from_strand_id')[0].value = strandID;
					document.getElementsByName('from_strand_id_2')[0].value = strandID_2;
					// document.getElementById('patch_submit').disabled = false;
				}
				if(id == 'to_strand_details'){
					document.getElementById('warning_to').style.display = 'none';
					// set the valaue to hidden input field to send it with the form. 
					document.getElementsByName('to_strand_id')[0].value = strandID;
					document.getElementsByName('to_strand_id_2')[0].value = strandID_2;
					// document.getElementById('patch_submit').disabled = false;
				}
			}
		}
		catch(e){
			// Catch all  TypeErrors when input for selection is NULL.
			// Uncomment for debugging
			console.log(e);
		}
	}
}

/**
 * @param {string} id - this id refers to the option selected from select. 
 * @parma {string} from_or_to - this refers to the from or to location from the page. 
 * @description This function will disable or enable div tags and submut button to support invalid responses or repeated selection of Switch or FiberEnclosure or vice versa. 
 */

function switch_or_FE(id, from_or_to){
	if(id == 'Switch' && from_or_to == 'from'){

		document.getElementById('from_switch').style.display = 'inline';
		document.getElementById('from_fiber_enclosure').style.display = 'none';

		document.getElementsByName('from_enclosure_number')[0].disabled = true;
		document.getElementsByName('from_panel_no')[0].disabled = true;
		document.getElementsByName('from_port_number')[0].disabled = true;

		document.getElementsByName('from_ip_address')[0].disabled = false;
		document.getElementsByName('from_port_numnber')[0].disabled = false;
	}
	if(id == 'FiberEnclosure' && from_or_to == 'from'){
		document.getElementById('from_switch').style.display = 'none';
		document.getElementById('from_fiber_enclosure').style.display = 'inline';

		document.getElementsByName('from_ip_address')[0].disabled = true;
		document.getElementsByName('from_port_numnber')[0].disabled = true;

		document.getElementsByName('from_enclosure_number')[0].disabled = false;
		document.getElementsByName('from_panel_no')[0].disabled = false;
		document.getElementsByName('from_port_number')[0].disabled = false;
	}
	if(id == 'Switch' && from_or_to == 'to'){
		document.getElementById('to_switch').style.display = 'inline';
		document.getElementById('to_fiber_enclosure').style.display = 'none';

		document.getElementsByName('to_enclosure_number')[0].disabled = true;
		document.getElementsByName('to_panel_no')[0].disabled = true;
		document.getElementsByName('to_port_number')[0].disabled = true;

		document.getElementsByName('to_ip_address')[0].disabled = false;
		document.getElementsByName('to_port_numnber')[0].disabled = false;
	}
	if(id == 'FiberEnclosure' && from_or_to == 'to'){
		document.getElementById('to_switch').style.display = 'none';
		document.getElementById('to_fiber_enclosure').style.display = 'inline';

		document.getElementsByName('to_ip_address')[0].disabled = true;
		document.getElementsByName('to_port_numnber')[0].disabled = true;

		document.getElementsByName('to_enclosure_number')[0].disabled = false;
		document.getElementsByName('to_panel_no')[0].disabled = false;
		document.getElementsByName('to_port_number')[0].disabled = false;

	}
}
