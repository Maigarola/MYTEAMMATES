// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal

document.getElementById("myBtn").addEventListener("click", openModal);
document.getElementById("close").addEventListener("click", closeModal);


function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}