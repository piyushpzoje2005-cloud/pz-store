// ======================================================
// ADMIN LOGIN
// ======================================================

const ADMIN_LOGIN_API = "/api/admin/login";

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const username =
                document.getElementById("username").value;

            const password =
                document.getElementById("password").value;

            try {

                const response =
                    await fetch(
                        ADMIN_LOGIN_API,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                username: username,

                                password: password
                            })
                        }
                    );

                const result =
                    await response.text();

                if (result === "SUCCESS") {

                    sessionStorage.setItem(
                        "admin",
                        "true"
                    );

                    window.location.href =
                        "/admin.html";

                } else {

                    alert(
                        "Invalid Username or Password"
                    );
                }

            } catch (error) {

                console.error(error);

                alert(
                    "Server error during login."
                );
            }
        }
    );
}