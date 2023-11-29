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
        <a href="viewSubordinates.html">
          <i class="fa-solid fa-person"></i>
          <span>Subordinates</span>
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
  displayRankAssignPageOrNot();
}

async function displayRankAssignPageOrNot(){

  const userId = localStorage.getItem("userId");
  const urlNeeded = '/api/v1/user/' + userId;
  const response = await fetch(urlNeeded);

  if (!response.ok) {
      throw new Error('There was a problem with the request.');
  }
  const userOBJ = await response.json();
  userRank = userOBJ.rank

  if(userRank.rankId >= 5){
    const menuContainerToAddAssignPage = document.getElementById("menuContID");
    const assignSubHTML = 
    `<li class="assignRanksPage">
        <a href="../portalPages/rankFiveAssignSubordinatePage.html">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>Assign Ranks</span>
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
