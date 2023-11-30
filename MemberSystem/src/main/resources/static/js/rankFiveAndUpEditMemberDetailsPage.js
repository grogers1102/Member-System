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
        const userFields = [
            document.getElementById("superiorID").textContent, 
            document.getElementById("branchID").textContent, 
            document.getElementById("rankLevel").textContent];

        if(!validateUserID(memberId)){
            throw new Error("Invalid Member ID!");
        }else{

            if(userFields[0] !== ""){

                const urlNeeded = `/api/v1/user/${memberID}/superior`;
                fetch(urlNeeded, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 'superiorId': userFields[0] })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error updating SuperiorID.`);
                    }
                    console.log(`${field} updated successfully.`);
                    
                })
                .catch(error => {
                    console.error(`Error updating SuperiorID:`, error);
                    openPopupFailed();
                    throw error; 
                });

            }

            if(userFields[1] !== ""){
                const urlNeeded = `/api/v1/user/${memberID}/branch`;
                fetch(urlNeeded, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 'branchId': userFields[1] })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error updating BranchID.`);
                    }
                    console.log(`${field} updated successfully.`);
                    
                })
                .catch(error => {
                    console.error(`Error updating BranchID:`, error);
                    openPopupFailed();
                    throw error; 
                });
            }

            if(userFields[2] !== ""){
                const urlNeeded = `/api/v1/user/${memberID}/rank`;
                fetch(urlNeeded, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 'rankId': userFields[2] })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error updating rankID.`);
                    }
                    console.log(`${field} updated successfully.`);
                    
                })
                .catch(error => {
                    console.error(`Error updating rankId:`, error);
                    openPopupFailed();
                    throw error; 
                });
            }
            openPopup();
        }
    }

    


    function validateUserID(idNumber){
        
        const urlForMemberID = '/api/v1/user/' + idNumber;

        const response =  fetch(urlForMemberID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(idNumber),
        });

        const userObj =  response.json();
        if(userObj == null){
            return false;
        }
        return true;
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