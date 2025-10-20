if (document.readyState === "complete") {
    console.log('document is already ready, just execute code here');
    document.querySelector("#editProjectForm div.project-form-row button.project-btn-submit").addEventListener("click", editProject);
    $(document).on("click", ".project-btn-delete", function () {
        alert("hey");
        const button = $(this);
        const form = button.prev("form");
        const token = form.find('input[name="__RequestVerificationToken"]').val();
        alert(token);
        const projectId = form.find('input[name="id"]').val();
        const urlDelete = form.find('input[name="url"]').val();
        const card = button.closest(".project-card");

        if (confirm("Are you sure you want to delete this project?")) {
            $.ajax({
                url: urlDelete,
                type: "POST",
                data: { id: projectId },
                headers: { "RequestVerificationToken": token },
                success: function () {
                    card.remove();
                    alert("Project successfully removed!");
                },
                error: function (xhr) {
                    alert(`Error ${xhr.status}: ${xhr.statusText}`);
                }
            });
        }
    });
    initialization();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        document.querySelector("#editProjectForm div.project-form-row button.project-btn-submit").addEventListener("click", editProject);
        $(document).on("click", ".project-btn-delete", function () {
            const button = $(this);
            const form = button.prev("form");
            const token = form.find('input[name="__RequestVerificationToken"]').val();
            const projectId = form.find('input[name="id"]').val();
            const urlDelete = form.find('input[name="url"]').val();
            const card = button.closest(".project-card");

            if (confirm("Are you sure you want to delete this project?")) {
                $.ajax({
                    url: urlDelete,
                    type: "POST",
                    data: { id: projectId },
                    headers: { "RequestVerificationToken": token },
                    success: function () {
                        card.remove();
                        alert("Project successfully removed!");
                    },
                    error: function (xhr) {
                        alert(`Error ${xhr.status}: ${xhr.statusText}`);
                    }
                });
            }
        });
        initialization();
    });
}
function initialization() {
    $(document).on("submit", "#editOverlay div form", async function (event) {
        event.preventDefault();
        const ticketCategory = $("#editCategory").val();
        const ticketPriority = $("#editPriority").val();
        const ticketDeadline = $("#editDeadline").val();
        const ticketDescription = $("#editDescription").val();
        const token = $('input[name="__RequestVerificationToken"]', $("#editOverlay div form")).val();
        const myHeaders = new Headers();
        const urlEdit = $("#editOverlay div form").data("url");
        myHeaders.append("RequestVerificationToken", token);
        myHeaders.append("Content-Type", "application/json");
        const request = new Request(urlEdit, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                id: $("#editOverlay").data("id"),
                category: ticketCategory,
                description: ticketDescription,
                deadline: ticketDeadline,
                priority: ticketPriority,
                projectId: $("#ticketCreationForm").data("id")
            })
        });
        alert(ticketDescription);
        alert(ticketPriority);
        alert($("#editOverlay").data("id"));
        alert(ticketDeadline);
        alert(ticketCategory);
        alert(token);
        alert(urlEdit);
        const response = await fetch(request);
        if (!response.ok) {
            alert("Editing unsuccessful " + response.statusText + " " + response.status);

        }
        else {
            const responseBody = await response.json();
            const responseDeadline = responseBody.deadline.split("T");
            const [year, month, day] = responseDeadline[0].split("-");
            const finalDeadline = `${day}/${month}/${year} ` + responseDeadline[1];
            const table = $("#ticketTableBody");
            const ticketRow = table.find('tr[data-id="' + responseBody.id + '"]');
            ticketRow.find('td[data-column="category"]').text(escapeHtml(responseBody.category));
            ticketRow.find('td[data-column="priority"] div span').text(responseBody.priority);
            ticketRow.find('td[data-column="priority"] div div').text(Array.from(responseBody.priority.toUpperCase())[0]);
            ticketRow.find('td[data-column="priority"] div div').attr("class", "priority-circle priority-" + responseBody.priority.toLowerCase());
            ticketRow.find('td[data-column="description"] div.full-desc').text(escapeHtml(responseBody.description));
            ticketRow.find('td[data-column="description"] div.short-desc').text(escapeHtml(responseBody.description));
            ticketRow.find('td[data-column="deadline"]').text(finalDeadline);
            $("#editOverlay").removeData("id");
            hideEditOverlay();
        }

    });
    function hideEditOverlay() {
        $("#editOverlay").removeData("id");
        document.getElementById('editOverlay').style.display = 'none';

    }
    document.querySelector('.close-overlay').addEventListener('click', hideEditOverlay);
    document.querySelector('.btn-cancel').addEventListener('click', hideEditOverlay);
    document.getElementById('editOverlay').addEventListener('click', function (e) {
        if (e.target === this) {
            $("#editOverlay").removeData("id");
            hideEditOverlay();
        }
    });

    $(document).on("click", ".edit-ticket-link", function () {



        const ticketRow = $(this).closest(".ticket-row");
        const ticketPriority = ticketRow.find('td[data-column="priority"] div span').text();

        const ticketId = ticketRow.find('td[data-column="id"]').text().substring(3);

        const ticketDate = ticketRow.find('td[data-column="deadline"]').text();
        const [day, month, year] = ticketDate.split(" ")[0].split("/");
        const formattedDate = `${year}-${month}-${day}`;
        const ticketCategory = ticketRow.find('td[data-column="category"]').text();

        const ticketDescription = ticketRow.find('td[data-column="description"] div.full-desc').text();


        const overlay = $("#editOverlay");
        $("#editCategory").val(ticketCategory);
        $("#editPriority").val(ticketPriority);
        $("#editDeadline").val(formattedDate);
        $("#editDescription").val(ticketDescription);
        overlay.data("id", ticketId);
        overlay.get(0).style.display = "flex";
    });

    $(document).on("click", ".delete-ticket-link", function () {

        const form = $("#ticketDeletionForm");
        const token = $('input[name="__RequestVerificationToken"]', form).val();

        const urlDelete = $('input[name = "url"]', form).val();
        const row = $(this).closest(".ticket-row");
        const id = row.data("id");

        $.ajax({
            url: urlDelete,
            type: 'POST',
            data: {
                ticketId: id
            },
            headers: {
                'RequestVerificationToken': token
            },
            success: function (response, status, xhr) {

                row.remove();
            }
            ,
            error: function (xhr, status, error) {
                alert("unsuccessfull deletion");
                alert("the id is " + id);
                alert("the url is " + urlDelete);
                alert("status is " + status);

            }

        })

    });
}



async function createTicket() {
    alert("hey mitch");
    const form = document.getElementById("ticketCreationForm");
    const token = $('input[name="__RequestVerificationToken"]', $(form)).val();
    const ticketDate = $("#deadline").val();
    const ticketCategory = $("#ticketCategory").val();
    let ticketPriorityHtml = "";
    const ticketDescription = $("#ticketDescription").val();


    const ticketPriority = $("#ticketPriority").val();
    const urlAddTicket = $(form).data("url");
    const projId = $(form).data("id");
    const ticket = {
        id: 0,
        category: ticketCategory,
        description: ticketDescription,
        deadline: ticketDate,
        priority: ticketPriority,
        projectId: projId
    };
    alert("jajajajjajajaj" + form)
    alert(ticketCategory);
    alert(ticketDate);
    alert(ticketDescription);
    ticket(ticketPriority);
    alert("rodrigues");
    ticket(token);
    ticket(urlAddTicket);
    ticket(projId);
    alert("rodrigues");
}
function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}



