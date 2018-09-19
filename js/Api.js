const uri = 'https://localhost:44389/api/order';

function GetItems() {
  fetch(uri)
    .then(res => res.json())//response type
    .then(data => console.log(data)); //log the data;
  return false
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
  var data={
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
  .then((data) =>  console.log(data))
  .catch((err)=>console.dir(err))
}