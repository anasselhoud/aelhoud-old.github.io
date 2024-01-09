document.addEventListener('DOMContentLoaded', function () {
    // Your code here
    loadGameData();

    // Save changes on page unload
    document.getElementById('saveButton').addEventListener('click', function () {
        saveGameData();
    });
});

function enableTableEditing() {
    var cells = document.querySelectorAll('.responsive-table__body__text');

    cells.forEach(function (cell) {
        cell.addEventListener('click', function (event) {
            enableCellEditing(event.target);
        });
    });


}

function enableCellEditing(cell) {
    // Disable editing for all cells
 

    // Enable editing for the clicked cell
    cell.contentEditable = 'true';
   
}


enableTableEditing();

function addRow() {
    var tableBody = document.querySelector('.responsive-table__body');

    var newRow = document.createElement('tr');
    newRow.className = 'responsive-table__row';
    newRow.innerHTML = `
        <td class="responsive-table__body__text responsive-table__body__text--name" contenteditable="true" >Game Name</td>

        <td class="responsive-table__body__text responsive-table__body__text--ssouf" contenteditable="true">-</td>
        <td class="responsive-table__body__text responsive-table__body__text--zed" contenteditable="true">-</td>
        <td class="responsive-table__body__text responsive-table__body__text--dib" contenteditable="true">-</td>
        <td class="responsive-table__body__text responsive-table__body__text--chamha" contenteditable="true">-</td>
        <td class="responsive-table__body__text responsive-table__body__text--taiha" contenteditable="true">-</td>
        <td class="responsive-table__body__text responsive-table__body__text--nasio" contenteditable="true">-</td>
        <td class="responsive-table__body__text responsive-table__body__text--status" contenteditable="true">-</td>
    `;

    tableBody.appendChild(newRow);
    enableTableEditing();
}



function authenticate() {
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');

    var username = usernameInput.value;
    var password = passwordInput.value;

    if (username === 'admin' && password === 'admin') {
        enableTableEditing();
        closeOverlay();
    } else {
        alert('Invalid credentials. Please try again.');
    }
}


function loadGameData() {
    // Check local storage for changes

    // Fetch data from the server if no local changes
    fetch('/api/games')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Data:', data);
            updateTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}



// Save changes to the server
function saveGameData() {
    var rows = document.querySelectorAll('.responsive-table__row');
    var updatedData = [];

    rows.forEach(function (row) {
        var rowData = {
            name: getElementTextContent(row, '.responsive-table__body__text--name'),
            ssouf: getElementTextContent(row, '.responsive-table__body__text--ssouf'),
            zed: getElementTextContent(row, '.responsive-table__body__text--zed'),
            dib: getElementTextContent(row, '.responsive-table__body__text--dib'),
            chamha: getElementTextContent(row, '.responsive-table__body__text--chamha'),
            taiha: getElementTextContent(row, '.responsive-table__body__text--taiha'),
            nasio: getElementTextContent(row, '.responsive-table__body__text--nasio'),
            status: getElementTextContent(row, '.responsive-table__body__text--status'),
        };

        updatedData.push(rowData);
    });

    // Save changes to local storage
    localStorage.setItem('updatedData', JSON.stringify(updatedData));

    fetch('/api/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        })
        .catch(error => console.error('Error saving data:', error));

    console.log(updatedData)
}


function getElementTextContent(parent, selector) {
    var element = parent.querySelector(selector);
    return element ? element.textContent.trim() : '';
}



// Update the table with data from the server
function updateTable(data) {
    var rows = document.querySelectorAll('.responsive-table__row');
    console.log("data in update table", data);

    // Calculate the number of rows to add or remove
    var numRowsToAdd = data.length - rows.length;

    // Add new rows if needed
    if (numRowsToAdd > 0) {
        for (var i = 0; i < numRowsToAdd; i++) {
            addRow(); // You should implement the logic for adding a new row
        }
    }

    // Update existing rows
    rows.forEach(function (row, index) {
        var cells = row.querySelectorAll('.responsive-table__body__text');

        // Skip the first cell in each row as it is "Game Name" and not present in the data
        cells.forEach(function (cell, columnIndex) {
            if (columnIndex > 0) {
                var propertyName = cell.classList[1].split('--')[1]; // Extract property name from class

                if (data[index] && data[index][propertyName] !== undefined) {
                    cell.textContent = data[index][propertyName];
                } else {
                    console.error('Invalid data structure or missing property:', propertyName);
                }
            }
        });
    });

    // You can add logic to remove excess rows if needed
}





function openOverlay() {
    var overlay = document.getElementById('overlay');
    var modal = document.getElementById('modal');

    overlay.style.display = 'block';
    modal.style.display = 'block';
}

function closeOverlay() {
    var overlay = document.getElementById('overlay');
    var modal = document.getElementById('modal');

    overlay.style.display = 'none';
    modal.style.display = 'none';
}



