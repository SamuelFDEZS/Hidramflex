let index = 0;
let isAnimating = false;
let beforePreviousSlide = null;
const slides = document.querySelectorAll('.carrusel__img');
const buttonLeft = document.querySelector('.carrusel__left-button');
const buttonRight = document.querySelector('.carrusel__right-button');

let previousSlide = slides[slides.length - 1];
const changeSlide = (direction) => {
    if (isAnimating) return;
    isAnimating = true;

    if (previousSlide) previousSlide.classList.remove('last', 'before-last');
    if (beforePreviousSlide) previousSlide.classList.remove('last', 'before-last');

    const current = slides[index];
    const nextIndex = (index + direction + slides.length) % slides.length;
    const next = slides[nextIndex];

    next.classList.remove('last');
    next.classList.add('active');
    current.classList.remove('active');

    if (direction === 1) {
        current.classList.add('last');
    } else {
        current.classList.add('before-last');
    }

    previousSlide = current;
    beforePreviousSlide = slides[(index - 2 + slides.length) % slides.length];
    console.log(beforePreviousSlide);
    index = nextIndex;
    setTimeout(() => {
        previousSlide.classList.remove('before-last');
        previousSlide.classList.remove('last');
        beforePreviousSlide.classList.add('last');

        setTimeout(() => (isAnimating = false), 1000);
    }, 1000);
};

const autoplay = setInterval(() => changeSlide(+1), 4000);
buttonLeft.addEventListener('click', () => changeSlide(-1));
buttonRight.addEventListener('click', () => changeSlide(+1));

buttonLeft.addEventListener('mouseenter', () => clearInterval(autoplay));
buttonRight.addEventListener('mouseenter', () => clearInterval(autoplay));

buttonRight.addEventListener('mouseenter', () => clearInterval(autoplay));
buttonRight.addEventListener('mouseenter', () => clearInterval(autoplay));
