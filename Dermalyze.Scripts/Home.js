const analyse = document.querySelector('.analyse');
const github = document.querySelector('.github');
const demo = document.querySelector('.demo');

analyse.onclick = function() {
    section[1].scrollIntoView({behavior: 'smooth'});
}

github.onclick = function() {
    window.open('https://github.com/DarttGoblin/Dermalyze_server', '_blank');
}

demo.onclick = function() {
    window.open('', '_blank');
}