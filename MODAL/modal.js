// Get the modal
var modal = document.getElementById("nmodal");

// Get the button that opens the modal

document.getElementById("nmopen").addEventListener("click", openModal);
document.getElementById("nmclose").addEventListener("click", closeModal);


function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}