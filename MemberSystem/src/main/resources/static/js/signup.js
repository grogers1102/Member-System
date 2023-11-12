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

    const [firstName, lastName, email, phoneNumber, address, password, confirmPassword] = [
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'address',
        'password',
        'confirmPassword'
    ].map(getInputValue);

    const fields = [firstName, lastName, email, phoneNumber, address, password, confirmPassword];

    if (fields.some(isFieldEmpty)) {
        alert("Please enter all fields");
    } else if (password !== confirmPassword) {
        alert("Passwords don't match");
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
