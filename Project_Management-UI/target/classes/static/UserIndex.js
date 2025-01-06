function showWelcomeMessage() {
    document.getElementById('welcomeMessage').style.display = 'block';
	document.getElementById('userDetailsContainer').style.display = 'none';
	document.getElementById('userProjectListContainer').style.display = 'none';
}
function loadProjectsList(){
	document.getElementById('welcomeMessage').style.display = 'none';
	document.getElementById('userDetailsContainer').style.display = 'none';
	         const userProjectListContainer = document.getElementById('userProjectListContainer');
	        userProjectListContainer.style.display = 'block'; 
			userProject();	
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
        console.log(data); 
        displayUserDetails(data);
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
        alert('Error fetching details');
    });
}
function displayUserDetails(user) {
  //  const userListContainer = document.getElementById('userListContainer');
    const userDetailsContainer = document.getElementById('userDetailsContainer');
	document.getElementById('welcomeMessage').style.display = 'none';
	document.getElementById('userProjectListContainer').style.display = 'none';
   // userListContainer.style.display = 'none';
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
function userProject(){
	const email=sessionStorage.getItem('adminEmail');
	if (!email) {
	       alert("No User Login, please log in again.");
	       return;
	   }
	   fetch(`${BASE_URL}/api/project/getUserProjectDetails?email=${email}`, {
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
			         displayUserProjectDetails(data);
			     })
			     .catch(error => {
			         console.error('Error fetching user details:', error);
			         alert('Error fetching details');
			     });
			  
}
function displayUserProjectDetails(userProject) {
	const data=userProject[0];
	    console.log(data);
    const detailsContent = `
        <h2>UserProject Details</h2>
		<p><strong>Title:</strong> ${data.title || 'N/A'}</p>
        <p><strong>Started Date:</strong> ${data.start_date || 'N/A'}</p>
        <p><strong>End Date:</strong> ${data.end_date || 'N/A'}</p>
       
    `;
    userProjectListContainer.innerHTML = detailsContent;
}
function goBack() { 
    const userDetailsContainer = document.getElementById('userDetailsContainer');
	document.getElementById('welcomeMessage').style.display = 'none';
   // userListContainer.style.display = 'none';
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
