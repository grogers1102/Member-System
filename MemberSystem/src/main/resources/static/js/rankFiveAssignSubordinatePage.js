document.addEventListener('DOMContentLoaded', function () {
    addAssignSubEventListener();
});

function addAssignSubEventListener(){
    const saveButton = document.querySelector(".edit-save");
    saveButton.addEventListener("click", (event) => {
        updateMemberFields();
    });



    function updateMemberFields(){
        const memberId = document.getElementById("memberID").textContent;
        const userFields = ['superiorID', 'branchID'];

        userFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                if(element.value !== "") {
                    const fieldValue = element.value; 
                    const url = `/api/v1/user/${memberID}/${field}`;
                    
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

}