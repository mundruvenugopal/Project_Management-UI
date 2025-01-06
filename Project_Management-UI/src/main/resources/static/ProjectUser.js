const BASE_URL='http://localhost:8080';
fetchProjects();
fetchUsers();
document.getElementById('projectUserForm').addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors(); 
    addProjectUser(); 
});
function fetchProjects() {
    fetch(BASE_URL+'/api/project/allProjects', { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch projects.');
            }
            return response.json();
        })
        .then(projects => {
            const projectsDropdown = document.getElementById('project');
            projects.forEach(project => {
                const option = document.createElement('option');
                option.value = project.id; 
				//console.log(project.id);
                option.textContent = project.title;
                projectsDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching project:', error);
            document.getElementById('message').innerText = 'Unable to load projects.';
        });
}
function fetchUsers() {
    fetch(BASE_URL+'/api/user/allUsers', { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch users.');
            }
            return response.json();
        })
        .then(users => {
            const usersDropdown = document.getElementById('user');
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id; 
                option.textContent = user.firstName;
                usersDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            document.getElementById('message').innerText = 'Unable to load users.';
        });
}
function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}
function addProjectUser() {
	const projectId = document.getElementById('project').value;
	    const userId = document.getElementById('user').value;
		console.log('Selected Project ID:', projectId);
		 console.log('Selected User ID:', userId);
		 if (!projectId || !userId) {
		        document.getElementById('message').innerText = 'Please select both a project and a user.';
		        document.getElementById('message').classList.add('alert-danger');
		        document.getElementById('message').style.display = 'block';
		        return;
		    }
    const projectUserData = {     
		project_id: projectId,
		user_id: userId,
        is_active: true,
    };
	console.log('Selected Project ID:', projectId),
	console.log('Selected User ID:', userId),
    fetch(BASE_URL+'/api/projectuser/saveProjectUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectUserData),
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
        console.log('ProjectUser created successfully:', data);
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
    document.getElementById('project').value = ''; 
	document.getElementById('user').value = ''; 
}