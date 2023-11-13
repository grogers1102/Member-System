let subordinates;

function clickPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        const searchedSubordinate = document.getElementById('searchSubordinate').value;
        clearSubordinateDetails();
        displaySubordinateDetailsBySearch(searchedSubordinate);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        // await isTokenValid();
        await displaySubordinateDetails();
        setupSearchEventListener(); 
    } catch (error) {
        console.error(error);
    }
});

async function displaySubordinateDetails() {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('User ID not found in local storage.');
        }

        const urlNeeded = `/api/v1/user/${userId}/all`;

        const response = await fetch(urlNeeded);

        if (!response.ok) {
            throw new Error('There was a problem with the request.');
        }

        subordinates = await response.json();

        subordinates.forEach(addSubordinate);
    } catch (error) {
        console.error(error);
    }
}

function addSubordinate(subordinate) {
    var element = document.getElementById('viewSubordinatesDynam');
    
    var infoParagraph = document.createElement('p');
    
    infoParagraph.style.display = 'flex';
    infoParagraph.style.flex = '1';

    var link = document.createElement('a');
    link.href = '../portalPages/viewSingleSubordinate.html';
    
    var infoText = document.createTextNode(
        subordinate.firstName + ' ' +
        subordinate.lastName + ' ' +
        'UserID: ' + subordinate.userID + ' ' +
        'Branch: ' + subordinate.branch
    );
    
    link.appendChild(infoText);
    
    infoParagraph.appendChild(link);
    
    element.appendChild(infoParagraph);
}

function setupSearchEventListener() {
    document.getElementById('searchSubordinate').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const searchedSubordinate = this.value;
            clearSubordinateDetails();
            displaySubordinateDetailsBySearch(searchedSubordinate);
        }
    });
}

function clearSubordinateDetails() {
    var element = document.getElementById('viewSubordinatesDynam');
    element.innerHTML = ''; 
}

function displaySubordinateDetailsBySearch(searchedSubordinate) {
    subordinates.forEach(function (subordinate) {
        if ((subordinate.firstName.toLowerCase().includes(searchedSubordinate.toLowerCase())) || 
            (subordinate.lastName.toLowerCase().includes(searchedSubordinate.toLowerCase()))) {
            addSubordinate(subordinate);
        }
    });
}
