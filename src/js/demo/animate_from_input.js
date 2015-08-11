document.addEventListener('DOMContentLoaded', () => {
    let wrapper   = document.querySelector('#wrapper');
    const WIDTH   = +getComputedStyle(document.querySelector('.container')).width.replace('px', '');
    const PADDING = +getComputedStyle(document.querySelector('.container')).paddingLeft.replace('px', '');
    const SIZE    = WIDTH - PADDING * 2;
    let size      = SIZE > 1500 ? 1500 : SIZE;
    const MARGIN  = size / 20;
    let sizeS = MARGIN * 3;

    let init = '2020';
    let olms = [];
    olms.push(new Olympic2020(init[0], { size: sizeS }));
    olms.push(new Olympic2020(init[1], { size: sizeS }));
    olms.push(new Olympic2020(init[2], { size: sizeS }));
    olms.push(new Olympic2020(init[3], { size: sizeS }));
    olms.forEach(e => { e.dom.style.margin = `${ MARGIN }px`; });

    let input   = document.querySelector('#user-input');
    const ALL_VALID_CHARS = Olympic2020.ALL_VALID_CHARS;

    olms.forEach(olm => {
        wrapper.appendChild(olm.dom);
    });

    input.addEventListener('input', e => {
        let str = (init + e.target.value).slice(-init.length);
        [].forEach.call(str, (c, idx) => {
            olms[idx].to(c);
        });
    });
});
