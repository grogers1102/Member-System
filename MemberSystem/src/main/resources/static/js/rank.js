document.addEventListener('DOMContentLoaded', async function () {
    try {
        // await isTokenValid();
        await displayRankDetails();
    } catch (error) {
        console.error(error);
    }
});

async function displayRankDetails() {
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
        const rank = userOBJ.rank;

        const { description, requirements, daysRequired } = rank;

        element = document.getElementById('viewRankDynam');

        rankInfo = document.createElement('p');
        rankInfo.style.display='flex';
        rankInfo.style.justifyContent='center';

        const rankText = document.createTextNode(
            'Name : ' + description + ' ' +
            'Requirements : ' + requirements + ' '+
            'Days Required : ' + daysRequired
        );

        rankInfo.appendChild(rankText);
        element.appendChild(rankInfo)

    } catch (error) {
        console.error(error);
        // handle the error as needed
    }
}
