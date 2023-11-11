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
        const { branchId } = userOBJ;

        const { managerId, address, population } = await getBranchDetails(branchId);

        document.querySelector('.branch-name').textContent = 'NOT IMPLEMENTED';
        document.querySelector('.branch-id').textContent = branchId;
        document.querySelector('.branch-population').textContent = population;
        document.querySelector('.branch-manager').textContent = await getBranchManagerFirstName(managerId);
        document.querySelector('.branch-address').textContent = address;
    } catch (error) {
        console.error(error);
        // handle the error as needed
    }
}

async function getBranchDetails(branchId) {
    const urlNeeded = '/api/v1/branch/' + branchId;
    const response = await fetch(urlNeeded);

    if (!response.ok) {
        throw new Error('There was a problem with the request.');
    }

    const branchOBJ = await response.json();
    return branchOBJ;
}

async function getBranchManagerFirstName(managerId) {
    const urlNeeded = '/api/v1/user/' + managerId;
    const response = await fetch(urlNeeded);

    if (!response.ok) {
        throw new Error('There was a problem with the request.');
    }

    const managerObj = await response.json();
    return managerObj.firstName;
}
