/*
Desc: Scaffold website behavior.
Auth: Nicklas Vraa
*/

/* Variables. */
let language = 'da'; /* Default language. */
let currentSlide = 0;

/* Constants. */
const slides = document.querySelectorAll('.slide');


/* Populate text elements. */
window.onload = function() {
    toggleLanguage();
};

/* Scroll to the top of the page. */
function home() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

/* Switch language of entire page. */
function toggleLanguage() {
    if (language === 'en') {
        language = 'da';
        setDanishText();
    } else {
        language = 'en';
        setEnglishText();
    }
}

/* Set Danish text. */
function setDanishText() {
    document.getElementById('home-slide1').textContent = 'Slide et';
    document.getElementById('home-slide2').textContent = 'Slide to';
    document.getElementById('home-slide3').textContent = 'Slide tre';

    document.getElementById('welcome-link').textContent = 'Velkommen';
    document.getElementById('welcome-heading').textContent = 'Velkommen';
    document.getElementById('welcome-text').textContent = 'Velkommen til Scaffold! Dette er en simpel, interaktiv Single Page Application (SPA) bygget uden brug af eksterne biblioteker eller rammer.';

    document.getElementById('design-link').textContent = 'Design';
    document.getElementById('design-heading').textContent = 'Skræddersy dit hjem';
    document.getElementById('design-option1').textContent = 'Billede 1';
    document.getElementById('design-option2').textContent = 'Billede 2';
    document.getElementById('design-option3').textContent = 'Billede 3';

    document.getElementById('about-link').textContent = 'Om Os';
    document.getElementById('contact-link').textContent = 'Kontakt';
}

/* Set English text */
function setEnglishText() {
    document.getElementById('home-slide1').textContent = 'Slide one';
    document.getElementById('home-slide2').textContent = 'Slide two';
    document.getElementById('home-slide3').textContent = 'Slide three';

    document.getElementById('welcome-link').textContent = 'Welcome';
    document.getElementById('welcome-heading').textContent = 'Welcome';
    document.getElementById('welcome-text').textContent = "Do you dream of owning your very own tiny home? You've come to the right place! Customize you tiny home and have it made to order.";

    document.getElementById('design-link').textContent = 'Design';
    document.getElementById('design-heading').textContent = 'Customize your home';
    document.getElementById('design-option1').textContent = 'Image 1';
    document.getElementById('design-option2').textContent = 'Image 2';
    document.getElementById('design-option3').textContent = 'Image 3';

    document.getElementById('about-link').textContent = 'About Us';
    document.getElementById('contact-link').textContent = 'Contact';
}

// Functions related to the showcase section.
function updateCarousel() {
    const carouselContent = document.getElementById('carousel');
    carouselContent.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

/* Functions related to the design section. */
function updateImage(imagePath) {
    document.getElementById('selected-image').src = imagePath;
}
