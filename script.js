window.alert = message => {
  const alertDiv = document.createElement('div')
  alertDiv.style.position = 'fixed'
  alertDiv.style.top = '20px'
  alertDiv.style.left = '50%'
  alertDiv.style.transform = 'translateX(-50%)'
  alertDiv.style.backgroundColor = '#222'
  alertDiv.style.color = '#eee'
  alertDiv.style.padding = '15px 25px'
  alertDiv.style.borderRadius = '8px'
  alertDiv.style.fontSize = '18px'
  alertDiv.style.zIndex = '10000'
  alertDiv.style.boxShadow = '0 0 10px #000'
  alertDiv.textContent = message
  document.body.appendChild(alertDiv)
  setTimeout(() => alertDiv.remove(), 2500)
}function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    document.getElementById("alert-message").textContent = message;
    alertBox.classList.remove("hidden");
}

function closeAlert() {
    document.getElementById("custom-alert").classList.add("hidden");
}

window.alert = showAlert;
