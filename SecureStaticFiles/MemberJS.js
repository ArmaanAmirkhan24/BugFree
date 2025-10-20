const addMemberOverlay = document.getElementById("addMemberOverlay");
const addMember = document.getElementById("addMember");
const addMemberContent = document.getElementById("addMemberContent");


function showMemberOverlay() {
    addMemberOverlay.style.display = "flex";
}
function hideMemberOverlay(event) {
    addMemberOverlay.style.display = "none";
}
addMember.addEventListener("click", showMemberOverlay);
addMemberOverlay.addEventListener("click", function (event) {
    if (event.target === addMemberOverlay) {
        hideMemberOverlay();
    }
});
$(document).on("click", "#addMemberOverlay .close-overlay", hideMemberOverlay);