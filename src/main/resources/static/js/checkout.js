// ======================================================
// CHECKOUT.JS
// ======================================================

const ORDER_API = "/api/orders";


// ======================================================
// CALCULATE TOTAL
// ======================================================

function calculateOrderTotal() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    let total = 0;

    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;

    });

    return total;
}


// ======================================================
// SHOW TOTAL
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const orderTotal =
            document.getElementById(
                "orderTotal"
            );

        if (orderTotal) {

            orderTotal.innerText =
                `Total: ₹${calculateOrderTotal()}`;
        }

    }
);


// ======================================================
// CHECKOUT FORM
// ======================================================

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const total =
                calculateOrderTotal();

            const orderData = {

                fullName:
                document.getElementById(
                    "fullName"
                ).value,

                phone:
                document.getElementById(
                    "phone"
                ).value,

                address:
                document.getElementById(
                    "address"
                ).value,

                city:
                document.getElementById(
                    "city"
                ).value,

                state:
                document.getElementById(
                    "state"
                ).value,

                pincode:
                document.getElementById(
                    "pincode"
                ).value,

                totalAmount: total
            };

            try {

                const response =
                    await fetch(
                        ORDER_API,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    orderData
                                )
                        }
                    );

                if (response.ok) {

                    alert(
                        "Order placed successfully!"
                    );

                    localStorage.removeItem(
                        "cart"
                    );

                    window.location.href =
                        "/index.html";

                } else {

                    alert(
                        "Failed to place order."
                    );
                }

            } catch (error) {

                console.error(error);

                alert(
                    "Server error."
                );
            }
        }
    );
}