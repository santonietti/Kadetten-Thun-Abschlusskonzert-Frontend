const uri = 'https://localhost:44389/api/order';



function modifyItem() {

}
function deleteItem() {

}
function addItem() {
    var getfrom = document.getElementById("ticketform").elements;
    var items = document.getElementsByClassName("tickets");
    var tickets = [];
    var data = {
        email: getfrom.namedItem("email").value,
        clientLastName: getfrom.namedItem("prename").value,
        clientFirstName: getfrom.namedItem("lastname").value,
        bemerkung: getfrom.namedItem("text").value,
        kadettLastName: getfrom.namedItem("child-lastname").value,
        kadettFirstName: getfrom.namedItem("child-prename").value,
        KadettInKader: getfrom.namedItem("child-kader").checked,
        tickets: tickets
    }
    for (var i = 0; i < items.length; i++) {
        var ticket = {
            type: items[i].getAttribute('data-ticket'),
            quantity: Number(items[i].value),
            day: items[i].getAttribute('data-day')
        };
        tickets.push(ticket);
    }
    console.log(data);
    fetch(uri, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(function () {
            window.location.replace("/formfeedback.html");
        })
}