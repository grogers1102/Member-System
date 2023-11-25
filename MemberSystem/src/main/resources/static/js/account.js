document.addEventListener('DOMContentLoaded', async function () {
    try {
        // await isTokenValid();
        await displayAccountDetails();
    } catch (error) {
        console.error(error);
    }
});

async function displayAccountDetails() {
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

        const {
            //localBranch,
            superior,
            //rank,
            invitationDate,
            email,
            phoneNumber,
            address,
            socialScore,
            firstName,
            amnestyDays,
            lastName
        } = userOBJ;

        if (!superior){
            throw new Error('There was a problem with the request');
        }
        
        document.querySelector('.user-name').textContent = `${firstName} ${lastName}`;
        document.querySelector('.user-id').textContent = `User ID: ${userId}`;
        //document.querySelector('.user-branch').textContent = `Branch ID: ${localBranch.branchId}`;
        document.querySelector('.user-phone-number').textContent = `Phone Number: ${phoneNumber}`;
        document.querySelector('.user-address').textContent = `Address: ${address}`;
        document.querySelector('.user-email').textContent = `Email: ${email}`;
        document.querySelector('.user-supervisor').textContent = `Supervisor: ${superior.firstName} ${superior.lastName}`;
        document.querySelector('.user-amnesty-days').textContent = `Amnesty Days: ${amnestyDays}`;
        //document.querySelector('.user-standing').textContent = `Rank: ${rank.rankId}`;
        document.querySelector('.user-social-score').textContent = `Social Score: ${socialScore}`;
        document.querySelector('.user-standing').textContent = `Current Standing: ${await calculateUserStanding(socialScore)}`;
        document.querySelector('.user-date').textContent = `Date Joined: ${invitationDate}`;;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function calculateUserStanding(socialScore){
    if (socialScore > .9){
        return 'Outstanding'
    } else if (socialScore > .7){
        return 'Great'
    } else if (socialScore > .5){
        return 'Good'
    } else if (socialScore > .3){
        return 'Poor'
    } else if (socialScore > .1){
        return 'Bad'
    }else{
        return 'Dangerous'
    }
}


