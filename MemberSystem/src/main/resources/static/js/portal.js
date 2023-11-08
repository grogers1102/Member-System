
// Check if authenticated
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken) {
        //window.location.href = '../login.html'; 
    } else {
        // Something else
    }
});

document.addEventListener('DOMContentLoaded', function(){
    const logoutButton = document.querySelector(".log-out a");
    logoutButton.addEventListener("click", (event) => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        if (token || refreshToken){
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
        }
        window.location.href = '../index.html';
    });
})
    
    function submitLogoutForm(){
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        if (token || refreshToken){
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        }

        window.location.href='index.html'
    }
