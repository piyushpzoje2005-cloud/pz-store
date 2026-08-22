document.getElementById("loginForm").addEventListener("submit", async(e)=>{

    e.preventDefault();

    const response=await fetch("http://localhost:8080/api/admin/login",{

        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({

            username:document.getElementById("username").value,
            password:document.getElementById("password").value
        })
    });

    const result=await response.text();

    if(result==="SUCCESS"){

        sessionStorage.setItem("admin","true");

        window.location.href="/admin.html";
    }
    else{

        alert("Invalid Username or Password");
    }
});