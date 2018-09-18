const uri = 'https://localhost:44389/api/order';

function GetItems() {
  fetch(uri)
    .then(res => res.json())//response type
    .then(data => console.log(data)); //log the data;
  return false
}

function GetItem() {
}
// function addItem() {
//     const order = {
//         'ticketE': $('#add-ticketESa').val(),
//         'ticketK': $('#add-ticketKSa').val(),
//         'ticketKK': $('#add-ticketKKSa').val(),
//         'ticketE': $('#add-ticketESo').val(),
//         'ticketK': $('#add-ticketKSo').val(),
//         'ticketKK': $('#add-ticketKKSo').val(),
//     };
//     var url = 'https://example.com/profile';
//     var data = {
//         email: $('#add-email').val(),
//         clientLastName: $('#add-lastname').val(),
//         clientFirstName: $('#add-firstname').val(),
//         bemerkung: $('#add-bemerkung').val(),
//         kadettLastName: "nöbu",
//         kadettFirstName: "pipp",
//         tickets: ticket
//       };

//     fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers:{
//         'Content-Type': 'application/json'
//       }
//     }).then(res => res.json())
//     .then(response => console.log('Success:', JSON.stringify(response)))
//     .catch(error => console.error('Error:', error));
// }
function modifyItem() {

}
function deleteItem() {

}


function addItem() {
  const formData = new FormData(document.getElementsByName('ticketform'))
  for (var value of formData.entries()) {
    console.log(value);
  }
  return fetch(uri, {
    method: 'POST', // or 'PUT'
    body: formData  // a FormData will automatically set the 'Content-Type'
  })
    .then(response => response.json())


}