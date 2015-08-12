import { clickButtonHandler } from './helpers/embed_helper.js';

document.addEventListener('DOMContentLoaded', () => {
    let wrapper    = document.querySelector('#wrapper');

    let pairs  = location.search.slice(1).split('&');
    let params = pairs.reduce((params, s) => {
        let keyValue = s.split('=');
        params[keyValue[0]] = keyValue[1];
        return params;
    }, {});


    clickButtonHandler(params);
});
