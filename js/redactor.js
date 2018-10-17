// CREATE REDACTOR
const url = 'https://kadetten-dev.scapp.io/api/Redactor';
// const url = 'https://localhost:44389/api/Redactor';


function createRedactor(){
	var editorExists = document.querySelectorAll("#editor");
	
	if(editorExists.length > 0) {
		var toolbarOptions = [[{ 'header': [2, 3, false] }], ['bold'], ['link']];
		var quill = new Quill('#editor', {
			theme: 'snow',
	  		modules: {
	  			toolbar: toolbarOptions
	  		}
		});
		
		// INSERT CONTENT TO EDITOR
		var name = document.querySelector('.editor-hidden-input').getAttribute('data-redactor');
		
		fetch(url+"/"+name)
        .then(res => res.json())
        .then(function (data) {
	    	var text = data.text;
			document.querySelector('.ql-editor').innerHTML = text;
		
		});
		
	}
	
	
}


function getRedactor() {
	var editortexts = document.querySelectorAll('.editortext');
	if(editortexts.length > 0) {
		
		
		for (var i = 0; i < editortexts.length; i++) {
	        var editortext = editortexts[i];
	        var name = editortext.getAttribute("data-redactor");
	        
	        fetch(url+"/"+name)
	        .then(res => res.json())
	        .then(function (data) {
			    var text = data.text;
				console.log(text);
		    
			});
    	}
	}
    // p.innerHTML = data.text https://codepen.io/k3no/pen/amwpqk
}


function postRedactor() {
  var about = document.querySelector('input[name=intro]');
  about.value = JSON.stringify(quill.getContents());
  var data = {
    Name: about.getAttribute('data-redactor'),
    Text: about.value
  }
  fetch(url, {
    method: 'Put',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (myJson) {
    console.log(myJson);
  });
}

window.onload = function () {
	createRedactor();
	getRedactor();
}