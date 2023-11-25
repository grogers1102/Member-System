let popup = document.querySelector('.save-popup');

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
                })
                .catch(error => {
                    console.error(`Error updating ${field}:`, error);
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
        return;
    }

    if (oldPassword.value === "" || newPassword.value === "" || confirmPassword.value === ""){
        return;
    }
    
    if (newPassword.value !== confirmPassword.value){
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
            throw new Error(`Error updating password`);
        }
        console.log(`Password updated successfully.`);
    })
    .catch(error => {
        console.error(`Error updating Password:`, error);
    });


}

function openPopup(){ 
    popup.classList.add("open-save-popup");
    setTimeout(() => { closePopup() }, 5000); 
}

function closePopup(){ 
    popup.classList.remove("open-save-popup");
}