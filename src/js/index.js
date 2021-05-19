import { preloadFonts } from '/js/utils';
import { Intro } from '/js/intro';

const intro = new Intro(document.querySelector('.circles'));

// Preload images and fonts
Promise.all([preloadFonts('kxo3pgz')]).then(() => {
    document.body.classList.remove('loading');
    intro.start();
});
