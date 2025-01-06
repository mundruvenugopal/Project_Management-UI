/*const BASE_URL = 'http://localhost:8080'; */
document.getElementById('projectCreationForm').addEventListener('submit',function(event) {
	event.preventDefault(); 
	clearErrors();
	addProject();
	})
	function addProject(){
		const projectData={
			title:document.getElementById('title').value,
			is_active: true,
		};
		fetch(BASE_URL+'/api/project/saveProject',
			{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify(projectData),
		})
		  .then(response => response.text())
		  .then(data => {
		         document.getElementById('message').innerText = data; 
		         document.getElementById('message').style.display = 'block';
		         clearForm(); 
				 document.getElementById('projectCreationContainer').style.display = 'none';   
				       document.getElementById('projectListContainer').style.display = 'block';
				 fetchProjects();
		     })
		.catch(error => console.error('Error:', error));
	}	
	function clearErrors() {
	    const errors = document.querySelectorAll('.error');
	    errors.forEach(error => {
	        error.textContent = '';
	        error.style.display = 'none';
	    });
	}
	function clearForm() {
	    document.getElementById('title').value = '';
	}