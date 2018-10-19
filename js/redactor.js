// CREATE REDACTOR
const url = 'https://kadetten-dev.scapp.io/api/redactor';
// const url = 'https://localhost:44389/api/redactor';


function createRedactor() {
	var editorExists = document.querySelectorAll("#editor");

	if (editorExists.length > 0) {
		var toolbarOptions = [[{ 'header': [2, 3, false] }], ['bold'], ['link']];
		var quill = new Quill('#editor', {
			theme: 'snow',
			modules: {
				toolbar: toolbarOptions
			}
		});

		// INSERT CONTENT TO EDITOR
		var name = document.querySelector('.editor-hidden-input').getAttribute('data-redactor');

		fetch(url + "/" + name)
			.then(res => res.json())
			.then(function (data) {
				var text = data.text;
				document.querySelector('.ql-editor').innerHTML = text;

			});

	}


}


function getRedactor() {
	var editortexts = document.querySelectorAll('.editortext');
	if (editortexts.length > 0) {

		for (var i = 0; i < editortexts.length; i++) {
			var editortext = editortexts[i];
			var name = editortext.getAttribute("data-redactor");
			fetch(url + "/" + name)
				.then(res => res.json())
				.then(function (data) {
					var text = data.text;
					editortext.innerHTML = text

				});
		}
	}
	// p.innerHTML = data.text https://codepen.io/k3no/pen/amwpqk
}


function postRedactor() {
	var editor = document.querySelector('.ql-editor');
	var editorContent = editor.innerHTML;
	var about = document.querySelector('.editor-hidden-input');
	var name = about.getAttribute('data-redactor')
	//about.value = JSON.stringify(editor.getContents());
	//about.value = JSON.stringify(editorContent);

	var data = [];
	for (i = 0; i > name; i++) {
		data = {
			Name: name,
			Text: editorContent
		}
	}

	fetch(url, {
		method: 'Put',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(function (myJson) {
		console.log(myJson);
		//console.log(about.value);
		//console.log(editorContent);
	});

	/*
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
	  
		*/
}
function postFormularStatus() {
	var button = document.querySelector('#form-active-button');
	var status = button.getAttribute('data-status-active');

	if (status == "false")
		status = true
	else if (status == "true")
		status = false

	fetch(url + "/active/" + status, {
		method: 'Put',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(function (myJson) {
		if (myJson.status == 200) {
			button.setAttribute("data-status-active", status)
			GetformularStatus();
			if (status == true)
				document.querySelector('#form-active-button > span').classList.add("active");
			else if (status == false)
				document.querySelector('#form-active-button > span').classList.remove("active");
		}
	});
}
function GetformularStatus() {
	fetch(url + "/active")
		.then(res => res.json())
		.then(function (data) {
			document.querySelector('#form-active-button').setAttribute("data-status-active", data)
			if (data == true) {
				document.querySelector('#form-active-button > span').classList.add("active");
				document.querySelector('#registration-live > span').classList.add("active")
			}
			else if (data == false)
			{
				document.querySelector('#form-active-button > span').classList.remove("active");
				document.querySelector('#registration-live > span').classList.remove("active")
			}

		});

}
window.onload = function () {
	createRedactor();
	getRedactor();
	GetformularStatus();
}