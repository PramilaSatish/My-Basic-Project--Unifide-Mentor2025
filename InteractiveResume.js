// Smooth Scrolling
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Tooltip for Skills and Experience
const tooltip = document.getElementById('tooltip');

document.querySelectorAll('.popup, .skill').forEach(item => {
  item.addEventListener('mouseover', e => {
    const info = e.target.getAttribute('data-info');
    tooltip.textContent = info;
    tooltip.style.display = 'block';
  });

  item.addEventListener('mousemove', e => {
    tooltip.style.top = (e.pageY + 10) + 'px';
    tooltip.style.left = (e.pageX + 10) + 'px';
  });

  item.addEventListener('mouseout', () => {
    tooltip.style.display = 'none';
  });
});

// Name Animation
const nameElement = document.getElementById('name');
setInterval(() => {
  nameElement.style.transform = 'scale(1.1)';
  setTimeout(() => nameElement.style.transform = 'scale(1)', 500);
}, 3000);

// Modal for Project Gallery
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('click', () => {
    modalTitle.textContent = item.getAttribute('data-title');
    modalDescription.textContent = item.getAttribute('data-description');
    modal.style.display = 'block';
  });
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
