const benefit_container = document.querySelectorAll('.benefit-container'); 

benefit_container.forEach(container => {
    container.onclick = function() {
        window.open('https://api.isic-archive.com/collections/249/?page=1', '_blank');
    }
});