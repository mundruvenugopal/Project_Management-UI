document.addEventListener('DOMContentLoaded', () => {
let projects = [];
let currentPage = 1;
	   let projectsPerPage = 5; 
    function fetchProjects() {
        fetch(`${BASE_URL}/api/project/getAllProjects`)
            .then(response => response.json())
            .then(data => {		
                projects = data;
                renderProjects();
                setupPagination();	
            })
            .catch(error => console.error('Error fetching projects:', error));
    }
    function renderProjects() {
        const tableBody = document.querySelector('#projectTable tbody');
        tableBody.innerHTML = '';
        const startIndex = (currentPage - 1) * projectsPerPage;		
        const endIndex = Math.min(startIndex + projectsPerPage, projects.length);		
        for (let i = startIndex; i < endIndex; i++) {
            const project = projects[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${i + 1}</td>				
                <td>${project.title}</td>				
				<td>${project.start_date}</td>
				<td>${project.end_date}</td>
				<td>
				<a onclick="openUpdateForm('${project.id}')" class="btn btn-info btn-sm">Update</a>
				<a onclick="deleteUser('${project.id}')" class="btn btn-danger btn-sm">Delete</a>
				 </td>
            `;
            tableBody.appendChild(row);	
        }
    }
    function setupPagination() {
        const paginationControls = document.getElementById('paginationControls');
        paginationControls.innerHTML = '';
        if (projects.length === 0) return;
        const totalPages = Math.ceil(projects.length / projectsPerPage);
        const prevButton = document.createElement('li');
        prevButton.className = `page-item${currentPage === 1 ? ' disabled' : ''}`;
        prevButton.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>`;
        paginationControls.appendChild(prevButton);
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item${currentPage === i ? ' active' : ''}`;
            pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
            paginationControls.appendChild(pageItem);
        }
        const nextButton = document.createElement('li');
        nextButton.className = `page-item${currentPage === totalPages ? ' disabled' : ''}`;
        nextButton.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>`;
        paginationControls.appendChild(nextButton);
    }
    function changePage(page) {
        const totalPages = Math.ceil(projects.length / projectsPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderUsers();
            setupPagination();
        }
    }
    function updatePageSize() {
        const dropdown = document.getElementById('pageSizeDropdown');
        projectsPerPage = parseInt(dropdown.value);
        currentPage = 1; 
        renderUsers();
        setupPagination();
    }
    fetchProjects();
    window.changePage = changePage;
    window.updatePageSize = updatePageSize;
});
	