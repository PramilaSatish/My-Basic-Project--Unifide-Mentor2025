// Smooth Scroll Active Link
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 60;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return false;
  }
  
  alert("Message sent successfully!");
  this.reset();
});

// Modal Pop-up for Projects
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalImg = document.getElementById("modal-img");
const modalDesc = document.getElementById("modal-desc");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".project-item").forEach(item => {
  item.addEventListener("click", () => {
    modalTitle.textContent = item.getAttribute("data-title");
    modalImg.src = item.getAttribute("data-img");
    modalDesc.textContent = item.getAttribute("data-desc");
    modal.style.display = "block";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
