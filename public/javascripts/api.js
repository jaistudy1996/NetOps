var xhr = new XMLHttpRequest();
  var url = 'https://hacker-news.firebaseio.com/v0/item/13707547.json';
  xhr.responseType = 'json';
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
                console.log(xhr.response);
        }
        else{
                console.log("Error: ", xhr.response, xhr.status, xhr.readyState);
        }
  };
  xhr.send();

