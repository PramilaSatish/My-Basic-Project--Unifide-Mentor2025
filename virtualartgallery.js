// Get modal elements
const modal = document.getElementById("artModal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.getElementsByClassName("close")[0];

// Open modal on image click
document.querySelectorAll(".artwork img").forEach((img) => {
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.src;

    const parent = this.closest(".artwork");
    const title = parent.getAttribute("data-title");
    const artist = parent.getAttribute("data-artist");

    captionText.innerHTML = `<strong>${title}</strong> by ${artist}`;
  });
});

// Close modal on "X"
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Close modal on outside click
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
