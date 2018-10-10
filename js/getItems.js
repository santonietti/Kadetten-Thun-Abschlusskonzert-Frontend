/*const uri = 'https://kadetten-dev.scapp.io/api/order';
window.onload = function () {
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

                for (var x = 0; x < (6 - data[i].tickets.length); x++) {
                    ticketsObj += {
                        quantity: 0,
                        type: "",
                        day: ""
                    };
                }
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
                html += '<td class="edit-icon">' + '<a onclick="" data-email="' + data[i].email + '" href="#" ><i class="fas fa-pencil-alt"></i></a>' + '</td>';
                html += '</tr>';
            }
            document.getElementById("result").innerHTML = html;
        });
}*/


function GetItems(){
	const uri = 'https://kadetten-dev.scapp.io/api/order';
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

                for (var x = 0; x < (6 - data[i].tickets.length); x++) {
                    ticketsObj += {
                        quantity: 0,
                        type: "",
                        day: ""
                    };
                }
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
function AssignEditIcons(){
    var editIcons = document.querySelectorAll('.edit-icon');
    for(var i = 0; i < editIcons.length; i++) {
        var editIcon = editIcons[i];
        editIcon.addEventListener("click", function(e){GetItemByEmail(e)});
        
    }
}

function GetItemByEmail(e) {
	var email = e.target.getAttribute("data-email");
	const uri = 'https://kadetten-dev.scapp.io/api/order/'+email;
	
	fetch(uri)
        .then(res => res.json())
        .then(function (data) {
	        
	        var edithtml = '<section id="edit"><button class="delete-button">delete_forever</button><button class="safe-button">Speichern</button><div class="wrapper"><button class="close">close</button><h2>Reservation von Vorname Nachname</h2><h3>Tickets Samstag Erwachsene</h3><input type="number" value="'+data.tickets[0].quantity+'" name="adult-sa" id="adult-sa" required /><h3>Tickets Samstag Kinder im Schulalter</h3><input type="number" value="'+data.tickets[2].quantity+'" name="child-sa" id="child-sa" required /><h3>Tickets Samstag Kinder in Vorkursen</h3><input type="number" value="'+data.tickets[4].quantity+'" name="k-child-sa" id="k-child-sa" required /><h3>Tickets Sonntag Erwachsene</h3><input type="number" value="'+data.tickets[1].quantity+'" name="adult-so" id="adult-so" required /><h3>Tickets Sonntag Kinder im Schulalter</h3><input type="number" value="'+data.tickets[3].quantity+'" name="child-so" id="child-so" required /><h3>Tickets Sonntag Kinder in Vorkursen</h3><input type="number" value="'+data.tickets[5].quantity+'" name="k-child-so" id="k-child-so" required /><h3>Bemerkungen</h3>';
	        if(data.bemerkung == 'Keine')
	        	edithtml += '<textarea name="text" rows="1"></textarea></div></section>';
	        else
	        	edithtml += '<textarea name="text" rows="1">'+data.bemerkung+'</textarea></div></section>';
	        
	        // INSERT EDIT SECTION
	        document.getElementById("editcontainer").innerHTML = edithtml;
		});

}



//     WINDOW: LOAD CALL

window.onload = function () {
	GetItems();
}

