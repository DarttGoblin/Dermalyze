const nav_section = document.querySelector('.nav-section');
const nav_links = document.querySelectorAll('.nav-link');
const section = document.getElementsByTagName('section');
const sign_in = document.querySelector('.sign-in');
const nav_logo = document.querySelector('.nav-logo');
const settings = document.querySelector('.settings');
const responsive_nav = document.querySelector('.responsive-nav');
const closing_icon = document.querySelector('.closing-icon');
const responsive_nav_link = document.querySelectorAll('.responsive-nav-link');
const responsive_sign_in = document.querySelector('.responsive-sign-in');

nav_links.forEach((link, index) => {
    link.onclick = function() {
        section[index].scrollIntoView({behavior: 'smooth'});
    } 
});

responsive_nav_link.forEach((link, index) => {
    link.onclick = function() {
        section[index].scrollIntoView({behavior: 'smooth'});
        responsive_nav.style.display = 'none';
        nav_section.style.backdropFilter = 'blur(20px)';
    }
});

sign_in.onclick = responsive_sign_in.onclick = function() {
    alert('This service is not available now! Check later.');
};

nav_logo.onclick = function() {
    section[2].scrollIntoView({behavior: 'smooth'});
}

settings.onclick = function() {
    responsive_nav.style.display = 'flex';
    nav_section.style.backdropFilter = 'none';
}

closing_icon.onclick = function() {
    responsive_nav.style.display = 'none';
    nav_section.style.backdropFilter = 'blur(20px)';
}