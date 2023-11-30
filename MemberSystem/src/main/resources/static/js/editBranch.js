//TEMPORARY IMPLEMENTATION
const branchId = 1;

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
    labelElement.setAttribute('for', 'address');
    labelElement.textContent = 'Manager'; 

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('id', 'address');
    inputElement.setAttribute('name', 'address');

    divElement.appendChild(labelElement);
    divElement.appendChild(inputElement);

    container.appendChild(divElement);
}

function updateBranch(){

    const address = document.getElementById('branchLocation');
    const name = document.getElementById('branchName');

    const urlAddress = `/api/v1/${branchId}/address`
    const urlName = `/api/v1/${branchId}/name`

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

    const name = document.getElementById('manager');

    const urlManager = '`/api/v1/${branchId}/manager`';

    fetch(urlPassword, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then(response => {
        if (!response.ok) {
            openPopupFailed();
            throw new Error(`Error updating password`);            
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