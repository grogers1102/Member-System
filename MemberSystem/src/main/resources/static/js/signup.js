document.addEventListener('DOMContentLoaded', function () {
    addSignupEventListener();
    addPasswordIconEventListener();
    addConfirmPasswordIconEventListener();
});

function addSignupEventListener() {
    const signupButton = document.querySelector(".createAccountBox");
    signupButton.addEventListener("click", (event) => {
        signup()
    });
}

function addPasswordIconEventListener(){
    const toggleIcon = document.getElementById('togglePassword');

    toggleIcon.addEventListener('click', function() {
        switchPasswordIcon(toggleIcon);
    });
}

function addConfirmPasswordIconEventListener(){
    const toggleIcon = document.getElementById('toggleConfirmPassword');

    toggleIcon.addEventListener('click', function() {
        switchConfirmPasswordIcon(toggleIcon);
    });
}

function getInputValue(inputName) {
    return document.getElementById(inputName).value;
}

function isFieldEmpty(value) {
    return value.trim() === '';
}

function signup() {

    const [firstName, lastName, email, phoneNumber, address, password, confirmPassword] = [
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'address',
        'password',
        'confirmPassword'
    ].map(getInputValue);

    if (firstName === '' || lastName === '' || email === '' || phoneNumber === '' || address === '' || password === '' || confirmPassword === '') {
        alert("Please enter all fields");
    } else if (password !== confirmPassword) {
        alert("Passwords don't match");
    } else {
        
        const userParams = {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            password
        };
        
        makeSignupRequest(userParams);
    }
}
    
async function makeSignupRequest(userParams) {
    const urlNeeded = 'api/v1/auth/signup';

    try {
        const response = await fetch(urlNeeded, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userParams),
        });

        if (response.ok) {
            const userObj = await response.json();

            const { token, refreshToken, userId } = userObj;

            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', userId);

            window.location.href = '/portalPages/portal.html';
        } else {
            if (response.status === 400) {
                throw new Error('Bad request: Please check your inputs.');
            } else if (response.status === 401) {
                throw new Error('Unauthorized: Invalid credentials.');
                window.localStorage.href='../error/401.html';
            } else {
                throw new Error('There was a problem with the request.');
            }
        }
    } catch (error) {
        alert(error.message);
    }
}


function switchPasswordIcon(toggleIcon){
    
    const passwordInput = document.getElementById('password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    }


}

function switchConfirmPasswordIcon(toggleIcon){
    
    const passwordInput = document.getElementById('confirmPassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    }


}



