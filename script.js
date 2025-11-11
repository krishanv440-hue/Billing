let subtotal = 0;
let itemCount = 0;

// show date
document.getElementById("invoiceDate").innerText =
  new Date().toLocaleDateString("en-GB");

// add item
document.getElementById("addItem").addEventListener("click", () => {
  const name = document.getElementById("itemName").value.trim();
  const qty = parseFloat(document.getElementById("itemQty").value);
  const price = parseFloat(document.getElementById("itemPrice").value);
  const tax = parseFloat(document.getElementById("itemTax").value);

  if (!name || isNaN(qty) || isNaN(price)) {
    alert("Please fill all item details correctly!");
    return;
  }

  const amount = qty * price;
  subtotal += amount;
  itemCount++;

  const tbody = document.querySelector("#billTable tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${itemCount}</td>
    <td>${name}</td>
    <td>${qty}</td>
    <td>${price.toFixed(2)}</td>
    <td>${tax}%</td>
    <td>${amount.toFixed(2)}</td>
  `;
  tbody.appendChild(row);

  updateTotals();

  document.getElementById("itemName").value = "";
  document.getElementById("itemQty").value = "";
  document.getElementById("itemPrice").value = "";
});

// update totals
function updateTotals() {
  const sgst = subtotal * 0.09;
  const cgst = subtotal * 0.09;
  const grand = subtotal + sgst + cgst;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("sgst").innerText = sgst.toFixed(2);
  document.getElementById("cgst").innerText = cgst.toFixed(2);
  document.getElementById("grandTotal").innerText = grand.toFixed(2);
}

// new bill
document.getElementById("reset").addEventListener("click", () => {
  if (confirm("Start a new bill?")) {
    document.querySelector("#billTable tbody").innerHTML = "";
    subtotal = 0;
    itemCount = 0;
    updateTotals();
    document.getElementById("custName").value = "";
    document.getElementById("custPhone").value = "";
    document.getElementById("custAddress").value = "";
  }
});

// print invoice
document.getElementById("print").addEventListener("click", () => {
  const mode = document.getElementById("paymentMode").value;
  alert(`Invoice ready for printing.\nPayment Mode: ${mode}`);
  window.print();
});

// send WhatsApp message
document.getElementById("sendMsg").addEventListener("click", () => {
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const grand = document.getElementById("grandTotal").innerText;
  const mode = document.getElementById("paymentMode").value;

  if (!phone) {
    alert("Please enter customer's phone number!");
    return;
  }

  const msg = `Hello ${name || 'Customer'},%0AThank you for shopping at Sri Maruthi Agency.%0A` +
              `Your total bill is ₹${grand}.%0APayment Mode: ${mode}.%0A` +
              `We appreciate your business!`;

  window.open(`https://wa.me/91${phone}?text=${msg}`, '_blank');
});
