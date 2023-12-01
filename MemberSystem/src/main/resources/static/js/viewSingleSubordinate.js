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

async function displaySingleSubordinateDetails(subordinateIdFromUrl){

    const singleSubordinateParams = 
    [firstNameOfSub, lastNameOfSub, subID, 
     branch, phoneNumber, rank,
     email, superiorID, amnestyDays,
     address]

    const urlNeeded = `/api/v1/user/${subordinateIdFromUrl}`;

        fetch(urlNeeded, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error getting subordinate user Object.`);
            }
            console.log(`communicated successfully.`);

            const userOBJ = reposnse.json();

            singleSubordinateParams[0] = userOBJ.firstName;
            singleSubordinateParams[1] = userOBJ.lastName;
            singleSubordinateParams[2] = userOBJ.userId;
            singleSubordinateParams[3] = userOBJ.localBranch.branchId;
            singleSubordinateParams[4] = userOBJ.phoneNumber;
            singleSubordinateParams[5] = userOBJ.rankId.rank;
            singleSubordinateParams[6] = userOBJ.email;
            singleSubordinateParams[7] = userOBJ.superiorId.superior;
            singleSubordinateParams[8] = userOBJ.amnestyDays;
            singleSubordinateParams[9] = userOBJ.address;

        })
        .catch(error => {
            console.error(`Error updating SuperiorID:`, error);
            openPopupFailed();
            throw error; 
        });

    document.getElementById("name-id").textContent = `${singleSubordinateParams[0]} ${singleSubordinateParams[1]}`;

    document.getElementById("user-id").textContent = `User ID: ${singleSubordinateParams[2]}`;
    document.getElementById("branch-id").textContent = `Branch ID: ${singleSubordinateParams[3]}`;    
    document.getElementById("rank-id").textContent = `Rank Level: ${singleSubordinateParams[5]}`; 

    document.getElementById("phone-id").textContent = `Phone Number: ${singleSubordinateParams[4]}`;    
    document.getElementById("address-id").textContent = `Address: ${singleSubordinateParams[9]}`;       
    document.getElementById("email-id").textContent = `Email: ${singleSubordinateParams[6]}`;  

    document.getElementById("superior-id").textContent = `Superior ID: ${singleSubordinateParams[7]}`;       
    document.getElementById("amnesty-id").textContent = `Numbers of Amnesty Days: ${singleSubordinateParams[8]}`;       
}

async function displayAttendanceEntries(subordinateIdFromUrl){

    const urlNeeded = `api/v1/attendance/${subordinateIdFromUrl}/all`;
    fetch(urlNeeded, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error getting Attendance.`);
        }
        console.log(`updated successfully.`);

        const userAttendanceList = reposnse.json();

        const counter = 0;
        userAttendanceList.forEach(attendanceEntry => {
            counter++;

            const param1 = `attendanceEntry${counter}`
            const param2 = `${attendanceEntry.date}`
            const htmlElementToBeAppended = 
            `<div class="attendance-check-item">
              <input type="checkbox" id="attendanceEntry${counter}"
              onchange="confirmOrUnconfirmAttendance(${param1},${param2})" name="attendance" />
              <label for="attendance"> ${attendanceEntry.date}</label>
            </div>
            `;
            const parentElement = document.getElementById('attendances-container');
            parentElement.appendChild(htmlElementToBeAppended);
            
        });

    })
    .catch(error => {
        console.error(`Error updating SuperiorID:`, error);
        openPopupFailed();
        throw error; 
    });

}

async function confirmOrUnconfirmAttendance(idOfHtmlElement, dateOfAttendance){
    const checkbox = document.getElementById(`${idOfHtmlElement}`);
    const urlNeeded = `api/v1/attendance/${subordinateId}/${dateOfAttendance}`;

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
            openPopupFailed();
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
            openPopupFailed();
            throw error; 
        });
      }
 
}

