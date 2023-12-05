let subrdordinateURL = new URLSearchParams(window.location.search);
const subordinateId = subrdordinateURL.get('userId');

let userId = localStorage.getItem('userId');
let rankId = 0;

let popup  = document.querySelector('.save-popup');
let popupFailed = document.querySelector('.save-popup-failed');

let branchMap = {}; 
let rankMap = {}; 

document.addEventListener('DOMContentLoaded', async function () {
    await getUserDetails();
    await displayRankDropDown();
    await getRanks();
    await getBranches();
    addEditEventListener();
    deleteEventListener();
});

function addEditEventListener(){
    const saveButton = document.querySelector(".edit-save");
    saveButton.addEventListener("click", (event) => {
        updateSubordinate();
        updatePassword();
        updateRank();
        updateBranch();
        updateSuperior();
    });
}

function deleteEventListener(){
    const deleteButton = document.querySelector('.edit-delete');
    if (deleteButton) {
        deleteButton.addEventListener('click', deleteSubordinate);
    }
}

async function deleteSubordinate() {
    try {
        const urlNeededDelete = `/api/v1/user/${subordinateId}`;
        const response = await fetch(urlNeededDelete, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting subordinate.`);
        } else {
            window.location.href = 'viewSubordinates.html';
        }
    } catch (error) {
        console.error(`Error deleting Subordinate:`, error);
        // openPopupFailed();
        throw error;
    }
}



async function getUserDetails(){
    const urlNeededUser = `/api/v1/user/${userId}`;
    try {
        const response = await fetch(urlNeededUser);
        
        if (!response.ok) {
            throw new Error('There was a problem with the request.');
        }
        
        const userOBJ = await response.json();
        branchId = userOBJ.localBranch.branchId;
        rankId = userOBJ.rank.rankId;
    }catch(error){
        console.log(error);
    }
}

async function displayRankDropDown(){
    if (rankId >= 5){
        rankContainer = document.querySelector('.rank-dropdown-container');
        const label = document.createElement('label');
        label.setAttribute('for', 'rankLevel');
        label.textContent = 'Rank:';

        const select = document.createElement('select');
        select.setAttribute('id', 'rank');
        select.style.padding='0px';
        select.style.paddingLeft='4px';


        rankContainer.appendChild(label);
        rankContainer.appendChild(select);
    }
}

function updateSubordinate(){
    const subordinateFields = ['firstName', 'lastName', 'email', 'phone', 'address','amnestyDays'];

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

async function updateSuperior() {
    const selectedSuperior = document.getElementById('superior');
    if (selectedSuperior.value) {
        let superiorId = 0; 

        const urlNeededSuperior = `/api/v1/user/email/${selectedSuperior.value}`;
        try {
            const response = await fetch(urlNeededSuperior);

            if (!response.ok) {
                throw new Error('No Superior found with that ID');
            }

            const superiorOBJ = await response.json();

            superiorId = superiorOBJ.userId;

        } catch (error) {
            console.log(error);
        }

        const urlNeededForSuperior = `/api/v1/user/${subordinateId}/superior`;

        fetch(urlNeededForSuperior, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'superiorId': superiorId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating Superior.`);
            }
        })
        .catch(error => {
            console.error(`Error updating Superior:`, error);
            openPopupFailed();
            throw error;
        });
    }
}

function updateRank() {
    const selectedRank = document.getElementById('rank');
    const selectedRankName = selectedRank.value;

    if (selectedRankName && selectedRankName !== '--- Select a Rank ---') {
        const selectedRankId = rankMap[selectedRankName.toLowerCase()];
        const urlNeededForRank = `/api/v1/user/${subordinateId}/rank`;

        fetch(urlNeededForRank, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'rankId': selectedRankId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating Rank.`);
            }
        })
        .catch(error => {
            console.error(`Error updating Rank:`, error);
            openPopupFailed();
            throw error; 
        });
    } else {
        console.log('Please select a valid rank.');
    }
}


function updateBranch() {
    const selectedBranch = document.getElementById('localBranch');
    const selectedBranchName = selectedBranch.value;

    if (selectedBranchName && selectedBranchName !== '--- Select a Branch ---') {
        const selectedBranchId = branchMap[selectedBranchName.toLowerCase()];
        const urlNeededForBranch = `/api/v1/user/${subordinateId}/branch`;

        fetch(urlNeededForBranch, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'branchId': selectedBranchId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating Branch.`);
            }
        })
        .catch(error => {
            console.error(`Error updating Branch:`, error);
            openPopupFailed();
            throw error;
        });
    } else {
        console.log('Please select a valid branch.');
    }
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

async function displayRanks(allRanks) {
    const rankSelect = document.getElementById('rank');

    if(rankSelect){
        const firstOption = document.createElement("option");
        firstOption.text = '--- Select a Rank ---'
        rankSelect.appendChild(firstOption);

        allRanks.forEach((rank) => {
            const rankName = rank.name;
            const rankId = rank.rankId; 

            const option = document.createElement("option");
            option.value = rankName.toLowerCase();
            option.text = rankName;

            rankSelect.appendChild(option);

            rankMap[rankName.toLowerCase()] = rankId;
        });
    }
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

async function displayBranches(allBranches) {
    const branchSelect = document.getElementById('localBranch');

    const firstOption = document.createElement("option");
    firstOption.text = '--- Select a Branch ---'
    branchSelect.appendChild(firstOption);

    allBranches.forEach((branch) => {
        const branchName = branch.name;
        const branchIds = branch.branchId; 

        const option = document.createElement("option");
        option.value = branchName.toLowerCase();
        option.text = branchName;

        branchSelect.appendChild(option);

        branchMap[branchName.toLowerCase()] = branchIds;
    });
}





