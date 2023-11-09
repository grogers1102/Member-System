
// Check if authenticated
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken) {
        //window.location.href = '../login.html'; 
    } else {

        const httpRequest = new XMLHttpRequest();
            if (!httpRequest) {
                alert("Giving up :( Cannot create an XMLHTTP instance");
                return false;
            }

        const urlNeeded = '/{userId}';
        httpRequest.open('GET', urlNeeded, true);
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {

                if (httpRequest.status === 200) {
                    const userOBJ = JSON.parse(httpRequest.responseText);
                    const statementUpdater = userOBJ.firstName;
                    document.getElementsByTagName('header')[0].innerHTML = "Welcome, " + statementUpdater;
                } else {
                    alert("There was a problem with the request.");
                }
            } else {
                // Not ready yet.
            }
        };

        const uID = localStorage.getItem('userID');
        httpRequest.send(JSON.stringify(uID));
    }
});

document.addEventListener('DOMContentLoaded', function(){
    const logoutButton = document.querySelector(".log-out a");
    logoutButton.addEventListener("click", (event) => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        if (token || refreshToken){
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
        }
        // window.location.href = '../index.html';
    });
})
    
    function submitLogoutForm(){
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        if (token || refreshToken){
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        }

        window.location.href='index.html'
    }
