
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

                for (var x = 0; x < data[i].tickets.length; x++) {
                    if (data[i].tickets[x].day == "Sa") {
                        if (data[i].tickets[x].type == "Erwachsene")
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        else
                            html += '<td>0</td>';
                        if (data[i].tickets[x].type == "Kind")
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        else
                            html += '<td>0</td>';
                        if (data[i].tickets[x].type == "KleinKind")
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        else
                            html += '<td>0</td>';
                    }
                    else {
                        html += '<td>0</td>';
                        html += '<td>0</td>';
                        html += '<td>0</td>';
                    }
                    if (data[i].tickets[x].day == "So") {
                        if (data[i].tickets[x].type == "Erwachsene")
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        else
                            html += '<td>0</td>';
                        if (data[i].tickets[x].type == "Kind")
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        else
                            html += '<td>0</td>';
                        if (data[i].tickets[x].type == "KleinKind")
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        else
                            html += '<td>0</td>';
                    }
                    else {
                        html += '<td>0</td>';
                        html += '<td>0</td>';
                        html += '<td>0</td>';
                    }
                }
                html += '<td>' + data[i].bemerkung + '</td>';
                html += '<td class="edit-icon">' + '<a onclick="modifyItem()" data-email="' + data[i].email + '" href="#" ><i class="fas fa-pencil-alt"></i></a>' + '</td>';
                html += '</tr>';
            }
            document.getElementById("result").innerHTML = html;
        });
}