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
        branch,
        superior,
        rank,
        invitationDate,
        email,
        phoneNumber,
        address,
        socialScore,
        firstName,
        lastName,
        amnestyDays,
    } = subordinate;

    document.querySelector('.user-name').textContent = `${firstName} ${lastName}`;
    document.querySelector('.user-phone-number').textContent = `Phone Number: ${phoneNumber}`;
    document.querySelector('.user-address').textContent = `Address: ${address}`;
    document.querySelector('.user-email').textContent = `Email: ${email}`;
    document.querySelector('.user-supervisor').textContent = `Supervisor: ${superior.firstName} ${superior.lastName}`;
    document.querySelector('.user-amnesty-days').textContent = `Amnesty Days: ${amnestyDays}`;
}

