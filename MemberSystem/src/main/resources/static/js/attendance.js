let attendances;

function clickPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        const searchedUser = document.querySelector('search-attendance-members-box');
        clearAttendance();
        displayAttendanceBySearch(searchedUser);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        // await isTokenValid();
        await displayAttendanceDetails();
        setupSearchEventListener(); 
    } catch (error) {
        console.error(error);
    }
});

function setupSearchEventListener() {
    document.querySelector('.search-attendance-box').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const searchedAttendance = this.value;
            clearAttendance();
            displayAttendanceBySearch(searchedAttendance);
        }
    });
}

async function displayAttendanceDetails() {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('User ID not found in local storage.');
        }

        const urlNeeded = `/api/v1/attendance/${userId}/all`;

        const response = await fetch(urlNeeded);

        if (!response.ok) {
            throw new Error('There was a problem with the request.');
        }

        attendances = await response.json();

        attendances.forEach(displayAttendance);
    } catch (error) {
        console.error(error);
    }
}

function displayAttendance(attendance){

    const attendanceBox = document.createElement('div');
    attendanceBox.classList.add('subordinate-box');

    const attendanceDate = document.createElement('div');
    attendanceDate.classList.add('attendance-name');

    const link = document.createElement('p');
    link.textContent = attendance.date;

    attendanceDate.appendChild(link);

    const attendanceInnerBox = document.createElement('div');
    attendanceInnerBox.classList.add('subordinate-innerbox');

    const attendanceInnerStart = document.createElement('div');
    attendanceInnerStart.classList.add('subordinate-innerstart');

    console.log(attendance);

    const date = attendance.attendanceID.date;
    const confirmed = attendance.confirmed;

    const startUl = document.createElement('ul');
    startUl.innerHTML = `
    <li>Date</li>
    <li>Confirmed</li>
    `;

    attendanceInnerStart.appendChild(startUl);

    const attendanceInnerEnd = document.createElement('div');
    attendanceInnerEnd.classList.add('subordinate-innerend');

    const endUl = document.createElement('ul');
    endUl.innerHTML = `
        <li>${date}</li>
        <li>${confirmed}</li>
    `;

    attendanceInnerEnd.appendChild(endUl);

    const bottomTag = document.createElement('div');
    bottomTag.classList.add('bottom-tag');

    attendanceBox.appendChild(attendanceDate);
    attendanceBox.appendChild(attendanceInnerBox);
    attendanceInnerBox.appendChild(attendanceInnerStart);
    attendanceInnerBox.appendChild(attendanceInnerEnd);
    attendanceBox.appendChild(bottomTag);

    const parentElement = document.querySelector('.content-attendance-container');
    parentElement.appendChild(attendanceBox);
}


function clearAttendance() {
    var element = document.querySelector('.content-attendance-container');
    element.innerHTML = ''; 
}


function displayAttendanceBySearch(searchedDate) {
    attendances.forEach(function (attendance) {
        date = attendance.attendanceID.date;
        if(date.includes(searchedDate)) {
            displayAttendance(attendance);
        }
         
    });
}

