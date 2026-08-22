let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cartContainer");
const totalPrice = document.getElementById("totalPrice");

function displayCart() {

    if (cart.length === 0) {

        container.innerHTML = "<h3>Your cart is empty.</h3>";
        totalPrice.innerHTML = "";

        return;
    }

    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="product-card">

                <img src="${item.imageUrl}" alt="${item.name}">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <p>Quantity: ${item.quantity}</p>

                <button onclick="increase(${index})">+</button>

                <button onclick="decrease(${index})">-</button>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    totalPrice.innerHTML = `Total: ₹${total}`;

    localStorage.setItem("cart", JSON.stringify(cart));
}

function increase(index) {

    cart[index].quantity++;

    displayCart();
}

function decrease(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    displayCart();
}

function removeItem(index) {

    cart.splice(index, 1);

    displayCart();
}

displayCart();