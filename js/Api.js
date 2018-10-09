const uri = 'https://kadetten-dev.scapp.io/api/order';



function modifyItem() {

}
function deleteItem() {

}
function addItem(event) {
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
    email: "tuuut@gmail.com",
    clientLastName: "tröt",
    clientFirstName: "pipp",
    bemerkung: "tröt",
    kadettLastName: "nöbu",
    kadettFirstName: "pipp",
    tickets: [
        {
            type: "Erwachsene",
            quantity: 10,
            date: "Sa"
        },
        {
            type: "Kind",
            quantity: 5,
            date: "So"
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