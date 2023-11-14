document.addEventListener('DOMContentLoaded', async function () {
    try {
        // await isTokenValid();
        await displaySingleSubordinateDetails();
    } catch (error) {
        console.error(error);
    }
});

async function displaySingleSubordinateDetails(){

    const subrdordinateURL = new URLSearchParams(window.location.search);
    const subordinateId = subrdordinateURL.get('userId');

    const urlNeeded = `/api/v1/user/${subordinateId}`;

    const response = await fetch(urlNeeded);

    if (!response.ok) {
        throw new Error('There was a problem with the request.');
    }

    subordinate = await response.json();

    const {
        branchId,
        superiorId,
        rankId,
        invitationDate,
        email,
        phoneNumber,
        address,
        socialScore,
        firstName,
        lastName
    } = subordinate;

    // SET VALUES ACCORDINGLY
}