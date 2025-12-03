function generateTable() {
    const rows = parseInt(document.getElementById("rows").value);
    const columns = parseInt(document.getElementById("columns").value);

    if (isNaN(rows) || rows < 1 || isNaN(columns) || columns < 1) {
        alert("Please enter valid numbers for rows and columns.");
        return;
    }

    let tableHTML = "<table>";
    for (let i = 1; i <= rows; i++) {
        tableHTML += "<tr>";
        for (let j = 1; j <= columns; j++) {
            tableHTML += `<td>${i * j}</td>`;
        }
        tableHTML += "</tr>";
    }
    tableHTML += "</table>";

    document.getElementById("tableContainer").innerHTML = tableHTML;
}