const url = 'https://kadetten-dev.scapp.io/api/authenticate';
// const url = 'https://localhost:44389//api/authenticate';


function isAuthenticated() {
    var username = document.querySelector('#loginform > input[type="text"]:nth-child(1)');
    var pw = document.querySelector('#loginform > input[type="text"]:nth-child(2)');
    var data = {
        username: username.value,
        pw: pw.value
    }
    fetch(url, {
        method: 'Post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res => res.json()))
        .then(function (data1) {
            if (data1 != null) {
                var datetime = new Date();
                datetime.setTime(datetime.getTime() + (2 * 60 * 60 * 1000));
                var expires = +datetime.toGMTString();
                document.cookie = "username=" + data.username + ";expires=" + expires;
                document.cookie = "pw=" + data.pw + ";expires=" + expires;

                window.location.pathname = "/admin/reservationen.html";
            }

        });
}
