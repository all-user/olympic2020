document.addEventListener('DOMContentLoaded', () => {
    const margin = 30;

    let wrapper = document.querySelector('#wrapper');
    let size    = (getComputedStyle(document.body).width.replace('px', '')) - margin * 2;
    size = size > 500 ? 500 : size;

    let olm     = new Olympic2020('t', { size: size });
    let input   = document.querySelector('#user-input');
    const ALL_VALID_CHARS = Olympic2020.ALL_VALID_CHARS;

    wrapper.appendChild(olm.dom);

    console.log(input);
    input.addEventListener('input', e => {
        console.log(e);
        olm.to(input.value[input.value.length - 1]);
    });
});
