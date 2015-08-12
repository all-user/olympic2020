import { computedStyles } from './computed_styles.js';

let verticalInput, horizonInput, displayInput, durationInput, messageInput, iWidthInput, iHeightInput;

function getInputValues() {
    verticalInput = verticalInput || document.querySelector('#vertical');
    horizonInput  = horizonInput  || document.querySelector('#horizon');
    displayInput  = displayInput  || document.querySelector('#display');
    durationInput = durationInput || document.querySelector('#duration');
    messageInput  = messageInput  || document.querySelector('#message');
    iWidthInput   = iWidthInput   || document.querySelector('#i-width');
    iHeightInput  = iHeightInput  || document.querySelector('#i-height');

    let vertical = verticalInput.value | 0;
    let horizon  = horizonInput.value | 0;
    let display  = displayInput.value | 0;
    let duration = durationInput.value | 0;
    let msg      = messageInput.value.split('\n');
    let width    = iWidthInput.value;
    let height   = iHeightInput.value;

    return { vertical, horizon, display, duration, msg, width, height };
}

function clickButtonHandler(cfg) {

    if (typeof cfg !== 'object') {
        new Error('clickButtonHandler arg expect type is object.')
    }

    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }

    let group = generateSignboard(cfg);
    group.appendTo(wrapper);

    wrapper.addEventListener('click', () => {
        if (group.isAnimating) {
            group.stopAnimate.call(group);
        } else {
            group.resumeAnimate.call(group);
        }
    });

    group.animateFromString(cfg.msg, { loop: true });
}

function generateSignboard(cfg) { // object => EmblemGroup
    const { SIZE } = computedStyles();

    if (!typeof cfg === 'object') { return; }

    let { vertical, horizon, display, duration, msg } = cfg;

    vertical = vertical || 3;
    horizon  = horizon || 7;
    display  = display || 1500;
    let margin     = SIZE / (horizon * 5);
    let emblemSize = margin * 3;

    let group = new EmblemGroup(msg[0], { length: vertical * horizon, size: emblemSize, displayTime: display, duration: duration });

    group.emblems.forEach(e => {
        e.dom.style.margin = `${ margin }px`;
    });

    return group;
}

export { clickButtonHandler, getInputValues };
