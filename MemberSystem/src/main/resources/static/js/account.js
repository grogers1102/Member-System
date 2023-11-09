
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
        
        userId = localStorage.getItem('userId');
        const urlNeeded = '/api/v1/user/' + userId;

        httpRequest.open('GET', urlNeeded, true);
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {

                if (httpRequest.status === 200) {
                    const userOBJ = JSON.parse(httpRequest.responseText);
                    const { userId, branchId, superiorId, rankId, invitationDate, email, phoneNumber, address, socialScore, firstName, lastName} = userOBJ;
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

