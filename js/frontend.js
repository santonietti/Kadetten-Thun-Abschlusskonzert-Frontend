const url = 'https://kadetten-dev.scapp.io/api/redactor';

function getRedactorInForm(name, selector) {
    //  var name = "title-concert-1";
    var insertElement = document.querySelector(selector);
    fetch(url + "/" + name)
        .then(res => res.json())
        .then(function (data) {
            insertElement.innerHTML = data.text;
        });
}
window.onload = function () {
    var UrlindexOf = document.URL.indexOf("form.html");
    if (UrlindexOf > 0) {
        getRedactorInForm('title-concert-1', '#ticketform > fieldset:nth-child(3) > fieldset:nth-child(1) > legend > h3');
        getRedactorInForm('time-concert-1', '#ticketform > fieldset:nth-child(3) > fieldset:nth-child(1) > legend > time');
        getRedactorInForm('title-concert-2', '#ticketform > fieldset:nth-child(3) > fieldset:nth-child(2) > legend > h3');
        getRedactorInForm('time-concert-2', '#ticketform > fieldset:nth-child(3) > fieldset:nth-child(2) > legend > time');
    }
}