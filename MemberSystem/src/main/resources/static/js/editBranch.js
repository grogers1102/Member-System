
let branchId = 1;

let popup  = document.querySelector('.save-popup');
let popupFailed = document.querySelector('.save-popup-failed');

document.addEventListener('DOMContentLoaded', async function () {
    await displayEditManager();
    addEditEventListener();
});

function addEditEventListener(){
    const saveButton = document.querySelector(".edit-save");
    saveButton.addEventListener("click", (event) => {
        updateBranch();
        updateManager();
    });
}

async function displayEditManager() {

    const userId = localStorage.getItem('userId');
    const urlNeeded = `/api/v1/user/${userId}`;

    try {
        const response = await fetch(urlNeeded);
        
        if (!response.ok) {
            throw new Error('There was a problem with the request.');
        }

        const userOBJ = await response.json();
        const rank = userOBJ.rank
        branchId = userOBJ.localBranch.branchId;

        if (rank.rankId < 5){
            return;
        }else{
            await displayManager();
        }
    } catch (error) {
        alert(error.message);
    }
}

async function displayManager(){
    const container = document.querySelector('.edit-manager');

    const divElement = document.createElement('div');
    divElement.classList.add('edit-manager'); 

    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', 'manager');
    labelElement.textContent = 'Manager'; 

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('id', 'manager');
    inputElement.setAttribute('name', 'manager');

    divElement.appendChild(labelElement);
    divElement.appendChild(inputElement);

    container.appendChild(divElement);
}

function updateBranch(){

    const address = document.getElementById('branchLocation').value;
    const name = document.getElementById('branchName').value;

    const urlAddress = `/api/v1/branch/${branchId}/address`
    const urlName = `/api/v1/branch/${branchId}/name`

    if (address !== ""){
        fetch(urlAddress, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"address": address})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating Location.`);
            }
            console.log(`Location updated successfully.`);
        })
        .catch(error => {
            console.error(`Error updating Location:`, error);
            throw error; 
        });
    }

    if (name !== ""){
        fetch(urlName, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": name})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating Name.`);
            }
            console.log(`Name updated successfully.`);
        })
        .catch(error => {
            console.error(`Error updating Name:`, error);
            throw error; 
        });
    }
}

function updateManager(){

    const managerId = document.getElementById('manager').value;
    if(managerId !== null && managerId !== ""){
        const urlManager = `/api/v1/branch/${branchId}/manager`;

        fetch(urlManager, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'managerId': managerId})
        })
        .then(response => {
            if (!response.ok) {
                openPopupFailed();
                throw new Error(`Error updating manager`);            
            }
            console.log(`Password updated successfully.`);
            openPopup();
        })
        .catch(error => {
            console.error(`Error updating Password:`, error);
            openPopupFailed();
            throw error; 
        });
    }
}

function openPopup() {
    popup.classList.add("open-save-popup");
    setTimeout(() => { closePopup() }, 5000);
}

function closePopup() {
    popup.classList.remove("open-save-popup");
}

function openPopupFailed(){
    popupFailed.classList.add("open-save-popup-failed");
    setTimeout(() => { closePopupFailed() }, 5000);
}

function closePopupFailed() {
    popupFailed.classList.remove("open-save-popup-failed");
}