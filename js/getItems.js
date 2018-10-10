const uri = 'https://kadetten-dev.scapp.io/api/order';


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
                html += '<td>Telefon</td>';
                html += '<td>Kind in Kadetten</td>';
                html += '<td>' + data[i].kadettLastName + '</td>';
                html += '<td>' + data[i].kadettFirstName + '</td>';
                html += '<td>' + data[i].kadettInKader + '</td>';

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


            var edithtml = '<section id="edit"><button class="delete-button"><i class="fas fa-trash-alt"></i></button><button class="safe-button" onclick="safePopUp()">Speichern</button><div class="wrapper"><button class="close" onclick="closePopUp()"><i class="fas fa-times"></i></button><h2>Reservation von '+ data.clientFirstName +' '+ data.clientLastName+'</h2><form id="editform" name="editform" onsubmit="" >';

            var edithtml = '<section id="edit"><button class="delete-button" onmouseover="" style="cursor: pointer;"><i class="fas fa-trash-alt"></i></button><button class="safe-button" onmouseover="" style="cursor: pointer;">Speichern</button><div class="wrapper"><button class="close" onclick="closePopUp()" onmouseover="" style="cursor: pointer;"><i class="fas fa-times"></i></button><h2>Reservation von '+ data.clientFirstName +' '+ data.clientLastName+'</h2>';
            for (i = 0; i < data.tickets.length; i++) {

                var day = data.tickets[i].day;
                var quantity = data.tickets[i].quantity;
                var type = data.tickets[i].type;

                if (type == "Erwachsene" && day == "Sa")
                    edithtml += '<h3>Ticket Samstag Erwachsene</h3><input type="number" value="' + quantity + '" name="adult-sa" id="adult-sa" required />';
                else if (type == "Kind" && day == "Sa")
                    edithtml += '<h3>Ticket Samstag Kinder im Schulalter</h3><input type="number" value="' + quantity + '" name="child-sa" id="child-sa" required />';
                else if (type == "Kleinkind" && day == "Sa")
                    edithtml += '<h3>Ticket Samstag Kinder in Vorkursen</h3><input type="number" value="' + quantity + '" name="k-child-sa" id="k-child-sa" required />';
                else if (type == "Erwachsene" && day == "So")
                    edithtml += '<h3>Ticket Samstag Erwachsene</h3><input type="number" value="' + quantity + '" name="adult-so" id="adult-so" required />';
                else if (type == "Kind" && day == "So")
                    edithtml += '<h3>Ticket Samstag Kinder im Schulalter</h3><input type="number" value="' + quantity + '" name="child-so" id="child-so" required />';
                else if (type == "Kleinkind" && day == "So")
                    edithtml += '<h3>Ticket Samstag Kinder in Vorkursen</h3><input type="number" value="' + quantity + '" name="k-child-so" id="k-child-so" required />';
            }
            if (data.bemerkung == 'Keine')
                edithtml += '<h3>Bemerkungen</h3><textarea name="text" rows="1"></textarea></form></div></section>';
            else
                edithtml += '<h3>Bemerkungen</h3><textarea name="text" rows="1">' + data.bemerkung + '</textarea></form></div></section>';

            // INSERT EDIT SECTION
            document.getElementById("editcontainer").innerHTML = edithtml;
        });

}



function closePopUp(){
	
	//CHECK IF SOMETHING WAS CHANGED
	var change = 0
		
	var inputs = document.querySelectorAll('input[type=number]');
	
	for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var initialInputValue = input.getAttribute('value');
        input.setAttribute('value', input.value);
        if(initialInputValue != input.value) change = 1;
    }
    
    var textareas = document.querySelectorAll('textarea');
    for (var i = 0; i < textareas.length; i++) {
        var textarea = textareas[i];
        var initialTextareaValue = textarea.innerHTML;
        textarea.innerHTML = textarea.value;
        if(initialTextareaValue != textarea.innerHTML) change = 1;
    }

    //IF CHANGE MAKE POPUP
    if(change == 1){
	    if (confirm("Willst du die Seite Wirklich verlassen ohne die Änderungen zu speichern ?")) {
        	document.getElementById('edit').remove();
    	}
    }else{
	    document.getElementById('edit').remove();
	}
    	
}

function safePopUp(){
	document.getElementById("editform").submit();
}


//     WINDOW: LOAD CALL

window.onload = function () {
    GetItems();
}
