let index = 0;
let isAnimating = false;

const slides = document.querySelectorAll('.carrusel__img');
const buttonLeft = document.querySelector('.carrusel__left-button');
const buttonRight = document.querySelector('.carrusel__right-button');

const changeClassAfterDelay = (element, action, classToRemove, classToAdd, delay = 900, secondDelay = 500) => {
    setTimeout(() => {
        if (action === 'remove') {
            element.classList.remove(classToRemove);
        } else if (action === 'active') {
            element.classList.add(classToAdd);
        } else if (action === 'both') {
            element.classList.remove(classToRemove);
            element.classList.add(classToAdd);
        }

        setTimeout(() => isAnimating = false, secondDelay);
    }, delay);
};

const autoChangeSlide = () => {
    const currentSlide = slides[index];
    const nextIndex = (index + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    const previousIndex = (index - 1 + slides.length) % slides.length;
    const previousSlide = slides[previousIndex];

    currentSlide.classList.remove('active');
    currentSlide.classList.add('last');
    previousSlide.classList.remove('previous');
    nextSlide.classList.add('active');

    index = nextIndex;
    setTimeout(() => {
        currentSlide.classList.remove('last');
        currentSlide.classList.add('previous');
    }, 1000);
};

const goPreviousSlide = () => {
    if (isAnimating) return;
    isAnimating = true;

    const currentSlide = slides[index];

    const previousIndex = (index - 1 + slides.length) % slides.length;
    const previousSlide = slides[previousIndex];

    const beforePreviousIndex = (index - 2 + slides.length) % slides.length;
    const beforePreviousSlide = slides[beforePreviousIndex];

    currentSlide.classList.remove('active');
    currentSlide.classList.add('last');
    previousSlide.classList.remove('previous');
    previousSlide.classList.add('active');
    beforePreviousSlide.classList.add('previous');

    index = previousIndex;
    changeClassAfterDelay(currentSlide, 'remove', 'last');
};

const goNextSlide = () => {
    if (isAnimating) return;
    isAnimating = true;

    const currentSlide = slides[index];

    const previousIndex = (index - 1 + slides.length) % slides.length;
    const previousSlide = slides[previousIndex];

    const nextIndex = (index + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    currentSlide.classList.remove('active');
    currentSlide.classList.add('last');
    nextSlide.classList.add('active');
    previousSlide.classList.remove('previous');

    index = nextIndex;
    changeClassAfterDelay(currentSlide, 'both', 'last', 'previous');
};

let autoplay = setInterval(() => autoChangeSlide(), 4000);

const pauseAutoplay = () => {
    clearInterval(autoplay);
};

const resumeAutoplay = () => {
    autoplay = setInterval(() => autoChangeSlide(), 4000);
};
buttonLeft.addEventListener('click', goPreviousSlide);
buttonRight.addEventListener('click', goNextSlide);

buttonLeft.addEventListener('mouseenter', pauseAutoplay);
buttonRight.addEventListener('mouseenter', pauseAutoplay);

buttonLeft.addEventListener('mouseleave', resumeAutoplay);
buttonRight.addEventListener('mouseleave', resumeAutoplay);

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        clearInterval(autoplay);
    } else if (document.visibilityState === 'visible') {
        clearInterval(autoplay);
        autoplay = setInterval(() => autoChangeSlide(), 4000);
    }
});
