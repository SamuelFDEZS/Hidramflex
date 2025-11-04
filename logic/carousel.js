let index = 0;
const carousel = document.querySelector('.carrusel');
const slides = carousel.querySelectorAll('.carrusel__img');

setInterval(() => {
    slides.forEach(slide => slide.classList.remove('active'));
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
    const slideWidth = carousel.clientWidth;

    carousel.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
    });
}, 4000);
