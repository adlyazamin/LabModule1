function validateForm() {
    let fname = document.forms["myForm"]["fname"].value;
    if (fname === "") {
        alert("First Name must be filled out.");
        return false;
    }
}