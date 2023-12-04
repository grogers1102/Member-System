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
            localBranch,
            phoneNumber,
            rank,
            email,
            superiorId,
            amnestyDays,
            address
        } = userOBJ;

        document.getElementById("name-id").textContent = `${firstName} ${lastName}`;
        document.querySelector(".user-id").textContent = `User ID: ${subordinateId}`;
        document.getElementById("branch-id").textContent = `Branch ID: ${localBranch.branchId}`;
        document.getElementById("rank-id").textContent = `Rank Level: ${rank.rankId}`;
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

async function addAttendance() {
    const popupContainerAdd = document.getElementById("popupContainer");
    const closePopupBtnAdd = document.getElementById("closePopupBtn");
    const submitButtonAdd = document.getElementById("submitButton");
    popupContainerAdd.style.display = "block";

    submitButtonAdd.addEventListener("click", async () => {
        const inputElement = document.querySelector('#date input[name="date"]');
        const inputValue = inputElement.value;

        const attendanceID = {
            userId: parseInt(subordinateId),
            date: inputValue
        };

        const params = {
            attendanceID: attendanceID,
            isConfirmed: true
        };

        try {
            const urlNeededAttendance = `/api/v1/attendance/add`;
            const response = await fetch(urlNeededAttendance, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error(`Error adding Attendance.`);
            } else {
                alert("Successfully added subordinate's attendance");
                window.location = `viewSingleSubordinate.html?userId=${subordinateId}`;
            }
        } catch (error) {
            console.error(`Error adding Attendance:`, error);
            // openPopupFailed();
            throw error;
        }
    });

    closePopupBtnAdd.addEventListener("click", () => {
        popupContainerAdd.style.display = "none";
    });

    // Close the popup when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === popupContainerAdd) {
            popupContainerAdd.style.display = "none";
        }
    });
}

async function deleteAttendance() {
    const popupContainer = document.getElementById("deletepopupContainer");
    const closePopupBtn = document.getElementById("deleteclosePopupBtn");
    const submitButtonDelete = document.getElementById("deletesubmitButton");
    popupContainer.style.display = "block";

    submitButtonDelete.addEventListener("click", async () => {
        const inputElement = document.querySelector('#deletedate input[name="date"]');
        const inputValue = inputElement.value;

        const attendanceID = {
            userId: subordinateId,
            date: inputValue
        };

        const params = {
            attendanceID: attendanceID,
            isConfirmed: true
        };

        try {
            const urlNeeded = `/api/v1/attendance/delete`;
            const response = await fetch(urlNeeded, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error(`Error deleting Attendance.`);
            } else {
                alert("Successfully deleted subordinate's attendance");
                redirect(); // You need to define the redirect function
            }
        } catch (error) {
            console.error(`Error deleting Attendance:`, error);
            // openPopupFailed();
            throw error;
        }
    });

    closePopupBtn.addEventListener("click", () => {
        popupContainer.style.display = "none";
    });

    // Close the popup when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === popupContainer) {
            popupContainer.style.display = "none";
        }
    });
}

function redirect() {
    window.location=`viewSingleSubordinate.html?userId=${subordinateId}`;
}

async function addAttendance() {
    const popupContainerAdd = document.getElementById("popupContainer");
    const closePopupBtnAdd = document.getElementById("closePopupBtn");
    const submitButtonAdd = document.getElementById("submitButton");
    popupContainerAdd.style.display = "block";

    submitButtonAdd.addEventListener("click", async () => {
        const inputElement = document.querySelector('#date input[name="date"]');
        const inputValue = inputElement.value;

        const attendanceID = {
            userId: parseInt(subordinateId),
            date: inputValue
        };

        const params = {
            attendanceID: attendanceID,
            isConfirmed: true
        };

        try {
            const urlNeededAttendance = `/api/v1/attendance/add`;
            const response = await fetch(urlNeededAttendance, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error(`Error adding Attendance.`);
            } else {
                alert("Successfully added subordinate's attendance");
                window.location = `viewSingleSubordinate.html?userId=${subordinateId}`;
            }
        } catch (error) {
            console.error(`Error adding Attendance:`, error);
            // openPopupFailed();
            throw error;
        }
    });

    closePopupBtnAdd.addEventListener("click", () => {
        popupContainerAdd.style.display = "none";
    });

    // Close the popup when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === popupContainerAdd) {
            popupContainerAdd.style.display = "none";
        }
    });
}

async function deleteAttendance() {
    const popupContainer = document.getElementById("deletepopupContainer");
    const closePopupBtn = document.getElementById("deleteclosePopupBtn");
    const submitButtonDelete = document.getElementById("deletesubmitButton");
    popupContainer.style.display = "block";

    submitButtonDelete.addEventListener("click", async () => {
        const inputElement = document.querySelector('#deletedate input[name="date"]');
        const inputValue = inputElement.value;

        const attendanceID = {
            userId: subordinateId,
            date: inputValue
        };

        const params = {
            attendanceID: attendanceID,
            isConfirmed: true
        };

        try {
            const urlNeeded = `/api/v1/attendance/delete`;
            const response = await fetch(urlNeeded, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error(`Error deleting Attendance.`);
            } else {
                alert("Successfully deleted subordinate's attendance");
                redirect(); // You need to define the redirect function
            }
        } catch (error) {
            console.error(`Error deleting Attendance:`, error);
            // openPopupFailed();
            throw error;
        }
    });

    closePopupBtn.addEventListener("click", () => {
        popupContainer.style.display = "none";
    });

    // Close the popup when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === popupContainer) {
            popupContainer.style.display = "none";
        }
    });
}

function redirect() {
    window.location=`viewSingleSubordinate.html?userId=${subordinateId}`;
}

async function addAttendance() {
    const popupContainerAdd = document.getElementById("popupContainer");
    const closePopupBtnAdd = document.getElementById("closePopupBtn");
    const submitButtonAdd = document.getElementById("submitButton");
    popupContainerAdd.style.display = "block";

    submitButtonAdd.addEventListener("click", async () => {
        const inputElement = document.querySelector('#date input[name="date"]');
        const inputValue = inputElement.value;

        const attendanceID = {
            userId: parseInt(subordinateId),
            date: inputValue
        };

        const params = {
            attendanceID: attendanceID,
            isConfirmed: true
        };

        try {
            const urlNeededAttendance = `/api/v1/attendance/add`;
            const response = await fetch(urlNeededAttendance, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error(`Error adding Attendance.`);
            } else {
                alert("Successfully added subordinate's attendance");
                window.location = `viewSingleSubordinate.html?userId=${subordinateId}`;
            }
        } catch (error) {
            console.error(`Error adding Attendance:`, error);
            // openPopupFailed();
            throw error;
        }
    });

    closePopupBtnAdd.addEventListener("click", () => {
        popupContainerAdd.style.display = "none";
    });

    // Close the popup when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === popupContainerAdd) {
            popupContainerAdd.style.display = "none";
        }
    });
}

async function deleteAttendance() {
    const popupContainer = document.getElementById("deletepopupContainer");
    const closePopupBtn = document.getElementById("deleteclosePopupBtn");
    const submitButtonDelete = document.getElementById("deletesubmitButton");
    popupContainer.style.display = "block";

    submitButtonDelete.addEventListener("click", async () => {
        const inputElement = document.querySelector('#deletedate input[name="date"]');
        const inputValue = inputElement.value;

        const attendanceID = {
            userId: subordinateId,
            date: inputValue
        };

        const params = {
            attendanceID: attendanceID,
            isConfirmed: true
        };

        try {
            const urlNeeded = `/api/v1/attendance/delete`;
            const response = await fetch(urlNeeded, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error(`Error deleting Attendance.`);
            } else {
                alert("Successfully deleted subordinate's attendance");
                redirect(); // You need to define the redirect function
            }
        } catch (error) {
            console.error(`Error deleting Attendance:`, error);
            // openPopupFailed();
            throw error;
        }
    });

    closePopupBtn.addEventListener("click", () => {
        popupContainer.style.display = "none";
    });

    // Close the popup when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === popupContainer) {
            popupContainer.style.display = "none";
        }
    });
}

function redirect() {
    window.location=`viewSingleSubordinate.html?userId=${subordinateId}`;
}

function redirectEdit() {
    window.location=`editSubordinate.html?userId=${subordinateId}`;
}