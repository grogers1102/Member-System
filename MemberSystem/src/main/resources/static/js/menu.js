document.addEventListener('DOMContentLoaded', async function () {
    if (isTokenValid()){
        await displayMenu();
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
    <ul class="menu" id="menuContID">
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
        <a href="attendance.html">
          <i class="fa-solid fa-calendar-days"></i>
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
  insertOtherPagesOrNot();
}

async function insertOtherPagesOrNot(){

  const userId = localStorage.getItem("userId");
  const urlNeeded = '/api/v1/user/' + userId;
  const response = await fetch(urlNeeded);

  if (!response.ok) {
      throw new Error('There was a problem with the request.');
  }
  const userOBJ = await response.json();
  userRank = userOBJ.rank

  if(userRank.rankId >= 3){
    const menuContainerToAddAssignPage = document.getElementById("menuContID");
    const assignSubHTML = 
    `<li class="assignRanksPage">
        <a href="../portalPages/higherBranchPage.html">
          <i class="fa-solid fa-school"></i>
          <span>Branch </span>
        </a>
      </li>`;
      menuContainerToAddAssignPage.insertAdjacentHTML('beforeend', assignSubHTML);
  }
  if(userRank.rankId >= 2){
    const menuContainerToAddAssignPage = document.getElementById("menuContID");
    const assignSubHTML = 
      `<li>
        <a href="viewSubordinates.html">
          <i class="fa-solid fa-person"></i>
          <span>Subordinates</span>
        </a>
      </li>`;
      menuContainerToAddAssignPage.insertAdjacentHTML('beforeend', assignSubHTML);
  }
  if(userRank.rankId >= 5){
    const menuContainerToAddAssignPage = document.getElementById("menuContID");
    const assignSubHTML = 
    `<li class="assignRanksPage">
        <a href="../portalPages/assign.html">
          <i class="fa-solid fa-list"></i>
          <span>Assign </span>
        </a>
      </li>`;
      menuContainerToAddAssignPage.insertAdjacentHTML('beforeend', assignSubHTML);
  }
}

function logoutEventListener(){
    const logoutButton = document.querySelector(".log-out a");
    logoutButton.addEventListener("click", (event) => {
        logout();
    });
}


