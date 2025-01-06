function showWelcomeMessage() {
    document.getElementById('welcomeMessage').style.display = 'block';
    document.getElementById('userListContainer').style.display = 'none';
    document.getElementById('userCreationContainer').style.display = 'none';
	document.getElementById('userDetailsContainer').style.display = 'none';
	document.getElementById('projectListContainer').style.display = 'none';
	document.getElementById('updateUserContainer').style.display = 'none'; 
	document.getElementById('projectCreationContainer').style.display = 'none'; 
}
function loadUsersList(){
          document.getElementById('welcomeMessage').style.display = 'none';
		  document.getElementById('projectListContainer').style.display = 'none';
		  document.getElementById('updateUserContainer').style.display = 'none';
		  document.getElementById('projectCreationContainer').style.display = 'none'; 
           const userListContainer = document.getElementById('userListContainer');
          userListContainer.style.display = 'block'; 
		function loadUsersList() {
			fetchUsers();	
		}
		document.getElementById('userCreationContainer').style.display = 'none'; 
       }
function loadProjectsList(){
	document.getElementById('userCreationContainer').style.display = 'none'; 
	document.getElementById('welcomeMessage').style.display = 'none';
	document.getElementById('userDetailsContainer').style.display = 'none';
	document.getElementById('userListContainer').style.display = 'none';
	document.getElementById('updateUserContainer').style.display = 'none';
	         const projectListContainer = document.getElementById('projectListContainer');
	        projectListContainer.style.display = 'block'; 
		function loadProjectsList() {
			fetchProjects();
		}
	//document.getElementById('userCreationContainer').style.display = 'none'; 	
}
function loadUserCreationForm() {
    document.getElementById('userListContainer').style.display = 'none'; 
    document.getElementById('welcomeMessage').style.display = 'none'; 
	document.getElementById('userDetailsContainer').style.display = 'none';
	document.getElementById('updateUserContainer').style.display = 'none';
    fetch('User.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load user creation form.');
            return response.text();
        })
        .then(html => {
            document.getElementById('userCreationContainer').innerHTML = html;
            document.getElementById('userCreationContainer').style.display = 'block'; 
            loadScript('User.js');
        })
        .catch(error => {
            console.error('Error loading user creation form:', error);
        });
}
function loadProjectCreationForm() {
    document.getElementById('userListContainer').style.display = 'none'; 
    document.getElementById('welcomeMessage').style.display = 'none'; 
	document.getElementById('userDetailsContainer').style.display = 'none';
	document.getElementById('projectListContainer').style.display = 'none';
	document.getElementById('updateUserContainer').style.display = 'none';
    fetch('ProjectCreation.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load project creation form.');
            return response.text();
        })
        .then(html => {
            document.getElementById('projectCreationContainer').innerHTML = html;
            document.getElementById('projectCreationContainer').style.display = 'block'; 
            loadScript('ProjectCreation.js');
        })
        .catch(error => {
            console.error('Error loading project creation form:', error);
        });
}
function deleteUser(userId){
			//console.log(`Attempting to delete user with ID: ${userId}`);			
			//console.log('sdfksdjk'); 
			fetch(`${BASE_URL}/api/user/delete/${userId}`, {
			 method: 'DELETE',
				})
			.then(response => {
			if (!response.ok) throw new Error('Failed to delete user');
			return response.json();
			 })
			.then(data => {
			console.log(data.message); // Handle success message from server
										        // Refresh user list after deletion
				 loadUsersList();
			 })
			 .catch(error => {
			console.error('Error deleting user:', error);
		     });

		 }
function openUpdateForm(userId) {
	document.getElementById('welcomeMessage').style.display = 'none';
	document.getElementById('userListContainer').style.display = 'none';
	document.getElementById('userCreationContainer').style.display = 'none';
	document.getElementById('userDetailsContainer').style.display = 'none';
	document.getElementById('projectListContainer').style.display = 'none';
const userToUpdate = usersList.find(user => user.id === userId);
if (userToUpdate) {
		document.getElementById('userId').value = userToUpdate.id;
		document.getElementById('firstName').value = userToUpdate.firstName;
		document.getElementById('lastName').value = userToUpdate.lastName;
		document.getElementById('email').value = userToUpdate.email;
		document.getElementById('updateUserContainer').style.display = 'block'; 											 
				}
			}													
function submitUpdate() {
			const userId = document.getElementById('userId').value;
			const updatedUserData = {
			firstName: document.getElementById('firstName').value,
			lastName: document.getElementById('lastName').value,
			email: document.getElementById('email').value,
		};
	fetch(`${BASE_URL}/api/user/update/${userId}`, { // Adjust endpoint as necessary
				method: 'PUT', // or 'PATCH' depending on your API design
				headers: {
				'Content-Type': 'application/json',
			},
			  body: JSON.stringify(updatedUserData),
		  })
			.then(response => {
				if (!response.ok) throw new Error('Failed to update user');
							return response.json();
					})
			.then(data => {
					 console.log(data.message); // Handle success message from server
					 loadUsersList(); // Refresh user list after update
					//cancelUpdate(); // Hide update form after submission
				})
			.catch(error => {
				  console.error('Error updating user:', error);
			});
	}
function loadScript(scriptUrl) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.head.appendChild(script); 
}
function userDetails() {
    const email = sessionStorage.getItem('adminEmail'); 
    if (!email) {
        alert("No User Login, please log in again.");
        return;
    }
    fetch(`${BASE_URL}/api/user/getUserDetails?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log data to check its structure
        displayUserDetails(data);
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
        alert('Error fetching details');
    });
}
function displayUserDetails(user) {
    const userListContainer = document.getElementById('userListContainer');
    const userDetailsContainer = document.getElementById('userDetailsContainer');
	document.getElementById('userCreationContainer').style.display = 'none';
	document.getElementById('welcomeMessage').style.display = 'none';
	document.getElementById('projectListContainer').style.display = 'none';
	document.getElementById('updateUserContainer').style.display = 'none';
	document.getElementById('projectCreationContainer').style.display = 'none'; 
    userListContainer.style.display = 'none';
    userDetailsContainer.style.display = 'block';
const data=user[0];
    console.log(data)
    const detailsContent = `
        <h2>User Details</h2>
        <p><strong>First Name:</strong> ${data.firstName || 'N/A'}</p>
        <p><strong>Last Name:</strong> ${data.lastName || 'N/A'}</p>
        <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
        <p><strong>Role:</strong> ${data.role || 'N/A'}</p>
        <button class="btn btn-secondary" onclick="goBack()">Back</button>
    `;
    userDetailsContainer.innerHTML = detailsContent;
}
function goBack() {
    const userListContainer = document.getElementById('userListContainer');
    const userDetailsContainer = document.getElementById('userDetailsContainer');
	document.getElementById('projectListContainer').style.display = 'none';
	document.getElementById('welcomeMessage').style.display = 'none';
	document.getElementById('updateUserContainer').style.display = 'none';
    userListContainer.style.display = 'none';
    userDetailsContainer.style.display = 'none';
}
function toggleProfileMenu() {
   const profileSection = document.querySelector(".profile-section");
   profileSection.classList.toggle("active");
}
document.addEventListener('click', function(event) {
   const profileSection = document.querySelector('.profile-section');
   const profileIcon = document.querySelector('.profile-icon');

   if (!profileSection.contains(event.target) && event.target !== profileIcon) {
       profileSection.classList.remove("active");
   }   
});

const mobileScreen = window.matchMedia("(max-width: 990px)");
$(document).ready(function () {
	console.log("Document is ready!");   
	$(".dashboard-nav-dropdown-toggle").click(function () {
		$(this).closest(".dashboard-nav-dropdown")
			.toggleClass("show")
			.find(".dashboard-nav-dropdown")
			.removeClass("show");
		$(this).parent()
			.siblings()
			.removeClass("show");
	});  
	$(".menu-toggle").click(function () {
		if (mobileScreen.matches) {
			$(".dashboard-nav").toggleClass("mobile-show");
		} else {
			$(".dashboard").toggleClass("dashboard-compact");
		}
	});
});
