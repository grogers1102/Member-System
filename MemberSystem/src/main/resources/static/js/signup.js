console.log("DOM LOADED!");

(function (){
    const signup = null;
    window.addEventListener("DOMContentLoaded", ()=>{
        console.log("DOM LOADED!", signup)
        const createAccountButton = document.getElementsByClassName("createAccountBox");
        console.log("createAccountButton", createAccountButton);
        createAccountButton.item(0).addEventListener("click", ()=>{
            console.log("CLICKED!", createAccountButton)
            submitSignupForm();
        })
    });

    function submitSignupForm(){

        const firstName = document.getElementsByTagName('input').namedItem('firstName');
        const lastName = document.getElementsByTagName('input').namedItem('lastName');
        const email = document.getElementsByTagName('input').namedItem('email');
        const password = document.getElementsByTagName('input').namedItem('password');
        const confirmPassword = document.getElementsByTagName('input').namedItem('confirmPassword');

        if(
            firstName.value !== "", 
            lastName.value !== "",
            email.value !== "",
            password.value !== "",
            confirmPassword.value !== ""
        ){
            if(password.value !== confirmPassword.value){
                alert("Password must match!!!");
                return;
            }
            const httpRequest = new XMLHttpRequest();
            if (!httpRequest) {
                alert("Giving up :( Cannot create an XMLHTTP instance");
                return false;
              }
              const urlNeeded = '/api/v1/auth/signup';
              httpRequest.open('POST', urlNeeded, true);
              httpRequest.setRequestHeader(
                  "Content-Type",
                  "application/x-www-form-urlencoded",
                  );
                  httpRequest.onreadystatechange = () => {
      
                      if (httpRequest.readyState === XMLHttpRequest.DONE) {
                          // Everything is good, the response was received.
                          // Process the server response here.
                          // 1. clear all field values
                          // 2. route to dashboard on success
                          // 3. else show alert error
                          if (httpRequest.status === 200) {
                              alert(httpRequest.responseText);
                            } else {
                              alert("There was a problem with the request.");
                            }
                        } else {
                          // Not ready yet.
                        }
      
                    };

              //Send the proper header information along with the request
              httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            var params = new Object();
            params.firstName = firstName.value;
            params.lastName = lastName.value;
            params.email = email.value;
            params.password = password.value;
            params.confirmPassword = confirmPassword.value;

            // Turn the data object into an array of URL-encoded key/value pairs.
            let urlEncodedData = "", urlEncodedDataPairs = [], name;
            for( name in params ) {
                urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(params[name]));
            }
            console.log(params, urlEncodedDataPairs.join(''));
            httpRequest.send(urlEncodedDataPairs.join(''));
            
        }
        else{
            alert("all fields are required!")
        }

    }


})();




