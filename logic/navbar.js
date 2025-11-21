if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

const header = document.querySelector('.header');
const burgerMenu = document.querySelector('.header__collapsed-menu');
const menuIcon = document.querySelector('.header__collapsed-menu__icon');
const menu = document.querySelector('.header__menu');
const exitMenu = document.querySelector('.header__menu__exit');
const filter = document.querySelector('.blur-filter');
const originalNextSibling = menu.nextElementSibling;

let scrollTop = 0;
let headerHeight = 0;

// Take the navigation menu out of the header

const moveNavForMobile = () => {
    if (window.innerWidth < 576) {
        document.body.appendChild(menu);
    } else {
        header.insertBefore(menu, originalNextSibling);
    }
};
const updateThreshold = () => {
    headerHeight = header.offsetHeight;
};
window.addEventListener('load', () => {
    updateThreshold();
    requestAnimationFrame(() => {
        window.scrollTo(0, 0);
    });
});

moveNavForMobile();

window.addEventListener('resize', () => {
    updateThreshold();
    moveNavForMobile();
});

window.addEventListener('scroll', () => {
    let { pageYOffset } = window;
    if (pageYOffset > scrollTop && pageYOffset > headerHeight) {
        header.classList.remove('visible');
    } else if (pageYOffset < scrollTop) {
        header.classList.add('visible');
    }

    scrollTop = pageYOffset <= 0 ? 0 : pageYOffset;
},
{ passive: true }
);

// Logic for the side menu

burgerMenu.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('visible');
    document.body.classList.toggle('no-scroll');
    filter.classList.toggle('applied');
});

exitMenu.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('visible');
    document.body.classList.toggle('no-scroll');
    filter.classList.toggle('applied');
});
