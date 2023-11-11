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
            
            var tag = document.createElement("a");
            tag.href = "viewSingleSubordinate.html";

            var text = document.createTextNode(
                subordinate.firstName + '   ' + 
                subordinate.lastName + '   ' + 
                subordinate.userID + '   ' + 
                subordinate.branch);

            tag.appendChild(text);

            tag.style.display="block";

            var element = document.getElementById('viewSubordinatesDynam');
            element.appendChild(tag);

        }

    } catch (error) {
        console.error(error);
        // Handle the error as needed
    }
}


