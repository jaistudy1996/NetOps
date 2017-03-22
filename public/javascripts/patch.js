
// console.log(document.getElementById('from_strand'));
var from_frame = document.getElementById('from_strand');
var to_frame = document.getElementById('to_strand');
var from_strand;
var to_strand;
from_frame.onload = function() {
	load(from_frame, from_strand, 'from_strand_details');
}

to_frame.onload = function() {
	load(to_frame, to_strand, 'to_strand_details');
}

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
			if(num != TRtags.length-1 && i != 0){
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
			document.getElementById(id).innerHTML = 'Selected ' + id + ' strand has Tube ID = ' + frame.contentWindow.document.getElementsByName('tubeID')[place-1].value + ' Strand ID = ' + frame.contentWindow.document.getElementsByName('strandID')[place-1].value + '.';
			if(frame.contentWindow.document.getElementsByName('strandID')[place-1].value == 'NOT SET'){
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
				}
				if(id == 'to_strand_details'){
					document.getElementById('warning_to').style.display = 'none';
				}
			}
		}
		catch(e){
			// console.log(e);
		}
	}
}
