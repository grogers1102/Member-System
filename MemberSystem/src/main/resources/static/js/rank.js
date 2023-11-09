
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
        
        const urlNeeded = '/api/v1/ranks/all';

        httpRequest.open('GET', urlNeeded, true);
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {

                if (httpRequest.status === 200) {
                    const rankArray = JSON.parse(httpRequest.responseText);
                    let rankNum = 0;
                    rankArray.forEach(rankObj => {
                        document.getElementsByTagName('IMPLEMENT WHEN READY')[rankNum].innerHTML = `${rankObj.rankId} ${rankObj.description} ${rankObj.requirements} ${rankObj.daysRequired}`;
                        rankNum += 1;
                    });
                } else {
                    alert("There was a problem with the request.");
                }
            } else {
                // Not ready yet.
            }
        };
    }
});

