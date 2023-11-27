
document.addEventListener('DOMContentLoaded', async function () {
    await displayAccount();
    logoutEventListener();
        
    //checkIfSignedInAlready();
    }
);

function checkIfSignedInAlready(){

    const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const userId = localStorage.getItem("userId");
        const isConfirmed = false;

        params = {userId, date, isConfirmed}
        
        const urlNeededForChecking = `/api/v1/attendance/${userId}/${formattedDate}`;
        const response =  fetch(urlNeededForChecking, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });

    if (response == null) {
        signInButtonEventListener();
    } else {
        const signInButton = document.getElementById("sign-in-button-portal");
        signInButton.disabled = true;
    }
}

function signInButtonEventListener(){
    const signInButtonOnPortal = document.getElementById("sign-in-button-portal");
    signInButtonOnPortal.addEventListener("click", (event) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}/${month}/${day}`;
        const userID = localStorage.getItem("userId");
        makeAttendanceUpdate(formattedDate, userID);
    });
}

 function makeAttendanceUpdate(attendanceDate, userID){

    const urlNeeded = "/api/v1/attendance/add";

    try {
        const response =  fetch(urlNeeded, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userID,attendanceDate),
        });

        if (response.ok) {
            alert("Successfully Signed In!");

        } else {
            throw new Error('There was a problem with the request.');
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

        statementUpdater = userOBJ.firstName;
        document.getElementById('welcomeStatement').textContent = `Welcome, ${statementUpdater}`;
        await displayBranchDetails(userOBJ);
        await displayRank(userOBJ.rank);
        await displaySocialScore(userOBJ.socialScore);
    } catch (error) {
        alert(error.message);
    }
}

async function displayRank(rank){
    
    try{
        document.querySelector('.user-rank').textContent = rank.description
    }catch (error){
        return;
    }

    document.querySelector('.requirement-description').textContent = `Days Required (Weekly): ${rank.daysRequired}`
 
    const openModalButtons = document.querySelectorAll('[data-modal-target]')
    const closeModalButtons = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')
 
 
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
            document.querySelector('.rank-modal-header').firstChild.textContent = `Rank: ${rank.description}`
            document.querySelector('.rank-modal-body').textContent = rank.requirements
        })
    })
 
 
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.rank-modal')
            closeModal(modal)
        })
    })
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
        
    const socialScoreElement = document.querySelector('.user-social-score');

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
