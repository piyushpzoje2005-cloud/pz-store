const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
    total += item.price * item.quantity;
});

document.getElementById("orderTotal").innerText = `Total: ₹${total}`;

document.getElementById("checkoutForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const orderData = {
        fullName: document.getElementById("fullName").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        pincode: document.getElementById("pincode").value,
        totalAmount: total
    };

    try {

        const response = await fetch("http://localhost:8080/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {

            alert("Order placed successfully!");

            localStorage.removeItem("cart");

            window.location.href = "/index.html";

        } else {

            alert("Failed to place order.");

        }

    } catch (error) {

        console.error(error);

        alert("Server error.");

    }

});