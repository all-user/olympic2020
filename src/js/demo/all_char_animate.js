document.addEventListener('DOMContentLoaded', () => {
    const margin = 30;

    let wrapper = document.querySelector('#wrapper');
    let olms    = [];
    let size    = (getComputedStyle(document.body).width.replace('px', '')) - margin * 2;
    size = size > 500 ? 500 : size;
    let sizeS   = size * 0.18;

    olms.push(new Olympic2020('a', { size: sizeS,  displayTime: 3111, random: true }));
    olms.push(new Olympic2020('z', { size: sizeS,  displayTime: 6399, random: true }));
    olms.push(new Olympic2020('t', { size: sizeS,  displayTime: 1477, random: true }));
    olms.push(new Olympic2020('/', { size: size }));

    const ALL_VALID_CHARS = Olympic2020.ALL_VALID_CHARS;

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
            olm.animateFromString(ALL_VALID_CHARS, { loop: true });
        }, 1000);
    });


});
