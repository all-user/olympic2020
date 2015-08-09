document.addEventListener('DOMContentLoaded', () => {
    let wrapper = document.querySelector('#wrapper');
    let olms    = [];
    olms.push(new Olympic2020('a', { size: 90,  displayTime: 3111, random: true }));
    olms.push(new Olympic2020('z', { size: 90,  displayTime: 6399, random: true }));
    olms.push(new Olympic2020('t', { size: 90,  displayTime: 1477, random: true }));
    olms.push(new Olympic2020('/', { size: 500 }));

    const ALL_VALID_CHARS = "abcdefghijklmnopqrstuvwxyz1234567890!.':;/_";

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
