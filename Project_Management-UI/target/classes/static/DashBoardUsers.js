document.addEventListener('DOMContentLoaded',()=>{
	usersCount();
	activeCount();
	inActiveCount();
	projectsCount();
	projectsActiveCount();
	projectsInActiveCount();
});
function usersCount(){
	fetch(`${BASE_URL}/api/user/getAllUsers`)
		           .then(response => response.json())
		           .then(data => {
					const userCount=data.length;
					document.getElementById('userCount').textContent=userCount;
})
}
  function activeCount(){
	fetch(`${BASE_URL}/api/user/usersActiveCount`)
	.then(response => response.json())
	.then(data=>{
		const usersActiveCount=data;
		document.getElementById('usersActiveCount').textContent=usersActiveCount;
	})
  }
  function inActiveCount(){
  	fetch(`${BASE_URL}/api/user/usersInActiveCount`)
  	.then(response => response.json())
  	.then(data=>{
  		const usersInActiveCount=data;
  		document.getElementById('inActiveUsersCount').textContent=usersInActiveCount;
  	})
    }
	function projectsCount(){
		fetch(`${BASE_URL}/api/project/getAllProjects`)
			           .then(response => response.json())
			           .then(data => {
						   const projectsCount=data.length;
						   document.getElementById('projectsCount').textContent=projectsCount;
	})
	}
	function projectsActiveCount(){
		fetch(`${BASE_URL}/api/project/projectsActiveCount`)
		.then(response => response.json())
		.then(data=>{
			const projectsActiveCount=data;
			document.getElementById('projectsActiveCount').textContent=projectsActiveCount;
		})
	  }
	 function projectsInActiveCount(){
		fetch(`${BASE_URL}/api/project/projectsInActiveCount`)
		.then(response=>response.json())
		.then(data=>{
			const projectsInActiveCount=data;
			document.getElementById('projectsInActiveCount').textContent=projectsInActiveCount;
		})
	 }