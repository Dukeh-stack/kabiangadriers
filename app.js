const inputs = document.querySelectorAll('.item-count');
const summary = document.getElementById('order-summary');
const submitButton = document.getElementById('submit-order');

let orders = [];

inputs.forEach(input => {
  input.addEventListener('input', () => {
    const service = input.previousElementSibling.textContent.split(' - ')[0];
    const price = parseInt(input.dataset.price);
    const quantity = parseInt(input.value) || 0;
    const total = price * quantity;

    const existing = orders.find(o => o.service === service);
    if (existing) {
      existing.quantity = quantity;
      existing.total = total;
    } else {
      orders.push({ service, price, quantity, total });
    }

    orders = orders.filter(o => o.quantity > 0);

    let html = '<h3>Order Summary</h3>';
    let grandTotal = 0;
    orders.forEach(order => {
      html += `<p>${order.service}: ${order.quantity} items - KES ${order.total} <button onclick="removeService('${order.service}')">Remove</button></p>`;
      grandTotal += order.total;
    });
    html += `<h4>Total: KES ${grandTotal}</h4>`;

    summary.innerHTML = html;
  });
});

function removeService(serviceName) {
  orders = orders.filter(o => o.service !== serviceName);
  inputs.forEach(input => {
    if (input.previousElementSibling.textContent.includes(serviceName)) {
      input.value = '';
    }
  });
  summary.innerHTML = '';
  inputs.forEach(i => i.dispatchEvent(new Event('input')));
}

submitButton.addEventListener('click', () => {
  const pickupPlace = document.getElementById('pickup-place').value;
  const pickupDate = document.getElementById('pickup-date').value;
  const pickupTime = document.getElementById('pickup-time').value;
  const deliveryDate = document.getElementById('delivery-date').value;
  const deliveryTime = document.getElementById('delivery-time').value;

  const order = {
    services: orders,
    pickupPlace,
    pickupDate,
    pickupTime,
    deliveryDate,
    deliveryTime,
    status: 'Pending'
  };

  alert('Order Placed Successfully! Status: ' + order.status);
  console.log(order);
});
