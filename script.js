
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