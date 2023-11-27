let popupFailed = document.querySelector('.save-popup-failed');

document.addEventListener('DOMContentLoaded', function () {
    addLoginEvenListener();
});

function addLoginEvenListener() {
    const loginButton = document.querySelector(".loginBox");
    loginButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default behavior
        login();
    });
}

function login() {
    const email = document.querySelector('input[name="email"]');
    const password = document.querySelector('input[name="password"]');

    if (email.value === "" || password.value === "") {
        openPopup();
        return;
    }

    const urlNeeded = 'api/v1/auth/login';

    const params = {
        email: email.value,
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
            openPopup();
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
        openPopup();
    });
}

function openPopup() {
    popupFailed.classList.add("open-save-popup-failed");
    setTimeout(closePopup, 5000);
}

function closePopup() {
    popupFailed.classList.remove("open-save-popup-failed");
}
