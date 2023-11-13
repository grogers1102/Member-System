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
        
        userId = localStorage.getItem('userId');
        const urlNeeded = '/api/v1/user/all/' + userId;

        httpRequest.open('GET', urlNeeded, true);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    const subordinatesList = JSON.parse(httpRequest.responseText);
                    subordinatesList.forEach(myFunction);
                    function myFunction(user) {
                        var tag = document.createElement("a");
                        tag.href = "viewSingleSubordinate.html";
                        
                        var text = document.createTextNode(user.firstName + '   ' + user.lastName + '   ' + user.userID + '   ' + user.branch);
                        tag.appendChild(text);
                        tag.style.display="block";
                        var element = document.getElementById('viewSubordinatesDynam');
                        element.appendChild(tag);
                    }

                } else {
                    alert("There was a problem with the request.");
                }
            } else {
                // Not ready yet.
            }
        };
        // HERE
        httpRequest.send(JSON.stringify(userId));
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
            localStorage.removeItem('userId');
        }

        window.location.href='index.html'
    }