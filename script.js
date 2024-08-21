document.getElementById('addProduct').addEventListener('click', addProduct);
document.getElementById('resetTable').addEventListener('click', resetTable);

const conversionRates = {
    'cc': 0.001,
    'ml': 0.001,
    'L': 1,
    'gr': 0.001,
    'kg': 1
};

function addProduct() {
    const name = document.getElementById('productName').value;
    const cost = parseFloat(document.getElementById('productCost').value);
    const volume = parseFloat(document.getElementById('productVolume').value);
    const unit = document.getElementById('productUnit').value;

    if (!name || isNaN(cost) || isNaN(volume)) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    const baseUnit = unit === 'kg' || unit === 'L' ? unit : (unit === 'gr' ? 'kg' : 'L');
    const convertedVolume = volume * conversionRates[unit] / conversionRates[baseUnit];
    const pricePerUnit = cost / convertedVolume;

    const tableBody = document.querySelector('#productsTable tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${name}</td>
        <td>${cost.toFixed(2)}</td>
        <td>${convertedVolume.toFixed(2)}</td>
        <td>${baseUnit}</td>
        <td>${pricePerUnit.toFixed(2)}</td>
        <td><button class="delete-btn" onclick="deleteProduct(this)">Eliminar</button></td>
    `;

    tableBody.appendChild(newRow);
    sortTable();
}

function sortTable() {
    const table = document.querySelector('#productsTable tbody');
    const rows = Array.from(table.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const priceA = parseFloat(a.children[4].textContent);
        const priceB = parseFloat(b.children[4].textContent);
        return priceA - priceB;
    });

    rows.forEach(row => table.appendChild(row));
}

function resetTable() {
    document.querySelector('#productsTable tbody').innerHTML = '';
}

function deleteProduct(button) {
    button.closest('tr').remove();
}
