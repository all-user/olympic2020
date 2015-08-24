'use strict'

import { computedStyles } from './computed_styles.js';

let forms = {};

function getInputValues() {
    forms.verticalInput = forms.verticalInput || document.querySelector('#vertical');
    forms.horizonInput  = forms.horizonInput  || document.querySelector('#horizon');
    forms.displayInput  = forms.displayInput  || document.querySelector('#display');
    forms.durationInput = forms.durationInput || document.querySelector('#duration');
    forms.messageInput  = forms.messageInput  || document.querySelector('#message');
    forms.iWidthInput   = forms.iWidthInput   || document.querySelector('#i-width');
    forms.iHeightInput  = forms.iHeightInput  || document.querySelector('#i-height');

    let vertical = forms.verticalInput.value | 0;
    let horizon  = forms.horizonInput.value | 0;
    let display  = forms.displayInput.value | 0;
    let duration = forms.durationInput.value | 0;
    let msg      = forms.messageInput.value.split('\n');
    let width    = forms.iWidthInput.value;
    let height   = forms.iHeightInput.value;

    return { vertical, horizon, display, duration, msg, width, height };
}

function clickButtonHandler(params) {

    if (typeof params !== 'object') {
        new Error('clickButtonHandler arg expect type is object.')
    }

    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }

    let group = generateSignboard(params);
    group.appendTo(wrapper);

    wrapper.addEventListener('click', () => {
        if (group.isAnimating) {
            group.stopAnimate.call(group);
        } else {
            group.resumeAnimate.call(group);
        }
    });

    params.msg = params.msg.slice(1).concat(params.msg[0]);

    setTimeout(() => {
        group.animateFromString(params.msg, { loop: true });
    }, group.emblems[0].displayTime);
}

function generateSignboard(params) { // object => EmblemGroup
    const { SIZE } = computedStyles();

    if (!typeof params === 'object') { return; }

    let { vertical, horizon, display, duration, msg } = params;

    vertical = vertical || 3;
    horizon  = horizon  || 7;
    display  = display  || 1500;
    let margin     = SIZE / (horizon * 5);
    let emblemSize = margin * 3;

    let group = new EmblemGroup(msg[0], { length: vertical * horizon, size: emblemSize, displayTime: display, duration: duration });

    group.emblems.forEach(e => {
        e.dom.style.margin = `${ margin }px`;
    });

    return group;
}

export { clickButtonHandler, getInputValues };
