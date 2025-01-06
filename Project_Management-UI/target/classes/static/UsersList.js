document.addEventListener('DOMContentLoaded', () => {
let users=[];
let currentPage = 1;
let usersPerPage = 5; 
    function fetchUsers() {
        fetch(`${BASE_URL}/api/user/getAllUsers`)
            .then(response => response.json())
            .then(data => {
                users = data;
				usersList=data;
                renderUsers();
                setupPagination();			
            })
            .catch(error => console.error('Error fetching users:', error));
    }	 
    function renderUsers() {
        const tableBody = document.querySelector('#userTable tbody');
        tableBody.innerHTML = '';
        const startIndex = (currentPage - 1) * usersPerPage;
		//const userCount=users.length;
        const endIndex = Math.min(startIndex + usersPerPage, users.length);
		//document.getElementById('userCount').textContent = userCount;
        for (let i = startIndex; i < endIndex; i++) {
            const user = users[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${i + 1}</td>
				<td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
				<td>${user.created_on}</td>
				<td>${user.created_by}</td>
				<td>${user.role}</td>
				<td>
				     <a onclick="openUpdateForm('${user.id}')" class="btn btn-info btn-sm">Update</a>
				      <a onclick="deleteUser('${user.id}')" class="btn btn-danger btn-sm">Delete</a>
				 </td>
            `;
            tableBody.appendChild(row);	
        }
    }

    function setupPagination() {
        const paginationControls = document.getElementById('paginationControls');
        paginationControls.innerHTML = '';
        if (users.length === 0) return;
        const totalPages = Math.ceil(users.length / usersPerPage);
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
        const totalPages = Math.ceil(users.length / usersPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderUsers();
            setupPagination();
        }
    }
    function updatePageSize() {
        const dropdown = document.getElementById('pageSizeDropdown');
        usersPerPage = parseInt(dropdown.value);
        currentPage = 1; 
        renderUsers();
        setupPagination();
    }
    fetchUsers(); 
    window.changePage = changePage;
    window.updatePageSize = updatePageSize;
});