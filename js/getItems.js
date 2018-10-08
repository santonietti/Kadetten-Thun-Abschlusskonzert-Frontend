
window.onload = function () {
    fetch(uri)
        .then(res => res.json())
        .then(function (data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var row = document.createElement("tr");

                var cellclientLastName = document.createElement("td");
                var cellclientFirstName = document.createElement("td");
                var cellemail = document.createElement("td");
                var cellTelefon = document.createElement("td");
                var cellKindinKadetten = document.createElement("td");
                var cellkadettLastName = document.createElement("td");
                var cellkadettFirstName = document.createElement("td");
                var cellkadettInKader = document.createElement("td");

                var cellTextclientLastName = document.createTextNode(data[i].clientLastName);
                var cellTextclientFirstName = document.createTextNode(data[i].clientFirstName);
                var cellTextemail = document.createTextNode(data[i].email);
                var cellTextTelefon = document.createTextNode("Telefon");
                var cellTextKindinKadetten = document.createTextNode("Kind in Kadetten");
                var cellTextkadettLastName = document.createTextNode(data[i].kadettLastName);
                var cellTextkadettFirstName = document.createTextNode(data[i].kadettFirstName);
                var cellTextkadettInKader = document.createTextNode(data[i].kadettInKader);

                cellclientLastName.appendChild(cellText);
                cellclientFirstName.appendChild(cellText);
                cellemail.appendChild(cellText);
                cellTelefon .appendChild(cellText)
                cellKindinKadetten .appendChild(cellText)
                cellkadettLastName .appendChild(cellText)
                cellkadettFirstName.appendChild(cellText)
                cellkadettInKader.appendChild(cellText)

                for (var x = 0; x < data[i].tickets.length; x++) {
                    if (data[i].tickets[x].day == "Sa") {
                        if (data[i].tickets[x].type == "Erwachsene") {
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        }
                        else if (data[i].tickets[x].type == "Kind") {
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        }
                        else if (data[i].tickets[x].type == "KleinKind") {
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        }
                    }
                    if (data[i].tickets[x].day == "So") {
                        if (data[i].tickets[x].type == "Erwachsene") {
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        }
                        else if (data[i].tickets[x].type == "Kind") {
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        }
                        else if (data[i].tickets[x].type == "KleinKind") {
                            html += '<td>' + data[i].tickets[x].quantity + '</td>';
                        }
                    }
                }
                html += '<td>' + data[i].bemerkung + '</td>';
                html += '</tr>';
            }
            var table = document.getElementsByTagName("table");
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "NEW CELL1";
            $('#results').html(html);
        });
}