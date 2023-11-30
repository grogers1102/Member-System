let popup  = document.querySelector('.save-popup');
let popupFailed = document.querySelector('.save-popup-failed');

document.addEventListener('DOMContentLoaded', function () {
    addAssignSubEventListener();
});

function addAssignSubEventListener(){
    const saveButton = document.querySelector(".edit-save");
    saveButton.addEventListener("click", (event) => {
        updateMemberFields();
    });



    function updateMemberFields(){
        const memberId = document.getElementById("memberID").value;
        const userFields = [
            document.getElementById("superiorID").value, 
            document.getElementById("branchID").value, 
            document.getElementById("rankLevel").value];

        console.log(userFields[0]);

        if(false){
            throw new Error("Invalid Member ID!");
        }else{

            if(userFields[0] !== ""){
                console.log(userFields[0]);
                const urlNeeded = `/api/v1/user/${memberId}/superior`;
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
                    console.log(`updated successfully.`);
                    
                })
                .catch(error => {
                    console.error(`Error updating SuperiorID:`, error);
                    openPopupFailed();
                    throw error; 
                });

            }
            if(userFields[1] !== ""){
                const urlNeeded = `/api/v1/user/${memberId}/branch`;
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
                    console.log(` updated successfully.`);
                    
                })
                .catch(error => {
                    console.error(`Error updating BranchID:`, error);
                    openPopupFailed();
                    throw error; 
                });
            }

            if(userFields[2] !== ""){
                const urlNeededRank = `/api/v1/user/${memberId}/rank`;
                fetch(urlNeededRank, {
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
                    console.log(` updated successfully.`);
                    
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

    

/*
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
    */

     


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