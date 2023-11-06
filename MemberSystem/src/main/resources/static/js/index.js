document.addEventListener('DOMContentLoaded', function() {
    const portalButton = document.querySelector('.learn-more-btn');

    // Check if authenticated
    portalButton.addEventListener('click', function(event) {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!token || !refreshToken) {
            event.preventDefault();
            window.location.href = '../login.html'; 
        } else {
            // Something else
        }
    });
});
