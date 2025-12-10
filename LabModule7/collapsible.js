document.addEventListener("DOMContentLoaded", function () {
    const collapsibleButton = document.querySelector
        (".collapsible");
    const content = document.querySelector(".content");
    collapsibleButton.addEventListener("click", function () {
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});