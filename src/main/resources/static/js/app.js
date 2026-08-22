const API_URL = "http://localhost:8080/api/products";

// Home page products load
async function loadProducts() {

    const container = document.getElementById("productContainer");

    if (!container) return;

    try {
        const response = await fetch(API_URL);
        const products = await response.json();

        container.innerHTML = "";

        products.forEach(product => {
            container.innerHTML += `
                <div class="product-card">
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <h2>₹${product.price}</h2>

                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.imageUrl}')">
                        Add to Cart
                    </button>
                </div>
            `;
        });

    } catch (e) {
        container.innerHTML = "<p>Products loading failed.</p>";
    }
}

// Add product to cart
function addToCart(id, name, price, imageUrl) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id,
            name,
            price,
            imageUrl,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart.");
}

loadProducts();