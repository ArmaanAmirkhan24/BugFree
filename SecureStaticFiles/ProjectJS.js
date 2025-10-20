const addProjectForm = document.getElementById("addProjectForm");
const editProjectForm = document.getElementById("editProjectForm");
const editOverlay = document.getElementById("editFormOverlay");
function showOrHideProjectCreationForm() {
    const addButton = document.getElementById("addProjectBtn");
    if (addButton.style.display === "none")
        addButton.style.display = "";
    else
        addButton.style.display = "none";
    addProjectForm.classList.toggle("active");
   
}
document.getElementById("addProjectBtn").addEventListener("click", showOrHideProjectCreationForm);
addProjectForm.querySelector("#cancelProjectBtn").addEventListener("click", showOrHideProjectCreationForm);

async function deleteProject() {
    const card = this.closest(".project-card");
    const projId = $(card).data("id"); 
  
    const form = this.previousElementSibling;
    const token = $('input[name = "__RequestVerificationToken"]', $(form)).val();
    
    const urlDelete = $('input[name="url"]', $(form)).val();
    if (confirm("Are you sure that you want to delete this project?")) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("RequestVerificationToken", token);
        const request = new Request(urlDelete, {
            method: "POST",
            headers: myHeaders,
            body: new URLSearchParams({
                Id: projId
            })
        });
        const response = await fetch(request);
        if (!response.ok) {
            alert(response.status + ": " + response.statusText);
        }
        else {
            card.remove();
        }
    }
}

document.querySelectorAll(".project-btn-delete").forEach(button => {
    button.addEventListener("click", deleteProject);
});




function hideProjectEditForm() {
    editOverlay.classList.toggle("active");
   
    $(editProjectForm).removeData("id");
    editProjectForm.querySelector(".invalid-feedback").classList.remove("d-block");
}
editProjectForm.querySelector("#editCancelBtn").addEventListener("click", hideProjectEditForm);
document.getElementById("editFormClose").addEventListener("click", hideProjectEditForm);
document.addEventListener("click", function (event) {
    if (event.target === editOverlay)
        hideProjectEditForm();
})



function openProjectEditForm() {
   
    const card = this.closest(".project-card");
   
    document.getElementById("editProjectName").value = card.querySelector(".project-name").innerText;
    editOverlay.classList.toggle("active");
    
    
    const projId = $(card).data("id");
    
    $(editProjectForm).data("id", projId);
   
}
document.querySelectorAll(".project-btn-edit").forEach(button => {
    button.addEventListener("click", openProjectEditForm);
});


async function editProject() {
    const projId = $(editProjectForm).data("id");
    editProjectForm.querySelector(".invalid-feedback").classList.remove("d-block");
    const token = $('input[name="__RequestVerificationToken"]', $(editProjectForm)).val();
    const newName = document.getElementById("editProjectName").value;
    if (newName.match(/^\s*$/)) {
        editProjectForm.querySelector(".invalid-feedback").classList.add("d-block");
        return false;
    }
    const urlEdit = $(editProjectForm).data("url");
    const card = $('.project-card[data-id="' + projId + '"]');
   
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("RequestVerificationToken", token);
    const request = new Request(urlEdit, {
        method: "POST",
        headers: myHeaders,
        body: new URLSearchParams({
            Id: projId,
            name : newName
        })
    });
    const response = await fetch(request);
    if (!response.ok) {
        alert(response.status);
    }
    else {
        
        card.get(0).querySelector(".project-name").innerText = newName;

    }

}

editProjectForm.querySelector(".project-btn-submit").addEventListener("click", editProject);