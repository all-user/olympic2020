import { computedStyles } from './helpers/computed_styles.js';

document.addEventListener('DOMContentLoaded', () => {
    let wrapper    = document.querySelector('#wrapper');
    let olms       = [];
    const { SIZE } = computedStyles();
    let size       = SIZE > 500 ? 500 : SIZE;
    const MARGIN   = size / 15;
    let sizeL      = size - MARGIN * 2;
    let sizeS      = MARGIN * 3;

    olms.push(new Olympic2020('a', { size: sizeS,  displayTime: 3111, random: true }));
    olms.push(new Olympic2020('z', { size: sizeS,  displayTime: 6399, random: true }));
    olms.push(new Olympic2020('t', { size: sizeS,  displayTime: 1477, random: true }));
    olms.forEach(e => { e.dom.style.margin = `${ MARGIN }px`; });

    let bigEmblem = new Olympic2020('/', { size: sizeL, displayTime: 1000, duration: 800 });
    bigEmblem.dom.style.margin = `${ MARGIN }px`;
    olms.push(bigEmblem);

    const allValidChars = Olympic2020.allValidChars;

    olms.forEach((olm, idx) => {
        olm.dom.addEventListener('click', () => {
            if (olm.isAnimating) {
                olm.stopAnimate.call(olm);
            } else {
                olm.resumeAnimate.call(olm);
            }
        });

        wrapper.appendChild(olm.dom);

        setTimeout(() => {
            olm.animateFromString(allValidChars, { loop: true });
        }, 1000);
    });


});
