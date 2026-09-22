
// 1. Global State & DOM Element Selectors
let orders = [];

const itemNameInput = document.getElementById('itemName');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const addBtn = document.getElementById('addBtn');
const ordersTable = document.getElementById('ordersTable');
const grandTotalSpan = document.getElementById('grandTotal');


// 2. Form Submission Event Listener

addBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const nameValue = itemNameInput.value.trim();
    const quantityValue = parseFloat(quantityInput.value);
    const priceValue = parseFloat(priceInput.value);

    // Validation Check: ensure all inputs are valid
    if (!nameValue || isNaN(quantityValue) || isNaN(priceValue)) {
        alert('Please fill in all fields correctly!');
        return;
    }

    // Create new order object
    const newOrder = {
        name: nameValue,
        quantity: quantityValue,
        price: priceValue
    };

    orders.push(newOrder);

    // Re-render UI table & recalculate totals
    renderOrders();

    // Reset input fields
    itemNameInput.value = '';
    quantityInput.value = '';
    priceInput.value = '';
});


// 3. UI Rendering & Total Calculation

function renderOrders() {
    ordersTable.innerHTML = '';
    let totalSum = 0;

    orders.forEach((order, index) => {
        const tr = document.createElement('tr');

        // 1. Item Name
        const td1 = document.createElement('td');
        td1.innerText = order.name;
        tr.appendChild(td1);

        // 2. Quantity
        const td2 = document.createElement('td');
        td2.innerText = order.quantity;
        tr.appendChild(td2);

        // 3. Unit Price
        const td3 = document.createElement('td');
        td3.innerText = `${order.price.toFixed(2)}`;
        tr.appendChild(td3);

        // 4. Subtotal Calculation (Quantity x Price)
        const lineTotal = order.quantity * order.price;
        totalSum += lineTotal;

        const td4 = document.createElement('td');
        td4.innerText = `${lineTotal.toFixed(2)}`;
        tr.appendChild(td4);

        // 5. Delete Action Button
        const td5 = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerText = 'Delete';

        deleteBtn.addEventListener('click', function () {
            deleteOrder(index);
        });

        td5.appendChild(deleteBtn);
        tr.appendChild(td5);

        ordersTable.appendChild(tr);
    });

    // Update Grand Total Display
    grandTotalSpan.innerText = totalSum.toFixed(2);
}

// 4. Order Deletion State Handler
function deleteOrder(index) {
    orders.splice(index, 1);
    renderOrders();
}