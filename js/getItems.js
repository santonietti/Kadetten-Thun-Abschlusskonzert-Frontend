
window.onload = function () {
    fetch(uri)
        .then(res => res.json())
        .then(function (data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var html = '';
                var htmlHeader = '<th>Vorname</th><th>Nachname</th><th>E-Mail</th><th>Telefon</th><th>Kind in Kadetten</th><th>Vorname Kind</th><th>Nachname Kind</th><th>Kind in Kader</th>';
                html += '<tr >';
                html += '<td>' + data[i].clientLastName + '</td>';
                html += '<td>' + data[i].clientFirstName + '</td>';
                html += '<td>' + data[i].email + '</td>';
                html += '<td>Telefon</td>';
                html += '<td>Kind in Kadetten</td>';
                html += '<td>' + data[i].kadettLastName + '</td>';
                html += '<td>' + data[i].kadettFirstName + '</td>';
                html += '<td>' + data[i].kadettInKader + '</td>';

                for (var x = 0; x < data[i].tickets.length; x++) {
                    if (data[i].tickets[x].day == "Sa") {
                        if (data[i].tickets[x].type == "Erwachsene") {
                            htmlHeader += '<th>Tickets Sa Erwachsene</th>';
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        }
                        else if (data[i].tickets[x].type == "Kind") {
                            htmlHeader += '<th>Tickets Sa Kind</th>';
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        }
                        else if (data[i].tickets[x].type == "KleinKind") {
                            htmlHeader += '<th>Tickets Sa KleinKind</th>';
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        }
                    }
                    else if (data[i].tickets[x].day == "So") {
                        if (data[i].tickets[x].type == "Erwachsene") {
                            htmlHeader += '<th>Tickets So Erwachsene</th>';
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        }
                        else if (data[i].tickets[x].type == "Kind") {
                            htmlHeader += '<th>Tickets So Kind</th>';
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        }
                        else if (data[i].tickets[x].type == "KleinKind") {
                            htmlHeader += '<th>Tickets So KleinKind</th>';
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        }
                    }
                }
                htmlHeader += '<th>Bemerkung</th>';                
                html += '<td>' + data[i].bemerkung + '</td>';
                html += '</tr>';
            }
            document.getElementById("result").innerHTML = html;
            document.getElementById("resultTicket").innerHTML = htmlHeader;
        });
}