document.addEventListener('DOMContentLoaded', async function () {
    try {
        // await isTokenValid();
        await displayBranchDetails();
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
        const branchId = userOBJ.localBranch.branchId;

        const branch = await getBranchDetails(branchId);

        const { name, manager } = branch;
        
        const managerName = `${manager.firstName} ${manager.lastName}`
        const population = await getBranchPopulation(branchId);

        document.querySelector('.user-branch-location').textContent = `${name}`;
        document.querySelector('.user-branch-population').textContent = `Population: ${population}`;
        document.querySelector('.user-branch-manager').textContent = `Manager: ${managerName}`
        await displayBranchMembers(branchId);

    } catch (error) {
        console.error(error);
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

        const subordinates = await response.json();
        const population = subordinates.length; 

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

    subordinates = await response.json();

    subordinates.forEach(displayBranchMember);
}



function displayBranchMember(subordinate){

    const subordinateBox = document.createElement('div');
    subordinateBox.classList.add('subordinate-box');

    const subordinateName = document.createElement('div');
    subordinateName.classList.add('subordinate-name');

    const link = document.createElement('p');
    link.textContent = subordinate.firstName + ' ' + subordinate.lastName;

    subordinateName.appendChild(link);

    const subordinateInnerBox = document.createElement('div');
    subordinateInnerBox.classList.add('subordinate-innerbox');

    const subordinateInnerStart = document.createElement('div');
    subordinateInnerStart.classList.add('subordinate-innerstart');

    const superior = `${subordinate.superior.firstName} ${subordinate.superior.lastName}`
    const socialScore = subordinate.socialScore;
    const email = subordinate.email

    const startUl = document.createElement('ul');
    startUl.innerHTML = `
    <li>Superior</li>
    <li>Socail Score</li>
    <li>Email</li>
    `;

    subordinateInnerStart.appendChild(startUl);

    const subordinateInnerEnd = document.createElement('div');
    subordinateInnerEnd.classList.add('subordinate-innerend');

    const endUl = document.createElement('ul');
    endUl.innerHTML = `
        <li>${superior}</li>
        <li>${socialScore}</li>
        <li>${email}</li>
    `;

    subordinateInnerEnd.appendChild(endUl);

    const bottomTag = document.createElement('div');
    bottomTag.classList.add('bottom-tag');

    subordinateBox.appendChild(subordinateName);
    subordinateBox.appendChild(subordinateInnerBox);
    subordinateInnerBox.appendChild(subordinateInnerStart);
    subordinateInnerBox.appendChild(subordinateInnerEnd);
    subordinateBox.appendChild(bottomTag);

    const parentElement = document.querySelector('.search-branch-results');
    parentElement.appendChild(subordinateBox);
}

