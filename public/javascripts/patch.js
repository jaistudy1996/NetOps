
console.log(document.getElementById('from_strand'));
var from_frame = document.getElementById('from_strand');
var from_strand;
var to_strand;
from_frame.onload = function() {
	load(from_frame, from_strand);
}

function load(frame, place){
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
			console.log(place);
		}
		catch(e){
			console.log(e);
		}
	}
}
