// ======================================================
// APP.JS
// ======================================================

const PRODUCT_API = "/api/products";


// ======================================================
// LOAD PRODUCTS
// ======================================================

async function loadProducts() {

    const container =
        document.getElementById("productContainer");

    if (!container) {
        return;
    }

    try {

        const response =
            await fetch(PRODUCT_API);

        if (!response.ok) {

            throw new Error(
                "Product API request failed"
            );
        }

        const products =
            await response.json();

        container.innerHTML = "";

        if (products.length === 0) {

            container.innerHTML =
                "<p>No products available.</p>";

            return;
        }

        products.forEach(product => {

            container.innerHTML += `

                <div class="product-card">

                    <img
                        src="${product.imageUrl}"
                        alt="${product.name}"
                    >

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.description}
                    </p>

                    <h2>
                        ₹${product.price}
                    </h2>

                    <p>
                        Stock: ${product.stock}
                    </p>

                    <button
                        onclick="addToCart(
                            ${product.id},
                            '${escapeQuotes(product.name)}',
                            ${product.price},
                            '${escapeQuotes(product.imageUrl)}'
                        )"
                    >
                        Add to Cart
                    </button>

                </div>

            `;
        });

    } catch (error) {

        console.error(
            "Product loading error:",
            error
        );

        container.innerHTML =
            "<p>Products loading failed.</p>";
    }
}


// ======================================================
// ESCAPE QUOTES
// ======================================================

function escapeQuotes(value) {

    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}


// ======================================================
// ADD TO CART
// ======================================================

function addToCart(
    id,
    name,
    price,
    imageUrl
) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const existing =
        cart.find(
            item => item.id === id
        );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: id,

            name: name,

            price: price,

            imageUrl: imageUrl,

            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(
        "Product added to cart."
    );
}


// ======================================================
// INITIAL LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProducts();

    }
);