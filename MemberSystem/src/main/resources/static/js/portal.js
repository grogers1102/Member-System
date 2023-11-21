
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
                displayRank(userOBJ.rank)
                displayBranchIcon(userOBJ);
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

function displayRank(rank){
    
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

function displayBranchIcon(userOBJ) {

    branchExists = document.querySelector('.sidebar .branch-element')

    if (!userOBJ || !userOBJ.rank || branchExists) {
        return;
    }

    const rank = userOBJ.rank;

    const element = document.querySelector('.sidebar .menu');

    const listElement = document.createElement('li');
    const anchorElement = document.createElement('a');
    const iconElement = document.createElement('i');
    const spanElement = document.createElement('span');

    listElement.className='branch-element';

    anchorElement.href = 'branchPage.html';

    iconElement.className = 'fa-solid fa-location-dot'; 

    spanElement.textContent = 'Branch';

    if (rank.rankId > 2) {
        anchorElement.href = 'higherBranchPage.html';
    }

    anchorElement.appendChild(iconElement);
    anchorElement.appendChild(spanElement);

    listElement.appendChild(anchorElement);
    element.appendChild(listElement);
}

