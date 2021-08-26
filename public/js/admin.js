function addUserNameForEdit(i) {
    var username = document.getElementById("username" + i).textContent;
    document.getElementById("usernamePost").value = username;
}

function addUserNameForDelete(i) {
    var username = document.getElementById("username" + i).textContent;
    document.getElementById("deleteUsernamePost").value = username;
}
