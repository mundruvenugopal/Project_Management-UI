fetchRoles();
document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors(); 
    addUser(); 
});
function fetchRoles() {
    fetch(`${BASE_URL}/api/role/allRoles`, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch roles.');
            }
            return response.json();
        })
        .then(roles => {
            const roleDropdown = document.getElementById('role');
            roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role.id; 
                option.textContent = role.name;
                roleDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching roles:', error);
            document.getElementById('message').innerText = 'Unable to load roles.';
        });
}
function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}
function addUser() {
    const userData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        roleId: parseInt(document.getElementById('role').value),
        is_active: true,
    };

    fetch(`${BASE_URL}/api/user/saveUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {	
                displayValidationErrors(error);
                throw new Error(error.message); 
            });
        }
        return response.json(); 
    })
    .then(data => {
        const messageElement = document.getElementById('message');
        messageElement.innerText = data.message;
        messageElement.classList.add('alert-success');
        messageElement.style.display = 'block';      
        clearForm(); 
        console.log('User created successfully:', data);        
        document.getElementById('userCreationContainer').style.display = 'none';   
        document.getElementById('userListContainer').style.display = 'block';          
        fetchUsers(); 
    })
    .catch(error => {
        document.getElementById('message').innerText = error.message;
        document.getElementById('message').classList.add('alert-danger');
        console.error('Error:', error);
    });
}
function displayValidationErrors(errors) {
    Object.entries(errors).forEach(([field, message]) => {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    });
}
function clearForm() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('role').value = ''; 
}