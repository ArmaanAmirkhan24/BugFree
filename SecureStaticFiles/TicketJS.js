const ticketCreationForm = document.getElementById("ticketCreationForm");

// Toggle column visibility
document.querySelectorAll('#columnSelector input').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const column = this.dataset.column;
        const isVisible = this.checked;

        // Update header
        document.querySelectorAll(`th[data-column="${column}"]`).forEach(th => {
            th.style.display = isVisible ? '' : 'none';
        });

        // Update cells
        document.querySelectorAll(`td[data-column="${column}"]`).forEach(td => {
            td.style.display = isVisible ? '' : 'none';
        });
    });
});

// Expandable description
$(document).on("click",".description-cell" ,function () {
        // Close other expanded descriptions
        document.querySelectorAll('.description-cell.expanded').forEach(expandedCell => {
            if (expandedCell !== this) {
                expandedCell.classList.remove('expanded');
            }
        });

        // Toggle current
        this.classList.toggle('expanded');
    
});

// Close description when clicking outside
$(document).on("click",".description - cell", function (e) {
    if (!e.target.closest('.description-cell')) {
        document.querySelectorAll('.description-cell.expanded').forEach(cell => {
            cell.classList.remove('expanded');
        });
    }
});
function showOrHideTicketForm() {
    ticketCreationForm.classList.remove("was-validated");
    if (ticketCreationForm.style.display === "none")
        ticketCreationForm.style.display = "block";
    else
        ticketCreationForm.style.display = "none"
}
document.getElementById("addTicket").addEventListener("click", showOrHideTicketForm);
document.getElementById("cancelTicket").addEventListener("click", showOrHideTicketForm);

async function createTicket() {
    ticketCreationForm.classList.remove("was-validated");
    const token = $('input[name="__RequestVerificationToken"]', $(ticketCreationForm)).val();
    const ticketCategory = $("#ticketCategory").val();
    const ticketPriority = $("#ticketPriority").val();
    const ticketDescription = $("#ticketDescription").val();
    const ticketDeadline = $("#deadline").val();
    const projId = $(ticketCreationForm).data("id");
    const urlCreateTicket = $(ticketCreationForm).data("url");
   
    
    if (ticketDescription.match(/^\s*$/) || ticketCategory.match(/^\s*$/) || ticketPriority.match(/^\s*$/) || ticketDeadline === "") {
        ticketCreationForm.classList.add("was-validated");
        return false;
    }
    const myHeaders = new Headers()
    const ticket = {
        id: 0,
        category: ticketCategory,
        description: ticketDescription,
        deadline: ticketDeadline,
        priority: ticketPriority,
        projectId: projId
    };
    myHeaders.append("RequestVerificationToken", token);
    myHeaders.append("Content-Type", "application/json");
    const request = new Request(urlCreateTicket, {
        headers: myHeaders,
        body: JSON.stringify(ticket),
        method : "POST"
    });
    const response = await fetch(request);
    if (!response.ok) {
        alert(response.status);
    }
    else {
        const responseBody = await response.json();
        const responseDeadline = responseBody.deadline.split("T");
       
        const [year, month, day] = responseDeadline[0].split("-");
        const finalDeadline = `${day}/${month}/${year} ` + responseDeadline[1];

        $("tbody").append(`<tr class="ticket-row" data-id="${responseBody.id}">
                        <td data-column="id">BF-${responseBody.id}</td>
                        <td data-column="description" class="description-cell">
                            <div class="short-desc">${responseBody.description}</div>
                            <div class="full-desc">${responseBody.description}</div>
                        </td>
                        <td data-column="priority">
                          <div class="priority-display">
                           <div class="priority-circle priority-${responseBody.priority.toLowerCase()}">${responseBody.priority.charAt(0)}</div>
                            <span>${responseBody.priority}</span>
                          </div>
                        </td>
                        <td data-column="category">${responseBody.category}</td>
                        <td data-column="deadline" class="deadline">${finalDeadline}</td>
                        <td data-column="raised">
                            <div class="user-cell">

                                <span>${responseBody.username}</span>
                            </div>
                        </td>
                        <td data-column="modified">
                            <div class="user-cell">

                                <span>${responseBody.username}</span>
                            </div>
                        </td>
                        <td>
                            <div class="dropstart">
                                <button class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                    </svg>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Something elset</a></li>
                                    <li><a class="dropdown-item delete-ticket-link">Delete</a></li>
                                    <li><a class="dropdown-item edit-ticket-link">Edit</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    `);
    }


}
document.getElementById("cancelTicket").previousElementSibling.addEventListener("click", createTicket);
async function deleteTicket() {
    
    const ticketRow = this.closest(".ticket-row");
    const id = $(ticketRow).data("id");
   
    const ticketDeletionForm = document.getElementById("ticketDeletionForm");
    const token = $('input[name=__RequestVerificationToken]', $(ticketDeletionForm)).val();
    const urlDelete = $('input[name="url"]', $(ticketDeletionForm)).val();
    
    const myHeaders = new Headers();
    myHeaders.append("RequestVerificationToken", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
    const request = new Request(urlDelete, {
        method: "POST",
        headers: myHeaders,
        body: new URLSearchParams({
            ticketId: id
        })
    });
    const response = await fetch(request);
    if (!response.ok) {
        alert(response.status);
    }
    else {
        ticketRow.remove();
    }
}

$("tbody").on("click", ".delete-ticket-link", deleteTicket);

function showTicketOverlay() {
    const ticketRow = $(this).closest(".ticket-row");
    const ticketDate = ticketRow.find('td[data-column="deadline"]').text();
    const [day, month, year] = ticketDate.split(" ")[0].split("/");
    const formattedDate = `${year}-${month}-${day}`;
    const ticketCategory = ticketRow.find('td[data-column="category"]').text();
    const ticketPriority = ticketRow.find('td[data-column="priority"] div span').text();
    const editTicketForm = document.querySelector("#editTicketOverlay form");
    const ticketDescription = ticketRow.find('td[data-column="description"] div.full-desc').text();
    editTicketForm.classList.remove("was-validated");
    const overlay = document.getElementById("editTicketOverlay");
    $("#editCategory").val(ticketCategory);
    $("#editPriority").val(ticketPriority);
    $("#editDeadline").val(formattedDate);
    $("#editDescription").val(ticketDescription);
    overlay.style.display = "flex";
    const id = ticketRow.data("id");
    $(overlay).data("id", id);
}

function hideTicketOverlay() {
    const editTicketForm = document.querySelector("#editTicketOverlay form");
    editTicketForm.classList.remove("was-validated");
    const overlay = document.getElementById("editTicketOverlay");
    overlay.style.display = 'none';
    
    $(overlay).removeData("id");
    
}

$("tbody").on("click", ".edit-ticket-link", showTicketOverlay);
$(document).on("click", "#editTicketOverlay .btn-cancel", hideTicketOverlay);
$(document).on("click", "#editTicketOverlay .close-overlay", hideTicketOverlay);



async function editTicket() {
    const overlay = document.getElementById("editTicketOverlay");
  
    const myHeaders = new Headers();
   
    const editTicketForm = document.querySelector("#editTicketOverlay form");
    editTicketForm.classList.remove("was-validated");
    const ticketId = $(overlay).data("id");
    
    const ticketDeadline = $("#editDeadline").val();
    
    const ticketDescription = $("#editDescription").val();
   
    const ticketCategory = $("#editCategory").val();
    
    const ticketPriority = $("#editPriority").val();
    
    if (ticketDescription.match(/^\s*$/) || ticketCategory.match(/^\s*$/) || ticketPriority.match(/^\s*$/) || ticketDeadline === "") {
        editTicketForm.classList.add("was-validated");
        return false;
    }
    const projId = $(ticketCreationForm).data("id");
    const token = $('input[name="__RequestVerificationToken"]', $(editTicketForm)).val();
    const ticket = {
        id: ticketId,
        category: ticketCategory,
        description: ticketDescription,
        deadline: ticketDeadline,
        priority: ticketPriority,
        projectId: projId
    };
    const urlEdit = $(editTicketForm).data("url");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("RequestVerificationToken", token);
    const request = new Request(urlEdit, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(ticket)
    });
    const response = await fetch(request);
    if (!response.ok) {
        alert(response.status);
    }
    else {
        responseBody = await response.json();
        const responseDeadline = responseBody.deadline.split("T");
        const [year, month, day] = responseDeadline[0].split("-");
        const finalDeadline = `${day}/${month}/${year} ` + responseDeadline[1];
        const ticketRow = $(`tr[data-id="${ticketId}"]`);
        ticketRow.find('td[data-column="description"] div.full-desc').text(responseBody.description);
        ticketRow.find('td[data-column="description"] div.short-desc').text(responseBody.description);
        ticketRow.find('td[data-column="priority"] div span').text(responseBody.priority);
        ticketRow.find('td[data-column="priority"] div div').text(responseBody.priority.charAt(0));
        ticketRow.find('td[data-column="priority"] div div').get(0).setAttribute("class",`priority-circle priority-${responseBody.priority.toLowerCase()}`);
        ticketRow.find('td[data-column="category"]').text(responseBody.category);
        ticketRow.find('td[data-column="deadline"]').text(finalDeadline);
    }
}

$(document).on("click", "#editTicketOverlay .btn-update", editTicket);
