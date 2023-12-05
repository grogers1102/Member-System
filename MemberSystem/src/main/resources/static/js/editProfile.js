let popup  = document.querySelector('.save-popup');
let popupFailed = document.querySelector('.save-popup-failed');

const userId = localStorage.getItem('userId');

document.addEventListener('DOMContentLoaded', function () {
    addEditEventListener();
    deleteEventListener();
});

function addEditEventListener(){
    const saveButton = document.querySelector(".edit-save");
    saveButton.addEventListener("click", (event) => {
        updateUser();
        updatePassword();
    });
}

function deleteEventListener(){
    const deleteButton = document.querySelector('.edit-delete');
    if (deleteButton) {
        deleteButton.addEventListener('click', deleteUser);
    }
}

async function deleteUser() {
    try {
        const urlNeededDelete = `/api/v1/user/${userId}`;
        const response = await fetch(urlNeededDelete, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting subordinate.`);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
            window.location.href = '../index.html';
        }
    } catch (error) {
        console.error(`Error deleting Subordinate:`, error);
        // openPopupFailed();
        throw error;
    }
}


function updateUser(){
    const userFields = ['firstName', 'lastName', 'email', 'phone', 'address'];

    userFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            if(element.value !== "") {
                const fieldValue = element.value; 
                const url = `/api/v1/user/${userId}/${field}`;
                
                fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ [field]: fieldValue })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error updating ${field}.`);
                    }
                    console.log(`${field} updated successfully.`);
                    openPopup();
                })
                .catch(error => {
                    console.error(`Error updating ${field}:`, error);
                    openPopupFailed();
                    throw error; 
                });
            }
        }
    });
}

function updatePassword(){
    const oldPassword = document.getElementById('current-password');
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');

    if (!oldPassword || !newPassword || !confirmPassword){
        return;
    }

    if (oldPassword.value === "" && newPassword.value === "" && confirmPassword.value === ""){
        return;
    }

    if (oldPassword.value === "" || newPassword.value === "" || confirmPassword.value === ""){
        openPopupFailed();
        return;
    }
    
    if (newPassword.value !== confirmPassword.value){
        openPopupFailed();
        return; 
    }    

    const params = { userId, oldPassword: oldPassword.value, newPassword: newPassword.value };

    const urlPassword = '/api/v1/auth/changePassword';

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