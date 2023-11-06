console.log("DOM LOADED!");

(function (){
    const signup = null;
    window.addEventListener("DOMContentLoaded", ()=>{
        console.log("DOM LOADED!", signup)
        const createAccountButton = document.getElementsByClassName("createAccountBox");
        console.log("createAccountButton", createAccountButton);
        createAccountButton.item(0).addEventListener("click", ()=>{
            console.log("CLICKED!", createAccountButton)
            submitSignupForm();
        })
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
                    // Everything is good, the response was received.
                    // Process the server response here.
                    // 1. clear all field values
                    // 2. route to dashboard on success
                    // 3. else show alert error
                    if (httpRequest.status === 200) {
                        alert(httpRequest.responseText);
                        window.location.href='/login.html'
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




