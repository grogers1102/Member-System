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
            localBranch,
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
        //document.querySelector('.user-id').textContent = `User ID: ${userId}`;
        //document.querySelector('.user-branch').textContent = `Branch ID: ${localBranch.branchId}`;
        //document.querySelector('.profile-user-rank').textContent = `Rank: ${localBranch.branchId}`;
        document.querySelector('.user-phone-number').textContent = `Phone Number: ${phoneNumber}`;
        document.querySelector('.user-address').textContent = `Address: ${address}`;
        document.querySelector('.user-email').textContent = `Email: ${email}`;
        document.querySelector('.user-supervisor').textContent = `Supervisor: ${superior.firstName} ${superior.lastName}`;
        document.querySelector('.user-amnesty-days').textContent = `Amnesty Days: ${amnestyDays}`;
        //document.querySelector('.user-standing').textContent = `Rank: ${rank.rankId}`;
        displaySocialScore(userOBJ.socialScore);
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

async function displaySocialScore(socialScore){

    let color;
        
    const socialScoreElement = document.querySelector('.user-social-score');

    socialScoreElement.textContent = `Social Score: ${socialScore}` ;
    
    if (socialScore > 0.9) {
        color = 'green';
    } else if (socialScore > 0.7) {
        color = 'blue';
    } else if (socialScore > 0.5) {
        color = 'cyan';
    } else if (socialScore > 0.3) {
        color = 'orange';
    } else if (socialScore > 0.1) {
        color = 'red';
    } else {
        color = 'darkred';
    }

    socialScoreElement.style.color = color;
}

async function displayRank(rank){

    let color;
        
    const rankElement = document.querySelector('.profile-user-rank');

    rankElement.textContent = `Rank: ${rank}` ;
    
    if (socialScore > 0.9) {
        color = 'green';
    } else if (socialScore > 0.7) {
        color = 'blue';
    } else if (socialScore > 0.5) {
        color = 'cyan';
    } else if (socialScore > 0.3) {
        color = 'orange';
    } else if (socialScore > 0.1) {
        color = 'red';
    } else {
        color = 'darkred';
    }

    rankElement.style.color = color;
}
