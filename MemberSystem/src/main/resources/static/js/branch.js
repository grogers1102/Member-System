document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken) {
        window.location.href = '../login.html';
    } else {
        let userId = localStorage.getItem('userId');
        let branchId, managerId;

        const httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            alert("Giving up :( Cannot create an XMLHTTP instance");
            return false;
        }

        const urlNeeded = '/api/v1/user/' + userId;
        httpRequest.open('GET', urlNeeded, true);
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    const userOBJ = JSON.parse(httpRequest.responseText);
                    branchId = userOBJ.branchId;

                    const urlNeededBranch = '/api/v1/branch/' + branchId;
                    const httpRequestBranch = new XMLHttpRequest();
                    if (!httpRequestBranch) {
                        alert("Giving up :( Cannot create an XMLHTTP instance");
                        return false;
                    }

                    httpRequestBranch.open('GET', urlNeededBranch, true);
                    httpRequestBranch.onreadystatechange = () => {
                        if (httpRequestBranch.readyState === XMLHttpRequest.DONE) {
                            if (httpRequestBranch.status === 200) {
                                const response = JSON.parse(httpRequestBranch.responseText);
                                managerId = response.managerId;

                                const urlNeededBranchManager = '/api/v1/user/' + managerId;
                                const httpRequestBranchManager = new XMLHttpRequest();
                                if (!httpRequestBranchManager) {
                                    alert("Giving up :( Cannot create an XMLHTTP instance");
                                    return false;
                                }

                                httpRequestBranchManager.open('GET', urlNeededBranchManager, true);
                                httpRequestBranchManager.onreadystatechange = () => {
                                    if (httpRequestBranchManager.readyState === XMLHttpRequest.DONE) {
                                        if (httpRequestBranchManager.status === 200) {
                                            const managerOBJ = JSON.parse(httpRequestBranchManager.responseText);
                                            const statementUpdaterManager = managerOBJ.firstName;
                                            // Update the appropriate element with the manager's first name
                                            // For example: document.getElementById('elementID').innerHTML = statementUpdaterManager;
                                        } else {
                                            alert("There was a problem with the request.");
                                        }
                                    } else {
                                        // Not ready yet.
                                    }
                                };
                                httpRequestBranchManager.send();
                            } else {
                                alert("There was a problem with the request.");
                            }
                        } else {
                            // Not ready yet.
                        }
                    };
                    httpRequestBranch.send();
                } else {
                    alert("There was a problem with the request.");
                }
            } else {
                // Not ready yet.
            }
        };
        httpRequest.send();
    }
});
