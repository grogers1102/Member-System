document.addEventListener('DOMContentLoaded', function () {
    addSignupEvenListener();
});

function addSignupEvenListener() {
    const signupButton = document.querySelector(".createAccountBox");
    signupButton.addEventListener("click", (event) => {
        signup()
    });
}

function signup() {

    const urlNeeded = 'api/v1/auth/signup';

    const firstName = document.getElementsByTagName('input').namedItem('firstName');
    const lastName = document.getElementsByTagName('input').namedItem('lastName');
    const email = document.getElementsByTagName('input').namedItem('email');
    const phoneNumber = document.getElementsByTagName('input').namedItem('phoneNumber');
    const address = document.getElementsByTagName('input').namedItem('address');
    const password = document.getElementsByTagName('input').namedItem('password');
    const confirmPassword = document.getElementsByTagName('input').namedItem('confirmPassword');

    if (
        firstName.value === "" ||
        lastName.value === "" ||
        password.value === "" ||
        confirmPassword.value === "" ||
        email.value === "" ||
        phoneNumber.value === "" ||
        address.value === "" 
    ){
        alert("Please Enter all fields");
        return;
    }

    if(password.value != confirmPassword.value){
        alert("Passwords don't match")
        return;
    }

    const params = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
        password: password.value
    };

    fetch(urlNeeded, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('There was a problem with the request.');
        }
    })
    .then(userObj => {

        const { token, refreshToken, userId } = userObj;
        
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId);

        window.location.href = '/portalPages/portal.html';
    })
    .catch(error => {
        alert(error.message);
    });
}
