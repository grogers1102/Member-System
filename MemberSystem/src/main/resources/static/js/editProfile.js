let popup  = document.querySelector('.save-popup');
let popupFailed = document.querySelector('.save-popup-failed');

let failed = false;

document.addEventListener('DOMContentLoaded', function () {
    addEditEventListener();
});

function addEditEventListener(){
    const saveButton = document.querySelector(".edit-save");
    saveButton.addEventListener("click", (event) => {
        updateUser();
        updatePassword();
    });
}

function updateUser(){
    const userId = localStorage.getItem('userId');
    const userFields = ['firstName', 'lastName', 'email', 'phone', 'address'];

    userFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            if(element.value !== "") {
                const fieldValue = element.value; 
                const url = `/api/v1/user/${userId}/${field}`;
                
                return fetch(url, {
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
                })
                .catch(error => {
                    console.error(`Error updating ${field}:`, error);
                    failed = true;
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
    const userId = localStorage.getItem('userId');

    if (!oldPassword || !newPassword || !confirmPassword){
        failed = true;
        return;
    }

    if (oldPassword.value === "" || newPassword.value === "" || confirmPassword.value === ""){
        failed = true;
        return;
    }
    
    if (newPassword.value !== confirmPassword.value){
        failed = true;
        return; 
    }    

    const params = { userId, oldPassword: oldPassword.value, newPassword: newPassword.value };

    const urlPassword = '/api/v1/auth/changePassword';

    return fetch(urlPassword, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then(response => {
        if (!response.ok) {
            failed = true;
            throw new Error(`Error updating password`);            
        }
        console.log(`Password updated successfully.`);
    })
    .catch(error => {
        console.error(`Error updating Password:`, error);
        failed = true;
        throw error; 
    });
}

function openPopup() {
    Promise.all([updateUser(), updatePassword()]) 
    .then(() => {
        if (failed) {
            popupFailed.classList.add("open-save-popup-failed");
            setTimeout(() => { closePopup() }, 5000);
        } else {
            popup.classList.add("open-save-popup");
            setTimeout(() => { closePopup() }, 5000);
        }
    });
}

function closePopup() {
    if (failed) {
        popupFailed.classList.remove("open-save-popup-failed");
        failed = false;
        return;
    }
    popup.classList.remove("open-save-popup");
}