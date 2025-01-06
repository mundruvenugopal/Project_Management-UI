const BASE_URL = 'http://localhost:8080'; 
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
	    clearErrors();
	    const isValid = validateForm();
	    if (!isValid) return;
    	loginUser(); 
});
function validateForm() {
    let isValid = true;
    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError'); 
 //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput) {
        emailError.textContent = "Email is required.";
        emailError.style.display = 'block';
        isValid = false;
    } 

    if (!passwordInput) {
        passwordError.textContent = "Password is required.";
        passwordError.style.display = 'block';
        isValid = false;
    }

    return isValid;
}
function clearErrors() {
    const errorMessages = document.querySelectorAll('.text-danger');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}
function loginUser() {
    const loginData = {
        email: document.getElementById('email').value, 
        password: document.getElementById('password').value
    };
	fetch(BASE_URL + '/api/admin/adminlogin', {
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(loginData),
	})
	.then(response => {
	        if (!response.ok) {
	            return response.json().then(error => { throw new Error(error.message); });
	        }
	        return response.json(); // Parse the response as JSON
	    })
	    .then(data => {
	        // Access the value of the 'message' key
			console.log(data.role);
	       // const message = data.message;
			console.log(data);
	       /* console.log(message); // Log the message value to the console
	        document.getElementById('message').innerText = message;
	        document.getElementById('message').classList.add('alert-success');
	        document.getElementById('message').style.display = 'block';*/
	        clearForm(); 
			
			// Storing login details in sessionStorage
			sessionStorage.setItem('adminEmail', loginData.email); 
			//sessionStorage.setItem('isAuthenticated', 'true');
			if(data.role==="Admin"){
				        window.location.href = 'Index.html';
						}
						else
						{
							window.location.href='UserIndex.html';
						}
	    })
	.catch(error => {
	    document.getElementById('message').innerText = error.message;
	    document.getElementById('message').classList.add('alert-danger');
	    document.getElementById('message').style.display = 'block';
	    console.error('Error:', error);
	});
}
function clearForm() {
  document.getElementById('email').value = ''; 
  document.getElementById('password').value='';
}