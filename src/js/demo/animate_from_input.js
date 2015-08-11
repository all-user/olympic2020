document.addEventListener('DOMContentLoaded', () => {
    let wrapper = document.querySelector('#wrapper');
    let olm     = new Olympic2020('t', { size: 500 });
    let input   = document.querySelector('#user-input');
    const ALL_VALID_CHARS = Olympic2020.ALL_VALID_CHARS;

    wrapper.appendChild(olm.dom);

    console.log(input);
    input.addEventListener('input', e => {
        console.log(e);
        olm.to(input.value[input.value.length - 1]);
    });
});
