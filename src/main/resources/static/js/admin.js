// ----------------------
// Security Check
// ----------------------
if (sessionStorage.getItem("admin") !== "true") {
    window.location.href = "/admin-login.html";
}

// ----------------------
// API URLs
// ----------------------
const ORDER_API = "http://localhost:8080/api/orders";
const PRODUCT_API = "http://localhost:8080/api/products";

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

    return await response.text();
}

// ----------------------
// Add Product
// ----------------------
document.getElementById("productForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const imageFile = document.getElementById("image").files[0];

    if (!imageFile) {
        alert("Please select an image.");
        return;
    }

    const imageUrl = await uploadImage(imageFile);

    const product = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        stock: parseInt(document.getElementById("stock").value),
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
        document.getElementById("productForm").reset();
        loadProducts();
    } else {
        alert("Failed to Add Product.");
    }
});

// ----------------------
// Load Products
// ----------------------
async function loadProducts() {

    const response = await fetch(PRODUCT_API);
    const products = await response.json();

    const container = document.getElementById("productsContainer");
    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
            <div class="product-card">

                <img src="${product.imageUrl}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <h2>₹${product.price}</h2>

                <p>Stock: ${product.stock}</p>

                <button onclick="editProduct(${product.id})">
                    Edit
                </button>

                <button onclick="deleteProduct(${product.id})"
                        style="background:red;margin-top:8px;">
                    Delete
                </button>

            </div>
        `;
    });
}

// ----------------------
// Delete Product
// ----------------------
async function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    await fetch(`${PRODUCT_API}/${id}`, {
        method: "DELETE"
    });

    loadProducts();
}

// ----------------------
// Edit Product (Next Step)
// ----------------------
async function editProduct(id){

    const response = await fetch(`${PRODUCT_API}`);

    const products = await response.json();

    const product = products.find(p => p.id === id);

    if(!product) return;

    document.getElementById("editId").value = product.id;
    document.getElementById("editName").value = product.name;
    document.getElementById("editDescription").value = product.description;
    document.getElementById("editPrice").value = product.price;
    document.getElementById("editStock").value = product.stock;

    document.getElementById("editModal").style.display = "flex";
}
function closeModal(){

    document.getElementById("editModal").style.display = "none";
}
async function saveProduct(){

    const id = document.getElementById("editId").value;

    const response = await fetch(`${PRODUCT_API}/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name:document.getElementById("editName").value,
            description:document.getElementById("editDescription").value,
            price:Number(document.getElementById("editPrice").value),
            stock:Number(document.getElementById("editStock").value),
            imageUrl:""
        })
    });

    if(response.ok){

        alert("Product Updated!");

        closeModal();

        loadProducts();
    }
}

// ----------------------
// Load Orders
// ----------------------
async function loadOrders() {

    const response = await fetch(ORDER_API);
    const orders = await response.json();

    const container = document.getElementById("ordersContainer");
    container.innerHTML = "";

    orders.forEach(order => {

        container.innerHTML += `
            <div class="product-card">

                <h3>Order #${order.id}</h3>

                <p><strong>Name:</strong> ${order.customer.fullName}</p>

                <p><strong>Phone:</strong> ${order.customer.phone}</p>

                <p><strong>City:</strong> ${order.customer.city}</p>

                <p><strong>Total:</strong> ₹${order.totalAmount}</p>

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
}

// ----------------------
// Change Order Status
// ----------------------
async function changeStatus(id, status) {

    await fetch(`${ORDER_API}/${id}/${status}`, {
        method: "PUT"
    });

    loadOrders();
}

// ----------------------
// Initial Load
// ----------------------
loadProducts();
loadOrders();