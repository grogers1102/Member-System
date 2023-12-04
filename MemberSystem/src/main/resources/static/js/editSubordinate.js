let subrdordinateURL = new URLSearchParams(window.location.search);
let subordinateId = subrdordinateURL.get('subordinateId');

let popup  = document.querySelector('.save-popup');
let popupFailed = document.querySelector('.save-popup-failed');

document.addEventListener('DOMContentLoaded', async function () {
    await getBranches();
    await getRanks()
    addEditEventListener();
});

function addEditEventListener(){
    const saveButton = document.querySelector(".edit-save");
    saveButton.addEventListener("click", (event) => {
        updateSubordinate();
        updatePassword();
    });
}

function updateSubordinate(){
    const subordinateFields = ['firstName', 'lastName', 'email', 'phone', 'address','amnestyDays', 'localBranch','rank'];

    subordinateFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            if(element.value !== "") {
                const fieldValue = element.value; 
                const url = `/api/v1/user/${subordinateId}/${field}`;
                
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
    const subordinateId = localStorage.getItem('subordinateId');

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

    const params = { subordinateId, oldPassword: oldPassword.value, newPassword: newPassword.value };

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
    rankSelect = document.getElementById('rank');
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