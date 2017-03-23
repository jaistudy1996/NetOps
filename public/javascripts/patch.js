
// console.log(document.getElementById('from_strand'));
var from_frame = document.getElementById('from_strand');
var to_frame = document.getElementById('to_strand');
// have seperate frame variables to access them individually.
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
	var num = 0;
	body[0].onclick = function(){
		var selectTags = frame.contentWindow.document.getElementsByTagName("select");
		var TRtags = frame.contentWindow.document.getElementsByTagName('tr');
		for(var i=0; i<selectTags.length; i++){
			if(selectTags[i].name == 'color'){
				selectTags[i].onchange = function(){}
				selectTags[i].disabled = true;
			}
		}
		for(var i=0; i<TRtags.length; i++){
			if(num < TRtags.length-1 && i != 0){
				var td = document.createElement('td');
				var radio = document.createElement('input');
				radio.name = 'selection';
				radio.type = 'radio';
				radio.value = i;
				td.appendChild(radio);
				TRtags[i].appendChild(td);
				num++;
			}
		}
		try{
			place = frame.contentWindow.document.querySelector('input[name="selection"]:checked').value;

			// Declare variables to save computation time.
			var tubeID = frame.contentWindow.document.getElementsByName('tubeID')[place-1].value;
			var strandID = frame.contentWindow.document.getElementsByName('strandID')[place-1].value

			document.getElementById(id).innerHTML = 'Selected ' + id + ' strand has Tube ID = ' + tubeID + ' Strand ID = ' + strandID + '.';

			// Warning handled here
			if(strandID == 'NOT SET'){
				if(id == 'from_strand_details'){
					document.getElementById('warning_from').style.display = 'inline';
				}
				if(id == 'to_strand_details'){
					document.getElementById('warning_to').style.display = 'inline';
				}
			}
			else{
				if(id == 'from_strand_details'){
					document.getElementById('warning_from').style.display = 'none';
					// set the valaue to hidden input field to send it with the form. 
					document.getElementsByName('from_strand_id')[0].value = strandID;
				}
				if(id == 'to_strand_details'){
					document.getElementById('warning_to').style.display = 'none';
					// set the valaue to hidden input field to send it with the form. 
					document.getElementsByName('to_strand_id')[0].value = strandID;
				}
			}
		}
		catch(e){
			// console.log(e);
		}
	}
}

function switch_or_FE(id, from_or_to){
	console.log(id, from_or_to);
}


