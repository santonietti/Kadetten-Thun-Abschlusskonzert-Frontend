// CREATE REDACTOR

var toolbarOptions = [[{ 'header': [2, 3, false] }], ['bold'], ['link']];

var quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions
  }
});