const analyse = document.querySelector('.analyse');
const github = document.querySelector('.github');
const report = document.querySelector('.report');
const demo = document.querySelector('.demo');

analyse.onclick = function() {
    section[1].scrollIntoView({behavior: 'smooth'});
}

github.onclick = function() {
    window.open('https://github.com/DarttGoblin/Dermalyze_server', '_blank');
}

report.onclick = function() {
    alert('Report will be available soon...');
    // window.open('', '_blank');
}

demo.onclick = function() {
    window.open('https://drive.google.com/file/d/1MgO9UHWCxcnFl45HWMUnZ4xp1XGAVE_-/view?usp=sharing', '_blank');
}