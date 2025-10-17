if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

const navBar = document.querySelector('.header');
let scrollTop = 0;

window.addEventListener('load', () => {
    requestAnimationFrame(() => {
        window.scrollTo(0, 0);
    });
});

window.addEventListener('scroll', () => {
    let { pageYOffset } = window;
    if (pageYOffset > scrollTop) {
        navBar.classList.remove('visible');
    } else if (pageYOffset < scrollTop) {
        navBar.classList.add('visible');
    }

    scrollTop = pageYOffset <= 0 ? 0 : pageYOffset;
},
{ passive: true }
);
