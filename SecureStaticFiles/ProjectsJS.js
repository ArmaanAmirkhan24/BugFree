if(document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    projectCodeInitialization();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        projectCodeInitialization();
    });
}


function projectCodeInitialization() {
    // Add Project Form Toggle
    const addProjectBtn = document.getElementById('addProjectBtn');
    const addProjectForm = document.getElementById('addProjectForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const projectInput = document.querySelector('.project-name-input');

    addProjectBtn.addEventListener('click', function () {
        addProjectForm.classList.add('active');
        projectInput.focus();
        addProjectBtn.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function () {
        addProjectForm.classList.remove('active');
        projectInput.value = '';
        addProjectBtn.style.display = 'flex';
    });

    // Edit Form Functionality
    const editFormOverlay = document.getElementById('editFormOverlay');
    const editFormClose = document.getElementById('editFormClose');
    const editCancelBtn = document.getElementById('editCancelBtn');
    const editProjectForm = document.getElementById('editProjectForm');
    const editProjectName = document.getElementById('editProjectName');

    function openEditForm(name, idValue) {
        editProjectName.value = name;
        editFormOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        $("#editProjectForm").data("id", idValue);

    }

    function closeEditForm() {
        editFormOverlay.classList.remove('active');
        document.body.style.overflow = '';
        $("#editProjectForm").removeData("id");
        editProjectForm.getElementsByClassName("invalid-feedback")[0].classList.remove("d-block");

    }

    editFormClose.addEventListener('click', closeEditForm);
    editCancelBtn.addEventListener('click', closeEditForm);

    editFormOverlay.addEventListener('click', function (e) {
        if (e.target === editFormOverlay) {
            closeEditForm();
        }
    });


    /*
    editProjectForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const form = document.getElementById("editProjectForm");
        let myHeaders = new Headers();
        alert("elk");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlEdit = $(form).data("url");
        const projectId = "8070";
        const card = $('.project-card[data-id="' + projectId + '"]');
        const token = $('input[name = "__RequestVerificationToken"]', $(form)).val();
        myHeaders.append("RequestVerificationToken", token);
        const newName = $("#editProjectName").val();
        escapeHtml(newName);
        const request = new Request(urlEdit, {
            method: "POST",
            headers: myHeaders,
            body: new URLSearchParams({ id: projectId, name: newName })
        });

        const response = await fetch(request);

        if (!response.ok)
            throw new Error(`Response status:  ${response.status}`);
        else {
            card.find("h2").text(newName);

        }
    });
    */

    // Edit buttons event listeners
    const editButtons = document.querySelectorAll('.project-btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.project-card');
            const projectName = card.querySelector('.project-name').textContent;
            const projectIdValue = card.querySelector('input[name="id"]').getAttribute('value');
            openEditForm(projectName, projectIdValue);
        });
    });
}