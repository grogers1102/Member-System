document.addEventListener('DOMContentLoaded', async function () {
    if (isTokenValid()){
        await displayMenu();
        await displayBranchIcon();
        logoutEventListener();
        
    }
});

function isTokenValid(){

  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!token || !refreshToken){
      return true; // CHANGE LATER
  }
  else{
      return true;
  }
}

async function displayMenu(){
    const menuContainer = document.getElementById("portalID");
    const menuHTML = 
    `<div class="sidebar">
    <img src="../images/BETTERLogo.svg" class="logo" />
    <ul class="menu">
      <li>
        <a href="portal.html">
          <i class="fa-solid fa-house"></i>
          <span>Home</span>
        </a>
      </li>
      <li>
        <a href="accountPage.html">
          <i class="fa-solid fa-user"></i>
          <span>Profile</span>
        </a>
      </li>
      <li>
        <a href="viewSubordinates.html">
          <i class="fa-solid fa-person"></i>
          <span>Subordinates</span>
        </a>
      </li>
      <li>
        <a href="myAttendance.html">
          <i class="fa-solid fa-square-poll-horizontal"></i>
          <span>Attendance</span>
        </a>
      </li>
      
      <li class="log-out">
        <a href="../index.html">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>Log Out</span>
        </a>
      </li>
    </ul>
  </div>`;

  menuContainer.insertAdjacentHTML('afterbegin', menuHTML);
}

function logoutEventListener(){
    const logoutButton = document.querySelector(".log-out a");
    logoutButton.addEventListener("click", (event) => {
        logout();
    });
}

async function displayBranchIcon(userOBJ) {

    branchExists = document.querySelector('.sidebar .branch-element')

    if (!userOBJ || !userOBJ.rank || branchExists) {
        return;
    }

    const rank = userOBJ.rank;

    const element = document.querySelector('.sidebar .menu');

    const listElement = document.createElement('li');
    const anchorElement = document.createElement('a');
    const iconElement = document.createElement('i');
    const spanElement = document.createElement('span');

    listElement.className='branch-element';

    anchorElement.href = 'branchPage.html';

    iconElement.className = 'fa-solid fa-location-dot'; 

    spanElement.textContent = 'Branch';

    if (rank.rankId > 2) {
        anchorElement.href = 'higherBranchPage.html';
    }

    anchorElement.appendChild(iconElement);
    anchorElement.appendChild(spanElement);

    listElement.appendChild(anchorElement);
    element.appendChild(listElement);
}
