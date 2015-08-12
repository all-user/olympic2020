import { clickButtonHandler } from './helpers/embed_helper.js';

document.addEventListener('DOMContentLoaded', () => {
    let wrapper       = document.querySelector('#wrapper');
    let verticalInput = document.querySelector('#vertical');
    let horizonInput  = document.querySelector('#horizon');
    let displayInput  = document.querySelector('#display');
    let durationInput = document.querySelector('#duration');
    let messageInput  = document.querySelector('#message');
    let genButton     = document.querySelector('#generate-button');

    const TITLE_COPY  = 'tokyo  2020   olympic';
    const SHORT_COPY  = 'hi!!   ';
    const DATE_COPY   = '8/9:sun'
    const BLANK_COPY  = '       ';
    const LONG_COPY   = 'olympicparalympicgame';
    const COPYS       = [
        TITLE_COPY,
        LONG_COPY,
        SHORT_COPY,
        BLANK_COPY,
        '1234567890    ',
        BLANK_COPY,
        DATE_COPY,
        'happy  day!',
        BLANK_COPY,
        'hello  world!!',
    ];

    let cfg = {
        vertical: 3,
        horizon: 7,
        display: 1500,
        duration: 800,
        msg: COPYS
    };

    messageInput.textContent = COPYS.join('\n');

    clickButtonHandler(cfg);

    genButton.addEventListener('click', e => {
        clickButtonHandler();
    });

});

function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}
