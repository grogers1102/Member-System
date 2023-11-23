document.addEventListener('DOMContentLoaded', function () {
    addEditEventListener();
});

function addEditEventListener(){
    const saveButton = document.querySelector(".edit-save");
    saveButton.addEventListener("click", (event) => {
        updateUser();
    });
}

function updateUser(){
    const userId = localStorage.getItem('userId')
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