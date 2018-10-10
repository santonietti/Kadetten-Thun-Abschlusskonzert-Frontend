const uri = 'https://kadetten-dev.scapp.io/api/order';
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
}