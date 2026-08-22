// ======================================================
// CART.JS
// ======================================================

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];
}


// ======================================================
// DISPLAY CART
// ======================================================

function displayCart() {

    const container =
        document.getElementById(
            "cartContainer"
        );

    const totalPrice =
        document.getElementById(
            "totalPrice"
        );

    if (!container || !totalPrice) {
        return;
    }

    const cart = getCart();

    if (cart.length === 0) {

        container.innerHTML =
            "<h3>Your cart is empty.</h3>";

        totalPrice.innerHTML = "";

        return;
    }

    container.innerHTML = "";

    let total = 0;

    cart.forEach(
        (item, index) => {

            total +=
                item.price *
                item.quantity;

            container.innerHTML += `

                <div class="product-card">

                    <img
                        src="${item.imageUrl}"
                        alt="${item.name}"
                    >

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price}
                    </p>

                    <p>
                        Quantity:
                        ${item.quantity}
                    </p>

                    <button
                        onclick="increase(${index})">
                        +
                    </button>

                    <button
                        onclick="decrease(${index})">
                        -
                    </button>

                    <button
                        onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>
            `;
        }
    );

    totalPrice.innerHTML =
        `Total: ₹${total}`;
}


// ======================================================
// INCREASE
// ======================================================

function increase(index) {

    const cart = getCart();

    cart[index].quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// ======================================================
// DECREASE
// ======================================================

function decrease(index) {

    const cart = getCart();

    if (cart[index].quantity > 1) {

        cart[index].quantity--;
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// ======================================================
// REMOVE
// ======================================================

function removeItem(index) {

    const cart = getCart();

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// ======================================================
// INITIAL LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

    }
);