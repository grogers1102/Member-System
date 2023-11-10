
document.addEventListener('DOMContentLoaded', function () {
    if (isTokenValid()){

        displayAccount();
        logoutEventListener();
    }
});

function isTokenValid(){

    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken){
        return true; // CHANGE LATER
    }
    else{
        return true;
    }
}

function displayAccount(){

    const userId = localStorage.getItem('userId');
    const urlNeeded = `/api/v1/user/${userId}`;

    fetch(urlNeeded)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('There was a problem with the request.');
                }
            })
            .then(userOBJ => {
                const statementUpdater = userOBJ.firstName;
                document.getElementsByTagName('header')[0].innerHTML = `Welcome, ${statementUpdater}`;
            })
            .catch(error => {
                alert(error.message);
            });
}

function logoutEventListener(){
    const logoutButton = document.querySelector(".log-out a");
    logoutButton.addEventListener("click", (event) => {
        logout();
    });
}

function logout() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token || refreshToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
    }

    window.location.href = 'index.html';
}