document.addEventListener('DOMContentLoaded', async function () {
    try {
        // await isTokenValid();
        await displaySubordinateDetails();
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

        const subordinates = await response.json();

        subordinates.forEach(addSubordinate);

        function addSubordinate(subordinate) {
            var element = document.getElementById('viewSubordinatesDynam');
        
            var infoParagraph = document.createElement('p');
        
            infoParagraph.style.display = 'flex';
        
            var infoText = document.createTextNode(
                subordinate.firstName + ' ' +
                subordinate.lastName + ' ' +
                'UserID: ' + subordinate.userID + ' ' +
                'Branch: ' + subordinate.branch
            );
        
            infoParagraph.appendChild(infoText);
        
            element.appendChild(infoParagraph);
        }
        

        
    } catch (error) {
        console.error(error);
    }
}


