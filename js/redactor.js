// CREATE REDACTOR
const url = 'https://kadetten-dev.scapp.io/api/Redactor';
// const url = 'https://localhost:44389/api/Redactor';

var toolbarOptions = [[{ 'header': [2, 3, false] }], ['bold'], ['link']];

var quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions
  }
});

function GetRedactor() {
  fetch(url+"/intro")
        .then(res => res.json())
        .then(function (data) {
    var p = document.createElement("p")
    // p.innerHTML = data.text https://codepen.io/k3no/pen/amwpqk
  });
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
  GetRedactor();
}