let popup  = document.querySelector('.save-popup');
let popupFailed = document.querySelector('.save-popup-failed');

document.addEventListener('DOMContentLoaded', async function () {
    await getBranches();
    await getRanks();
    addAssignSubEventListener();
});

function addAssignSubEventListener(){
    const saveButton = document.querySelector(".edit-save");
    saveButton.addEventListener("click", (event) => {
        updateMemberFields();
    });
}

async function getBranches(){
    const allBranchUrl = `/api/v1/branch/all`

    try {
        const branchResponse = await fetch(allBranchUrl, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
            },
        });
        
        
        if (!branchResponse.ok) {
            throw new Error('There was a problem with the request.');
        }
        allBranches = await branchResponse.json();
        await displayBranches(allBranches);

    } catch (error) {
        alert(error.message);
    }
}

async function getRanks(){
    const allRankUrl = `/api/v1/ranks/all`

    try {
        const rankResponse = await fetch(allRankUrl);
        
        if (!rankResponse.ok) {
            throw new Error('There was a problem with the request.');
        }

        allRanks = await rankResponse.json();
        await displayRanks(allRanks);

    } catch (error) {
        alert(error.message);
    }
}

async function displayRanks(allRanks){
    rankSelect = document.getElementById('rank-dropdown');
    const firstOption = document.createElement("option");
    rankSelect.appendChild(firstOption);

    allRanks.forEach((rank) => {
        const rankName = rank.description;
        const option = document.createElement("option");
        option.value = rankName.toLowerCase();
        option.text = rankName;
        rankSelect.appendChild(option);
    });
}

async function displayBranches(allBranches){
    branchSelect = document.getElementById('branch-dropdown');

    const firstOption = document.createElement("option");
    branchSelect.appendChild(firstOption);

    allBranches.forEach((branch) => {
        const branchName = branch.name;
        const option = document.createElement("option");
        option.value = branchName.toLowerCase();
        option.text = branchName;
        branchSelect.appendChild(option);
      });
}



function updateMemberFields(){
    const memberId = document.getElementById("memberID").value;
    const userFields = [
    document.getElementById("superiorID").value];




    if(userFields[0] !== ""){
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
        })
        .catch(error => {
            console.error(`Error updating SuperiorID:`, error);
            openPopupFailed();
            throw error; 
        });

    }
    openPopup();
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

