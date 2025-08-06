const svgPath = document.querySelectorAll('svg path');
const toggle = document.getElementById('toggle');

svgPath.forEach(item =>{
    item.addEventListener('mouseover', (event) =>{
        const x = event.clientX + window.scrollX;
        const y = event.clientY + window.scrollY;
        const title = item.getAttribute('name');

        toggle.style.left = `${x}px`;
        toggle.style.top = `${y}px`;
        toggle.innerHTML = title;
        toggle.style.display = 'block';
        
    })
    item.addEventListener('mouseout', ()=>{
        toggle.style.display = 'none';
    })
})