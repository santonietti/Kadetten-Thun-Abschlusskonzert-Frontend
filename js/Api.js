const uri = 'https://kadetten-dev.scapp.io/api/order';

function GetItems() {
  // fetch(uri)
  //   .then(res => res.json())//response type
  //   .then(data => console.log(data));
  fetch(uri)
    .then(res => function (res) {
      if (res.results) {
        var html = '';
        for (var i = 0; i < res.results.length; i++) {

          html += '<td>' + res.results[i].clientLastName + '</td>';
          html += '<td>' + res.results[i].clientFirstName + '</td>';
          html += '<td>' + res.results[i].email + '</td>';
          html += '<td>Telefon</td>';
          html += '<td>Kind in Kadetten</td>';
          html += '<td>' + res.results[i].kadettLastName + '</td>';
          html += '<td>' + res.results[i].kadettFirstName + '</td>';
          html += '<td>' + res.results[i].kadettInKader + '</td>';
          for (var x = 0; x < i.tickets; i++) {
            if (res.results[i].tickets[x].day == "Sa") {
              if (res.results[i].tickets[x].type == "Erwachsene") {
                html += '<td>' + res.results[i].tickets[x].quantity + '</td>';
              }
              else if (res.results[i].tickets[x].type == "Kind") {
                html += '<td>' + res.results[i].tickets[x].quantity + '</td>';
              } 
              else if (res.results[i].tickets[x].type == "KleinKind") {
                html += '<td>' + res.results[i].tickets[x].quantity + '</td>';
              }
            }
            if (res.results[i].tickets[x].day == "So") {
              if (res.results[i].tickets[x].type == "Erwachsene") {
                html += '<td>' + res.results[i].tickets[x].quantity + '</td>';
              }
              else if (res.results[i].tickets[x].type == "Kind") {
                html += '<td>' + res.results[i].tickets[x].quantity + '</td>';
              } 
              else if (res.results[i].tickets[x].type == "KleinKind") {
                html += '<td>' + res.results[i].tickets[x].quantity + '</td>';
              }
            }
          }
          html += '<td>' + res.results[i].bemerkung + '</td>';
        }
        $('#results').html(html);
      });
}

function GetItem() {
}
function modifyItem() {

}
function deleteItem() {

}

document.getElementById('ticketform').addEventListener('submit', addItem);

function addItem(event) {
  event.preventDefault();
  // var getfrom = document.getElementById("ticketform").elements;
  // var items = document.getElementsByClassName("tickets");
  // var tickets = [];
  // var data = {
  //   email: getfrom.namedItem("email").value,
  //   clientLastName: getfrom.namedItem("prename").value,
  //   clientFirstName: getfrom.namedItem("lastname").value,
  //   bemerkung: getfrom.namedItem("text").value,
  //   kadettLastName: getfrom.namedItem("child-lastname").value,
  //   kadettFirstName: getfrom.namedItem("child-prename").value,
  //   KadettInKader: getfrom.namedItem("child-kader").checked,
  //   tickets: tickets
  // }
  // for (var i = 0; i < items.length; i++) {
  //   if (items[i].value > 0) {
  //     var ticket = {
  //       type: items[i].getAttribute('data-ticket'),
  //       quantity: Number(items[i].value),
  //       day: items[i].getAttribute('data-day')
  //     };
  //     tickets.push(ticket);
  //   }
  // }
  var data = {
    email: "pipp@gmail.com",
    clientLastName: "tröt",
    clientFirstName: "pipp",
    bemerkung: "tröt",
    kadettLastName: "nöbu",
    kadettFirstName: "pipp",
    kadettInKader: false,
    tickets: [
      {
        type: "Erwachsene",
        quantity: 10,
        day: null
      }
    ]
  }
  console.log(data)
  return fetch(uri, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data)
  }).then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.dir(err))
}