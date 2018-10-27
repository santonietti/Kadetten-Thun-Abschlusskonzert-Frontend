
const url = 'https://kadetten-dev.scapp.io/api/redactor';
// const url = 'https://localhost:44389/api/redactor';
var UrlindexOfIndex = document.URL.indexOf("index.html");
var UrlindexOfForm = document.URL.indexOf("form.html");
var UrlindexOfFormular = document.URL.indexOf("formular.html");
var UrlindexOfIntro = document.URL.indexOf("intro.html")
var UrlindexOfadmin = document.URL.indexOf("admin");

function GetformularStatus() {
	fetch(url + "/active")
		.then(res => res.json())
		.then(function (data) {
			if (UrlindexOfIntro >= 0)
				document.querySelector('#form-active-button').setAttribute("data-status-active", data)
			if (data == true) {
				if (UrlindexOfIntro >= 0) {
					//document.querySelector('#form-active-button > span').classList.add("active");
					//document.querySelector('#form-active-button > p').innerHTML = "Formular deaktivieren";
					if (data == true) {
						document.querySelector('.editor-hidden-input').setAttribute('data-redactor', "intro-active");
						createRedactor();
					}
					if (data == false) {
						document.querySelector('.editor-hidden-input').setAttribute('data-redactor', "intro-inactive");
						createRedactor();
					}

				}
				if (UrlindexOfFormular > 0) {
					document.querySelector('#form-active-button > span').classList.add("active");
					document.querySelector('#form-active-button > p').innerHTML = "Formular deaktivieren";
				}
				if (UrlindexOfIndex > 0) {
					document.querySelector('body > main > article').setAttribute('data-redactor', "intro-active");
					var button = document.querySelector('body > footer > a');
					button.parentNode.removeChild(button)
				}
				if (UrlindexOfadmin > 0) {
					document.querySelector('#registration-live > span').classList.add("active");
					document.querySelector('#registration-live > p').innerHTML = "Formular aktiv";
				}
			}
			else if (data == false) {
				if (UrlindexOfIntro >= 0) {
					document.querySelector('#form-active-button > span').classList.remove("active");
					document.querySelector('#form-active-button > p').innerHTML = "Formular aktivieren";
					if (data == true) {
						document.querySelector('.editor-hidden-input').setAttribute('data-redactor', "intro-active");
						createRedactor();
					}
					if (data == false) {
						document.querySelector('.editor-hidden-input').setAttribute('data-redactor', "intro-inactive");
						createRedactor();
					}
				}
				if (UrlindexOfIndex > 0) {
					document.querySelector('body > main > article').setAttribute('data-redactor', "intro-inactive");
					var button = document.querySelector('body > footer > a');
					button.parentNode.removeChild(button);
				}
				if (UrlindexOfadmin > 0) {
					document.querySelector('#registration-live > span').classList.remove("active");
					document.querySelector('#registration-live > p').innerHTML = "Formular inaktiv";
				}
			}
		});
}


function createRedactor() {
	var editorExists = document.querySelectorAll("#editor");
	var editorExistAlredy = document.getElementsByClassName("ql-editor");
	var name = document.querySelector('.editor-hidden-input').getAttribute('data-redactor');
	if (name != 0) {

		if (editorExists.length > 0 && editorExistAlredy.length == 0) {
			var toolbarOptions = [[{ 'header': [2, 3, false] }], ['bold'], ['link']];
			var quill = new Quill('#editor', {
				theme: 'snow',
				modules: {
					toolbar: toolbarOptions
				}
			});
		}

		fetch(url + "/" + name)
			.then(res => res.json())
			.then(function (data) {
				var text = data.text;
				document.querySelector('.ql-editor').innerHTML = text;

			});
		if (UrlindexOfFormular > 0)
			getRedactor();

	}
}


function getRedactor() {
	if (UrlindexOfForm > 0 || UrlindexOfFormular > 0) {
		var editortexts = document.querySelectorAll('#formularform > div > input');
		//Sandro hilfeee wieso füerts nur bim letstä for z fetch us???? (nur ihr formular ahsicht)
		for (var i = 0; i < editortexts.length; i++) {
			var editortext = editortexts[i];
			var name = editortext.getAttribute("data-redactor");
			fetch(url + "/" + name)
				.then(res => res.json())
				.then(function (data) {
					editortext.value = data.text;
				});

		}
	}
	else if (UrlindexOfIndex > 0) {
		var editortext = document.querySelector('body > main > article');
		var name = editortext.getAttribute("data-redactor");
		fetch(url + "/" + name)
			.then(res => res.json())
			.then(function (data) {
				editortext.innerHTML = data.text;
			});
	}
}

function postRedactor() {
	var editor = document.querySelector('.ql-editor');
	var UrlindexOf = document.URL.indexOf("intro.html");
	var datas = [];

	if (UrlindexOf > 0) {
		var inputs = document.querySelectorAll('.editor-hidden-input');
	}
	else
		var inputs = document.querySelectorAll('#formularform > div > input');

	for (x = 0; x < inputs.length; x++) {
		var data = {};
		var name = inputs[x].getAttribute('data-redactor');
		if (inputs[x].classList.contains("editor-hidden-input"))
			var content = editor.innerHTML;
		else
			content = inputs[x].value;


		data = {
			Name: name,
			Text: content
		}
		datas.push(data);
	}

	fetch(url, {
		method: 'Put',
		body: JSON.stringify(datas),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(function (myJson) {
		console.log(myJson);
	});
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
			if (status == true) {
				document.querySelector('.editor-hidden-input').setAttribute('data-redactor', "intro-active");
				document.querySelector('#form-active-button > span').classList.add("active");
			}
			if (status == false) {
				document.querySelector('.editor-hidden-input').setAttribute('data-redactor', "intro-inactive");
				document.querySelector('#form-active-button > span').classList.remove("active");
			}
		}
	});
}

function getRedactorInForm(name, selector) {
	var insertElement = document.querySelector(selector);
	fetch(url + "/" + name)
		.then(res => res.json())
		.then(function (data) {
			insertElement.innerHTML = data.text;
		});
}
document.addEventListener('DOMContentLoaded', function() {
	getRedactor();
 }, false);
 
 
window.onload = function () {
	GetformularStatus();
	// 
	if (UrlindexOfadmin > 0) {
		createRedactor();
	}
	if (UrlindexOfForm > 0) {
		getRedactorInForm('title-concert-1', '#ticketform > fieldset:nth-child(3) > fieldset:nth-child(1) > legend > h3');
		getRedactorInForm('time-concert-1', '#ticketform > fieldset:nth-child(3) > fieldset:nth-child(1) > legend > time');
		getRedactorInForm('title-concert-2', '#ticketform > fieldset:nth-child(3) > fieldset:nth-child(2) > legend > h3');
		getRedactorInForm('time-concert-2', '#ticketform > fieldset:nth-child(3) > fieldset:nth-child(2) > legend > time');
	}
}