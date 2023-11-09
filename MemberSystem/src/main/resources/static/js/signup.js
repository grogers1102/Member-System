console.log("DOM LOADED!");

(function (){
    window.addEventListener("DOMContentLoaded", () => {
        const signupButton = document.querySelector(".createAccountBox");
        signupButton.addEventListener("click", (event) => {
            event.preventDefault(); 
            submitSignupForm();
        });
    });

    function submitSignupForm() {
        const firstName = document.getElementsByTagName('input').namedItem('firstName');
        const lastName = document.getElementsByTagName('input').namedItem('lastName');
        const email = document.getElementsByTagName('input').namedItem('email');
        const phoneNumber = document.getElementsByTagName('input').namedItem('phoneNumber');
        const address = document.getElementsByTagName('input').namedItem('address');
        const password = document.getElementsByTagName('input').namedItem('password');
        const confirmPassword = document.getElementsByTagName('input').namedItem('confirmPassword');
    
        if (
            firstName.value !== "" &&
            lastName.value !== "" &&
            password.value !== "" &&
            confirmPassword.value !== "" &&
            email.value !== "" &&
            phoneNumber.value !== "" &&
            address.value !== ""
        ) {
            if (password.value !== confirmPassword.value) {
                alert("Password must match!!!");
                return;
            }
    
            const httpRequest = new XMLHttpRequest();
            if (!httpRequest) {
                alert("Giving up :( Cannot create an XMLHTTP instance");
                return false;
            }
    
            const urlNeeded = '/api/v1/auth/signup';
            httpRequest.open('POST', urlNeeded, true);
            httpRequest.setRequestHeader("Content-Type", "application/json");
            httpRequest.onreadystatechange = () => {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        const response = JSON.parse(httpRequest.responseText);
                        const {token, refreshToken, userId} = response;
                        localStorage.setItem('token',token)
                        localStorage.setItem('refreshToken',refreshToken);
                        localStorage.setItem('userId',userId);

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
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                address: address.value,
                phoneNumber: phoneNumber.value,
                password: password.value
            };
    
            httpRequest.send(JSON.stringify(params));
        } else {
            alert("all fields are required!");
        }
    }
    
})();




