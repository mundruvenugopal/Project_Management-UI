const BASE_URL = 'http://localhost:8080';
document.getElementById('roleForm').addEventListener('submit', function(event) {
	event.preventDefault();
	   clearErrors();
	  /* const isValid = validateForm();
	   if (!isValid) return; */
    addRole(); 
});
/*function validateForm() {
    let isValid = true;
    const nameInput = document.getElementById('Name').value.trim();
    const nameError = document.getElementById('nameError');

   
    if (!nameInput) {
        nameError.textContent = "Role name is required.";
        nameError.style.display = 'block';
        isValid = false;
    } else if (nameInput.length > 20) {
        nameError.textContent = "Role name must not exceed 20 characters.";
        nameError.style.display = 'block';
        isValid = false;
    }

    return isValid;
}*/
function clearErrors() {
    const errorMessages = document.querySelectorAll('.text-danger');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}
function addRole() {
    const roleData = {
        Name: document.getElementById('Name').value, 
    };
    fetch(BASE_URL+'/api/role/saveRole', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').innerText = data; 
        document.getElementById('message').style.display = 'block';
        clearForm(); 
    })
    .catch(error => console.error('Error:', error));
}
function clearForm() {
  document.getElementById('Name').value = ''; 
}
