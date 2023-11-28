document.addEventListener('DOMContentLoaded', function () {
    addLoginEvenListener();
});

function addEditEventListener(){
    const sendButton = document.querySelector(".forgotPasswordButton");
    sendButton.addEventListener("click", (event) => {
        updateUser();
        updatePassword();
    });
}