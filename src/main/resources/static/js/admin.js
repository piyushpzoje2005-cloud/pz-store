// ======================================================
// ADMIN.JS
// ======================================================

const PRODUCT_API = "/api/products";
const ORDER_API = "/api/orders";

// ----------------------
// Security Check
// ----------------------

if (sessionStorage.getItem("admin") !== "true") {
    window.location.href = "/admin-login.html";
}


// ----------------------
// Upload Image
// ----------------------

async function uploadImage(file) {

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${PRODUCT_API}/upload`, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        throw new Error("Image upload failed");
    }

    return await response.text();
}


// ----------------------
// Add Product
// ----------------------

const productForm = document.getElementById("productForm");

if (productForm) {

    productForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        try {

            const imageFile =
                document.getElementById("image").files[0];

            if (!imageFile) {
                alert("Please select an image.");
                return;
            }

            const imageUrl = await uploadImage(imageFile);

            const product = {

                name: document.getElementById("name").value,

                description:
                document.getElementById("description").value,

                price:
                    parseFloat(
                        document.getElementById("price").value
                    ),

                stock:
                    parseInt(
                        document.getElementById("stock").value
                    ),

                imageUrl: imageUrl
            };

            const response = await fetch(PRODUCT_API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(product)
            });

            if (response.ok) {

                alert("Product Added Successfully!");

                productForm.reset();

                loadProducts();

            } else {

                alert("Failed to Add Product.");
            }

        } catch (error) {

            console.error(error);

            alert("Server error while adding product.");
        }
    });
}


// ----------------------
// Load Products
// ----------------------

async function loadProducts() {

    const container =
        document.getElementById("productsContainer");

    if (!container) return;

    try {

        const response = await fetch(PRODUCT_API);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

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

                    <h3>${product.name}</h3>

                    <p>${product.description}</p>

                    <h2>₹${product.price}</h2>

                    <p>Stock: ${product.stock}</p>

                    <button
                        onclick="editProduct(${product.id})">
                        Edit
                    </button>

                    <button
                        onclick="deleteProduct(${product.id})"
                        style="background:red;margin-top:8px;">
                        Delete
                    </button>

                </div>
            `;
        });

    } catch (error) {

        console.error(error);

        container.innerHTML =
            "<p>Failed to load products.</p>";
    }
}


// ----------------------
// Delete Product
// ----------------------

async function deleteProduct(id) {

    if (!confirm("Delete this product?")) {
        return;
    }

    try {

        const response = await fetch(
            `${PRODUCT_API}/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        alert("Product deleted successfully.");

        loadProducts();

    } catch (error) {

        console.error(error);

        alert("Failed to delete product.");
    }
}


// ----------------------
// Edit Product
// ----------------------

async function editProduct(id) {

    try {

        const response =
            await fetch(PRODUCT_API);

        const products =
            await response.json();

        const product =
            products.find(p => p.id === id);

        if (!product) {
            alert("Product not found.");
            return;
        }

        document.getElementById("editId").value =
            product.id;

        document.getElementById("editName").value =
            product.name;

        document.getElementById("editDescription").value =
            product.description;

        document.getElementById("editPrice").value =
            product.price;

        document.getElementById("editStock").value =
            product.stock;

        document.getElementById("editModal").style.display =
            "flex";

    } catch (error) {

        console.error(error);

        alert("Failed to load product.");
    }
}


// ----------------------
// Close Modal
// ----------------------

function closeModal() {

    document.getElementById("editModal").style.display =
        "none";
}


// ----------------------
// Save Product
// ----------------------

async function saveProduct() {

    const id =
        document.getElementById("editId").value;

    try {

        const response = await fetch(
            `${PRODUCT_API}/${id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name:
                    document.getElementById("editName").value,

                    description:
                    document.getElementById(
                        "editDescription"
                    ).value,

                    price:
                        Number(
                            document.getElementById(
                                "editPrice"
                            ).value
                        ),

                    stock:
                        Number(
                            document.getElementById(
                                "editStock"
                            ).value
                        ),

                    imageUrl:
                        document.getElementById(
                            "editImageUrl"
                        )?.value || ""
                })
            }
        );

        if (!response.ok) {
            throw new Error("Update failed");
        }

        alert("Product Updated!");

        closeModal();

        loadProducts();

    } catch (error) {

        console.error(error);

        alert("Failed to update product.");
    }
}


// ======================================================
// LOAD ORDERS
// ======================================================

async function loadOrders() {

    const container = document.getElementById("ordersContainer");

    if (!container) return;

    try {

        const response = await fetch(ORDER_API);

        if (!response.ok) {
            throw new Error("Failed to load orders");
        }

        const orders = await response.json();

        container.innerHTML = "";

        if (orders.length === 0) {
            container.innerHTML = "<p>No orders available.</p>";
            return;
        }

        orders.forEach(order => {

            const customer = order.customer || {};

            container.innerHTML += `
                <div class="product-card">

                    <h3>Order #${order.id}</h3>

                    <p><strong>Name:</strong> ${customer.fullName || "-"}</p>

                    <p><strong>Phone:</strong> ${customer.phone || "-"}</p>

                    <p><strong>Address:</strong> ${customer.address || "-"}</p>

                    <p><strong>City:</strong> ${customer.city || "-"}</p>

                    <p><strong>State:</strong> ${customer.state || "-"}</p>

                    <p><strong>PIN Code:</strong> ${customer.pincode || "-"}</p>

                    <p><strong>Total:</strong> ₹${order.totalAmount}</p>

                    <p><strong>Payment:</strong> ${order.paymentMethod || "COD"}</p>

                    <p><strong>Status:</strong> ${order.orderStatus}</p>

                    <button onclick="changeStatus(${order.id}, 'Shipped')">
                        Mark Shipped
                    </button>

                    <button onclick="changeStatus(${order.id}, 'Delivered')">
                        Mark Delivered
                    </button>

                </div>
            `;
        });

    } catch (error) {

        console.error(error);

        container.innerHTML = "<p>Failed to load orders.</p>";
    }
}

// ----------------------
// Change Order Status
// ----------------------

async function changeStatus(id, status) {

    try {

        const response =
            await fetch(
                `${ORDER_API}/${id}/${status}`,
                {
                    method: "PUT"
                }
            );

        if (!response.ok) {
            throw new Error("Status update failed");
        }

        loadOrders();

    } catch (error) {

        console.error(error);

        alert("Failed to update order status.");
    }
}


// ----------------------
// Initial Load
// ----------------------

document.addEventListener("DOMContentLoaded", function () {

    loadProducts();

    loadOrders();

});