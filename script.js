function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    document.getElementById("alert-message").textContent = message;
    alertBox.classList.remove("hidden");
}

function closeAlert() {
    document.getElementById("custom-alert").classList.add("hidden");
}

window.alert = showAlert;
