document.addEventListener('DOMContentLoaded', () => {
    var wrapper = document.querySelector('#wrapper');
    var olm     = new Olympic2020('t', { size: 500 });

    const ALL_VALID_CHARS   = "abcdefghijklmnopqrstuvwxyz1234567890!.':;/_";

    olm.dom.addEventListener('click', () => {
        if (olm.isAnimating) {
            olm.stopAnimate.call(olm);
        } else {
            olm.resumeAnimate.call(olm);
        }
    });
    olm.animateFromString(ALL_VALID_CHARS);

    wrapper.appendChild(olm.dom);
});
