let subrdordinateURL = new URLSearchParams(window.location.search);
let subordinateId = subrdordinateURL.get('userId');

document.addEventListener('DOMContentLoaded', async function () {
    try {
        await displaySingleSubordinateDetails(subordinateId);
        await displayAttendanceEntries(subordinateId);
    } catch (error) {
        console.error(error);
    }
});

async function displaySingleSubordinateDetails(subordinateId) {
    const urlNeeded = `/api/v1/user/${subordinateId}`;

    try {
        const response = await fetch(urlNeeded, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error getting subordinate user Object.`);
        }
        console.log(`Communicated successfully.`);

        const userOBJ = await response.json();

        const {
            firstName,
            lastName,
            //userId,
            //localBranch,
            phoneNumber,
            //rank,
            email,
            superiorId,
            amnestyDays,
            address
        } = userOBJ;

        document.getElementById("name-id").textContent = `${firstName} ${lastName}`;
        //document.getElementById("user-id").textContent = `User ID: ${userId}`;
        //document.getElementById("branch-id").textContent = `Branch ID: ${localBranch}`;
        //document.getElementById("rank-id").textContent = `Rank Level: ${rank}`;
        document.getElementById("phone-id").textContent = `Phone Number: ${phoneNumber}`;
        document.getElementById("address-id").textContent = `Address: ${address}`;
        document.getElementById("email-id").textContent = `Email: ${email}`;
        document.getElementById("superior-id").textContent = `Superior ID: ${superiorId}`;
        document.getElementById("amnesty-id").textContent = `Numbers of Amnesty Days: ${amnestyDays}`;
    } catch (error) {
        console.error(`Error updating`, error);
        //openPopupFailed();
        throw error;
    }
}

async function displayAttendanceEntries(subordinateId) {
    try {
        const urlNeeded = `/api/v1/attendance/${subordinateId}/all`;
        const response = await fetch(urlNeeded, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error getting Attendance.`);
        }

        console.log(`Updated successfully.`);

        const userAttendanceList = await response.json();

        const parentElement = document.getElementById('attendances-container');
        userAttendanceList.forEach((attendanceEntry, index) => {
            const attendanceDate = attendanceEntry.attendanceID.date;
            const checkboxId = `attendanceEntry${index + 1}`;
            const htmlElementToBeAppended = document.createElement('div');
            htmlElementToBeAppended.classList.add('attendance-check-item');
            htmlElementToBeAppended.innerHTML = `
                <input type="checkbox" id="${checkboxId}" 
                onchange="confirmOrUnconfirmAttendance('${checkboxId}', '${attendanceDate}')" name="attendance" />
                <label for="${checkboxId}"> ${attendanceDate}</label>
            `;
            parentElement.appendChild(htmlElementToBeAppended);
        });
    } catch (error) {
        console.error(`Error updating SuperiorID:`, error);
        // openPopupFailed();
        throw error;
    }
}


function confirmOrUnconfirmAttendance(idOfHtmlElement, dateOfAttendance){
    const checkbox = document.getElementById(`${idOfHtmlElement}`);
    const urlNeeded = `/api/v1/attendance/${subordinateId}/${dateOfAttendance}`;

    if (checkbox.checked) {
        fetch(urlNeeded, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'isConfirmed': checkbox.checked })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating Attendance.`);
            }
            console.log(`updated successfully.`);
        })
        .catch(error => {
            console.error(`Error updating Attendance:`, error);
            //openPopupFailed();
            throw error; 
        });
      } else {
        fetch(urlNeeded, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'isConfirmed': checkbox.checked })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating Attendance.`);
            }
            console.log(`updated successfully.`);
        })
        .catch(error => {
            console.error(`Error updating Attendance:`, error);
            //openPopupFailed();
            throw error; 
        });
      }
 
}

