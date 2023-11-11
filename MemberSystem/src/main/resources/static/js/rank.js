ocument.addEventListener('DOMContentLoaded', async function () {
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
        const { rankId } = userOBJ;

        const { name, description, requirements, daysRequired } = await getRankDetails(rankId);

        document.querySelector('.rank-name').textContent = name;
        document.querySelector('.rank-id').textContent = rankId;
        document.querySelector('.rank-description').textContent = description;
        document.querySelector('.rank-requirements').textContent = requirements
        document.querySelector('.rank-daysRequired').textContent = daysRequired;
    } catch (error) {
        console.error(error);
        // handle the error as needed
    }
}
