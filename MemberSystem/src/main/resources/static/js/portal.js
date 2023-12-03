const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
const day = String(currentDate.getDate()).padStart(2, '0');
let userId = null;
let rankId = 1;

const formattedDate = `${year}-${month}-${day}`;

document.addEventListener('DOMContentLoaded', async function () {
    await displayAccount();
    logoutEventListener();
    signInButtonEventListener();
    }
);

function checkIfSignedInAlready() {

    return new Promise((resolve, reject) => {
        userId = localStorage.getItem("userId");
        const urlNeededForChecking = `/api/v1/attendance/exists/${userId}/${formattedDate}`;

        fetch(urlNeededForChecking)
            .then(response => {
                if (!response.ok) {
                    throw new Error('There was a problem with the request.');
                }
                return response.text();
            })
            .then(data => {
                const resourceExists = (data === 'true');
                resolve(resourceExists);
            })
            .catch(error => {
                console.error('Error:', error.message);
                resolve(false); 
            });
    });
}

function signInButtonEventListener(){
    checkIfSignedInAlready()
        .then(isSignedIn => {
            if (!isSignedIn) {
                const signInButtonOnPortal = document.getElementById("sign-in-button-portal");
                signInButtonOnPortal.addEventListener("click", async (event) => {
                    const userID = localStorage.getItem("userId");
                    await makeAttendanceUpdate(formattedDate, userID);
                });
            }
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}

async function makeAttendanceUpdate(attendanceDate, userID) {
    const urlNeeded = "/api/v1/attendance/add";

    const attendanceID = {
        userId: userID,
        date: attendanceDate
    };

    const params = {
        attendanceID: attendanceID,
        isConfirmed: false
    };

    try {
        const response = await fetch(urlNeeded, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (response.ok) {
            alert("Successfully Clocked In!");
            location.reload();
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'There was a problem with the request.');
        }
    } catch (error) {
        alert(error.message);
    }
}


async function displayAccount(){

    const userId = localStorage.getItem('userId');
    const urlNeeded = `/api/v1/user/${userId}`;

    try {
        const response = await fetch(urlNeeded);
        
        if (!response.ok) {
            throw new Error('There was a problem with the request.');
        }
        
        const userOBJ = await response.json();

        rankId = userOBJ.rank.rankId;

        statementUpdater = userOBJ.firstName;
        document.getElementById('welcomeStatement').textContent = `Welcome, ${statementUpdater}`;
        await displayRank(userOBJ.rank);
        await displayBranchDetails(userOBJ);
        await displaySocialScore(userOBJ.socialScore);
    } catch (error) {
        alert(error.message);
    }
}

async function saveBranch() {
    branchName = document.getElementById('branch-name').value
    branchLocation = document.getElementById('branch-address').value

    const branchParams = {'name':branchName, 'address':branchLocation}

    try {
        const urlNeededBranch = `/api/v1/branch/add`;
        const response = await fetch(urlNeededBranch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(branchParams) 
        });

        if (!response.ok) {
            throw new Error(`Error saving branch`);
        }

        console.log(`Created successfully.`);
    } catch (error) {
        console.error(`Error creating Branch`, error);
        // openPopupFailed();
        throw error;
    }
}

async function saveRank() {
    let rankList = ['name', 'requirements', 'daysRequired'];
    let rankParams = {};

    rankList.forEach(rankField => {
        let rankInput = document.getElementById(rankField);
        if (rankInput.value.trim() !== "") {
            rankParams[rankField] = rankInput.value;
        } else {
            alert("Enter all fields");
            throw new Error("Fields are missing");
        }
    });

    try {
        const urlNeeded = `/api/v1/ranks/add`;
        const response = await fetch(urlNeeded, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rankParams) 
        });

        if (!response.ok) {
            throw new Error(`Error saving rank`);
        }

        console.log(`Created successfully.`);
    } catch (error) {
        console.error(`Error creating Rank`, error);
        // openPopupFailed();
        throw error;
    }
}

async function displayRank(rank){
    
    try{
        document.querySelector('.user-rank').textContent = rank.description
    }catch (error){
        return;
    }

    document.querySelector('.requirement-description').textContent = `Days Required (Weekly): ${rank.daysRequired}`
    
    if (rankId >= 5)
    {
        const openModalButtons = document.querySelectorAll('[data-modal-target]')
        const closeModalButtons = document.querySelectorAll('[data-close-button]')
        const overlay = document.getElementById('overlay')
        const saveButton = document.querySelector('.rank-button');

        saveButton.addEventListener('click', () => {
            saveRank();
        })
     
        overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.rank-modal.active')
            modals.forEach(modal => {
                closeModal(modal)
            })
        })
     
     
        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = document.querySelector(button.dataset.modalTarget)
                openModal(modal)
            })
        })
     
     
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.rank-modal')
                closeModal(modal)
            })
        })
    }
 }
 
 
 function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
 }
 
 
 function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
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

async function displayBranchDetails(user){
    const {
        localBranch,
    } = user;

    const branchPopulation = await getBranchPopulation(localBranch.branchId);
    const branch = await getBranchDetails(localBranch.branchId);
    const { manager } = branch;
    const managerName = `${manager.firstName} ${manager.lastName}`;

    document.querySelector('.user-branch-location').textContent = `Branch: ${localBranch.name}`;
    document.querySelector('.branch-population').textContent = `Population: ${branchPopulation}`;
    document.querySelector('.branch-manager').textContent = `Manager: ${managerName}`;

    if (rankId >= 5){
        const openModalButtons = document.querySelectorAll('[data-modal-target]')
        const closeModalButtons = document.querySelectorAll('[data-close-button]')
        const overlay = document.getElementById('overlay')
        const saveButtonBranch = document.querySelector('.branch-button');

        saveButtonBranch.addEventListener('click', () => {
            saveBranch();
        })
    
        overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.branch-modal.active')
            modals.forEach(modal => {
                closeModal(modal)
            })
        })
    
    
        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = document.querySelector(button.dataset.modalTarget)
                openModal(modal)
            })
        })
    
    
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.branch-modal')
                closeModal(modal)
            })
        })
    }
}

async function getBranchPopulation(branchId){
    const branchUrl = `/api/v1/user/branch/${branchId}`;

    try {
        const response = await fetch(branchUrl);

        if (!response.ok) {
            throw new Error('There was a problem with the request.');
        }

        const users = await response.json();
        const population = users.length; 

        return population;
    } catch (error) {
        console.error('Error:', error.message);
        return;
    }
}

async function getBranchDetails(branchId){
    const branchDetailsUrl = `/api/v1/branch/${branchId}`;

    const response = await fetch(branchDetailsUrl);

    if (!response.ok) {
        throw new Error('There was a problem with the request.');
    }

    return await response.json();
}

async function displaySocialScore(socialScore){
    let color;
        
    const socialScoreElement = document.querySelector('.social-score');

    socialScoreElement.textContent = `Social Score: ${socialScore}` ;
    
    if (socialScore > 0.9) {
        color = 'green';
    } else if (socialScore > 0.7) {
        color = 'blue';
    } else if (socialScore > 0.5) {
        color = 'cyan';
    } else if (socialScore > 0.3) {
        color = 'orange';
    } else if (socialScore > 0.1) {
        color = 'red';
    } else {
        color = 'darkred';
    }

    socialScoreElement.style.color = color;
}

async function displayStanding(standing){
    let color;
        
    const standingElement = document.querySelector('dashboard-user-standing');

    standingElement.textContent = `Standing: ${standing}` ;
    
    if (socialScore > 0.9) {
        color = 'green';
    } else if (socialScore > 0.7) {
        color = 'blue';
    } else if (socialScore > 0.5) {
        color = 'cyan';
    } else if (socialScore > 0.3) {
        color = 'orange';
    } else if (socialScore > 0.1) {
        color = 'red';
    } else {
        color = 'darkred';
    }

    standingElement.style.color = color;
}
