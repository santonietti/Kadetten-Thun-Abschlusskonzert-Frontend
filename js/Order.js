const uri = 'https://kadetten-dev.scapp.io/api/order';
// const uri = 'https://localhost:44389/api/order';


function addItem() {
    var getfrom = document.getElementById("ticketform").elements;
    var items = document.getElementsByClassName("tickets");
    var tickets = [];
    var data = {
        email: getfrom.namedItem("email").value,
        phone: getfrom.namedItem("tel").value,
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
    fetch(uri, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (myJson) {
        if (myJson.status == 200)
            window.location.pathname = "/formfeedback.html";
        else
            console.log(myJson.statusText)
    });
}
function GetItems() {
    fetch(uri)
        .then(res => res.json())
        .then(function (data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<tr >';
                html += '<td>' + data[i].clientLastName + '</td>';
                html += '<td>' + data[i].clientFirstName + '</td>';
                html += '<td>' + data[i].email + '</td>';
                html += '<td>' + data[i].phone + '</td>';
                if (data[i].kadettLastName != null || data[i].kadettFirstName != null)
                    html += '<td>Ja</td>';
                else
                    html += '<td>Nein</td>';
                html += '<td>' + data[i].kadettLastName + '</td>';
                html += '<td>' + data[i].kadettFirstName + '</td>';
                if (data[i].kadettInKader == true)
                    html += '<td>Ja</td>';
                else if (data[i].kadettInKader == false)
                    html += '<td>Nein</td>';


                var ticketsObj = {};
                Object.assign(data[i].tickets, ticketsObj);

                for (var x = 0; x < data[i].tickets.length; x++) {

                    var day = data[i].tickets[x].day;
                    var quantity = data[i].tickets[x].quantity;
                    var type = data[i].tickets[x].type;


                    if (type == "Erwachsene" && day == "Sa")
                        html += '<td>' + quantity + '</td>';
                    else if (type == "Kind" && day == "Sa")
                        html += '<td>' + quantity + '</td>';
                    else if (type == "Kleinkind" && day == "Sa")
                        html += '<td>' + quantity + '</td>';
                    else if (type == "Erwachsene" && day == "So")
                        html += '<td>' + quantity + '</td>';
                    else if (type == "Kind" && day == "So")
                        html += '<td>' + quantity + '</td>';
                    else if (type == "Kleinkind" && day == "So")
                        html += '<td>' + quantity + '</td>';
                }
                html += '<td>' + data[i].bemerkung + '</td>';
                //html += '<td class="edit-icon">' + '<a onclick="modifyItem()" data-email="' + data[i].email + '" href="#" ><i class="fas fa-pencil-alt"></i></a>' + '</td>';
                html += '<td data-email="' + data[i].email + '" class="edit-icon">' + '<a data-email="' + data[i].email + '" href="#" ><i data-email="' + data[i].email + '" class="fas fa-pencil-alt"></i></a>' + '</td>';
                html += '</tr>';
            }
            document.getElementById("result").innerHTML = html;

            // EDIT ICON FINDER FUNCTION
            AssignEditIcons();
        });
}


//ASSIGN CLICK EVENT TO ALL EDIT ICONS
function AssignEditIcons() {
    var editIcons = document.querySelectorAll('.edit-icon');
    for (var i = 0; i < editIcons.length; i++) {
        var editIcon = editIcons[i];
        editIcon.addEventListener("click", function (e) { GetItemByEmail(e) });
    }
}

function GetItemByEmail(e) {
    var email = e.target.getAttribute("data-email");
    const url = uri + '/' + email;

    fetch(url)
        .then(res => res.json())
        .then(function (data) {

            var edithtml = '<section id="edit">';
            //BUTTON DELETE
            edithtml += '<button onclick="deleteItem(\'' + data.email + '\');" class="delete-button" onmouseover="" style="cursor: pointer;"><i class="fas fa-trash-alt"></i></button>';
            //BUTTON ADD
            edithtml += '</button><button onclick="safePopUp(\'' + data.email + '\');" class="safe-button" onmouseover="" style="cursor: pointer;">Speichern</button>';
            //BUTTON CLOSE
            edithtml += '<div class="wrapper"><button class="close" onclick="closePopUp()" onmouseover="" style="cursor: pointer;"><i class="fas fa-times"></i></button>';
            //HEADER
            edithtml += '<h2>Reservation von ' + data.clientFirstName + ' ' + data.clientLastName + '</h2>';
            //EMAIL FIELD
            edithtml += '<h3>Email:</h3><input name="email" type="email" placeholder="E-Mail" value="' + data.email + '" required />'

            for (i = 0; i < data.tickets.length; i++) {

                var day = data.tickets[i].day;
                var quantity = data.tickets[i].quantity;
                var type = data.tickets[i].type;

                if (type == "Erwachsene" && day == "Sa")
                    edithtml += '<h3>Ticket Samstag Erwachsene</h3><input type="number" value="' + quantity + '" class="tickets" name="adult-sa" id="adult-sa" required  data-ticket="Erwachsene" data-Day="Sa"/>';
                else if (type == "Kind" && day == "Sa")
                    edithtml += '<h3>Ticket Samstag Kinder im Schulalter</h3><input type="number" value="' + quantity + '" class="tickets" name="child-sa" id="child-sa" required data-ticket="Kind" data-Day="Sa" />';
                else if (type == "Kleinkind" && day == "Sa")
                    edithtml += '<h3>Ticket Samstag Kinder in Vorkursen</h3><input type="number" value="' + quantity + '" class="tickets" name="k-child-sa" id="k-child-sa" required  data-ticket="Kleinkind" data-Day="Sa"/>';
                else if (type == "Erwachsene" && day == "So")
                    edithtml += '<h3>Ticket Samstag Erwachsene</h3><input type="number" value="' + quantity + '" class="tickets" name="adult-so" id="adult-so" required  data-ticket="Erwachsene" data-Day="So" />';
                else if (type == "Kind" && day == "So")
                    edithtml += '<h3>Ticket Samstag Kinder im Schulalter</h3><input type="number" value="' + quantity + '" class="tickets" name="child-so" id="child-so" required data-ticket="Kind" data-Day="So" />';
                else if (type == "Kleinkind" && day == "So")
                    edithtml += '<h3>Ticket Samstag Kinder in Vorkursen</h3><input type="number" value="' + quantity + '" class="tickets" name="k-child-so" id="k-child-so" required data-ticket="Kleinkind" data-Day="So" />';
            }
            if (data.bemerkung == 'Keine')
                edithtml += '<h3>Bemerkungen</h3><textarea name="text" rows="1"></textarea></form></div></section>';
            else
                edithtml += '<h3>Bemerkungen</h3><textarea name="text" rows="1">' + data.bemerkung + '</textarea></form></div></section>';

            // INSERT EDIT SECTION
            document.getElementById("editcontainer").innerHTML = edithtml;
        });

}



function closePopUp() {

    //CHECK IF SOMETHING WAS CHANGED
    var change = 0

    var inputs = document.querySelectorAll('input[type=number]');

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var initialInputValue = input.getAttribute('value');
        input.setAttribute('value', input.value);
        if (initialInputValue != input.value) change = 1;
    }

    var textareas = document.querySelectorAll('textarea');
    for (var i = 0; i < textareas.length; i++) {
        var textarea = textareas[i];
        var initialTextareaValue = textarea.innerHTML;
        textarea.innerHTML = textarea.value;
        if (initialTextareaValue != textarea.innerHTML) change = 1;
    }

    //IF CHANGE MAKE POPUP
    if (change == 1) {
        if (confirm("Willst du die Seite wirklich verlassen ohne die Änderungen zu speichern ?")) {
            document.getElementById('edit').remove();
        }
    } else {
        document.getElementById('edit').remove();
    }

}

function safePopUp(email) {
    var items = document.getElementsByClassName("tickets");
    var tickets = [];
    var url = uri + '/' + email;

    var data = {
        email: document.getElementsByName("email")[0].value,
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
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (myJson) {
        if (myJson.status == 200) {
            document.getElementById('edit').remove();
            GetItems();
        }
        else
            console.log(myJson.statusText)
    });
}


function deleteItem(email) {
    var url = uri + '/' + email;

    fetch(url, {
        method: 'delete',
    }).then(res => res.json())
}




function deleteAll() {
    console.log('asdf');
    if (confirm("Willst du wirklich alle Reservationen löschen ?")) {
        // CODE DELETE ALL
    }
}

function AssignDeleteButton() {
    document.getElementById('delete-all').addEventListener("click", function () { deleteAll() });
}

//     WINDOW: LOAD CALL

window.onload = function () {
    GetItems();
    AssignDeleteButton()
}