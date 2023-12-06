let users;
let branchId = 0;

function clickPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        const searchedUser = document.querySelector('search-branch-members-box');
        clearUserDetails();
        displayUserDetailsBySearch(searchedUser);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        // await isTokenValid();
        await displayBranchDetails();
        setupSearchEventListener(); 
    } catch (error) {
        console.error(error);
    }
});

async function displayBranchDetails() {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('User ID not found in local storage.');
        }

        const urlNeeded = '/api/v1/user/' + userId;
        const response = await fetch(urlNeeded);

        if (!response.ok) {
            throw new Error('There was a problem with the request.');
        }

        const userOBJ = await response.json();
        branchId = userOBJ.localBranch.branchId;

        displayBranchMembers(branchId);

        const branch = await getBranchDetails(branchId);

        if (!branch) {
            throw new Error('Branch details not available.');
        }

        const { name } = branch;
        const population = await getBranchPopulation(branchId);

        document.querySelector('.user-branch-location').textContent = `${name}`;
        document.querySelector('.user-branch-population').textContent = `Population: ${population}`;

    } catch (branchError) {
        console.error(branchError);
        document.querySelector('.user-branch-location').textContent = 'Branch: Not Available';
    }

    try {
        const branch = await getBranchDetails(branchId);

        if (!branch || !branch.manager || !branch.manager.firstName || !branch.manager.lastName) {
            throw new Error('Manager details not available.');
        }

        const { manager } = branch;
        const managerName = `${manager.firstName} ${manager.lastName}`;
        document.querySelector('.user-branch-manager').textContent = `Manager: ${managerName}`;

    } catch (managerError) {
        console.error(managerError);
        document.querySelector('.user-branch-manager').textContent = 'Manager: Not Available';
    }

    try {
        const population = await getBranchPopulation(branchId);
        document.querySelector('.user-branch-population').textContent = `Population: ${population}`;

    } catch (populationError) {
        console.error(populationError);
        document.querySelector('.user-branch-population').textContent = 'Population: Not Available';
    }
}

async function getBranchDetails(branchId){
    const branchDetailsUrl = `/api/v1/branch/${branchId}`;

    const response = await fetch(branchDetailsUrl);

    if (!response.ok) {
        throw new Error('There was a problem with the request.');
    }

    return await response.json();
}

async function getBranchPopulation(branchId){
    const branchUrl = `/api/v1/user/branch/${branchId}`;

    try {
        const response = await fetch(branchUrl);

        if (!response.ok) {
            throw new Error('There was a problem with the request.');
        }

        const users = await response.json();
        const population = users.length; 

        return population;
    } catch (error) {
        console.error('Error:', error.message);
        return;
    }
}



async function displayBranchMembers(branchId){

    const branchUrl = `/api/v1/user/branch/${branchId}`

    const response = await fetch(branchUrl);

    if (!response.ok) {
        throw new Error('There was a problem with the request.');
    }

    users = await response.json();

    users.forEach(displayBranchMember);
}



function displayBranchMember(user) {
    const userBox = document.createElement('div');
    userBox.classList.add('subordinate-box');

    const userName = document.createElement('div');
    userName.classList.add('subordinate-name');

    const link = document.createElement('p');
    link.textContent = user.firstName + ' ' + user.lastName;

    userName.appendChild(link);

    const userInnerBox = document.createElement('div');
    userInnerBox.classList.add('subordinate-innerbox');

    const userInnerStart = document.createElement('div');
    userInnerStart.classList.add('subordinate-innerstart');

    const socialScore = user.socialScore;
    const email = user.email

    const startUl = document.createElement('ul');
    startUl.innerHTML = `
        <li>Superior</li>
        <li>Social Score</li>
        <li>Email</li>
    `;

    userInnerStart.appendChild(startUl);

    const userInnerEnd = document.createElement('div');
    userInnerEnd.classList.add('subordinate-innerend');

    const endUl = document.createElement('ul');

    let superiorText = user.superior ? `${user.superior.firstName} ${user.superior.lastName}` : 'Not Available';

    endUl.innerHTML = `
        <li>${superiorText}</li>
        <li>${socialScore}</li>
        <li>${email}</li>
    `;

    userInnerEnd.appendChild(endUl);

    const bottomTag = document.createElement('div');
    bottomTag.classList.add('bottom-tag');

    userBox.appendChild(userName);
    userBox.appendChild(userInnerBox);
    userInnerBox.appendChild(userInnerStart);
    userInnerBox.appendChild(userInnerEnd);
    userBox.appendChild(bottomTag);

    const parentElement = document.querySelector('.search-branch-results');
    parentElement.appendChild(userBox);
}


function clearUserDetails() {
    var element = document.querySelector('.search-branch-results');
    element.innerHTML = ''; 
}

function displayUserDetailsBySearch(searchedUser) {
    users.forEach(function (user) {
        if ((user.firstName.toLowerCase().includes(searchedUser.toLowerCase())) || 
        (user.lastName.toLowerCase().includes(searchedUser.toLowerCase())) ||
        (`${user.firstName} ${user.lastName}`.toLowerCase().includes(searchedUser.toLowerCase()))) {
        displayBranchMember(user);
        } 
    });
}

function setupSearchEventListener() {
    document.querySelector('.search-branch-members-box').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const searchedUser = this.value;
            clearUserDetails();
            displayUserDetailsBySearch(searchedUser);
        }
    });
}

function redirect(){
    window.location=`editBranch.html?branchId=${branchId}`
}

