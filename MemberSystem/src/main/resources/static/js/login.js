console.log("DOM LOADED!");

(function (){
    const login = null;
    window.addEventListener("DOMContentLoaded", () => {
        const loginButton = document.querySelector(".loginBox");
        loginButton.addEventListener("click", (event) => {
            event.preventDefault(); 
            submitLoginForm();
        });
    });
    

    function submitLoginForm() {

        const email = document.getElementsByTagName('input').namedItem('email');
        const password = document.getElementsByTagName('input').namedItem('password');
    
        if (
            email.value !== "" &&
            password.value !== "" 
        ) {
            const httpRequest = new XMLHttpRequest();
            if (!httpRequest) {
                alert("Giving up :( Cannot create an XMLHTTP instance");
                return false;
            }
    
            const urlNeeded = '/api/v1/auth/login';
            httpRequest.open('POST', urlNeeded, true);
            httpRequest.setRequestHeader("Content-Type", "application/json");
            httpRequest.onreadystatechange = () => {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    // Everything is good, the response was received.
                    // Process the server response here.
                    // 1. clear all field values
                    // 2. route to dashboard on success
                    // 3. else show alert error
                    if (httpRequest.status === 200) {
                        const response = JSON.parse(httpRequest.responseText);
                        const {token, refreshToken} = response;
                        localStorage.setItem('token',token)
                        localStorage.setItem('refreshToken',refreshToken);

                        window.location.href='/portalPages/portal.html'
                    } else {
                        alert("There was a problem with the request.");
                    }
                } else {
                    // Not ready yet.
                }
            };
    
            // Send the proper header information along with the request
            const params = {
                email: email.value,
                password: password.value
            };
    
            httpRequest.send(JSON.stringify(params));
        } else {
            alert("all fields are required!");
        }
    }
    
})();




