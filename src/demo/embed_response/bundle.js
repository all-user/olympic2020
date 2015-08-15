(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _helpersEmbed_helperJs = require('./helpers/embed_helper.js');

document.addEventListener('DOMContentLoaded', function () {
    var wrapper = document.querySelector('#wrapper');

    var pairs = decodeURIComponent(location.search.slice(1)).split('&');
    var params = pairs.reduce(function (params, s) {
        var keyValue = s.split('=');
        params[keyValue[0]] = keyValue[1];
        return params;
    }, {});

    params.msg = params.msg.split(',');

    (0, _helpersEmbed_helperJs.clickButtonHandler)(params);
});

},{"./helpers/embed_helper.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function computedStyles() {
    var WIDTH = +getComputedStyle(document.querySelector('.container')).width.replace('px', '');
    var PADDING = +getComputedStyle(document.querySelector('.container')).paddingLeft.replace('px', '');
    var SIZE = WIDTH - PADDING * 2;

    return { WIDTH: WIDTH, PADDING: PADDING, SIZE: SIZE };
}

exports.computedStyles = computedStyles;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _computed_stylesJs = require('./computed_styles.js');

var forms = {};

function getInputValues() {
    forms.verticalInput = forms.verticalInput || document.querySelector('#vertical');
    forms.horizonInput = forms.horizonInput || document.querySelector('#horizon');
    forms.displayInput = forms.displayInput || document.querySelector('#display');
    forms.durationInput = forms.durationInput || document.querySelector('#duration');
    forms.messageInput = forms.messageInput || document.querySelector('#message');
    forms.iWidthInput = forms.iWidthInput || document.querySelector('#i-width');
    forms.iHeightInput = forms.iHeightInput || document.querySelector('#i-height');

    var vertical = forms.verticalInput.value | 0;
    var horizon = forms.horizonInput.value | 0;
    var display = forms.displayInput.value | 0;
    var duration = forms.durationInput.value | 0;
    var msg = forms.messageInput.value.split('\n');
    var width = forms.iWidthInput.value;
    var height = forms.iHeightInput.value;

    return { vertical: vertical, horizon: horizon, display: display, duration: duration, msg: msg, width: width, height: height };
}

function clickButtonHandler(params) {

    if (typeof params !== 'object') {
        new Error('clickButtonHandler arg expect type is object.');
    }

    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }

    var group = generateSignboard(params);
    group.appendTo(wrapper);

    wrapper.addEventListener('click', function () {
        if (group.isAnimating) {
            group.stopAnimate.call(group);
        } else {
            group.resumeAnimate.call(group);
        }
    });

    params.msg = params.msg.slice(1).concat(params.msg[0]);

    setTimeout(function () {
        group.animateFromString(params.msg, { loop: true });
    }, group.emblems[0].displayTime);
}

function generateSignboard(params) {
    // object => EmblemGroup

    var _computedStyles = (0, _computed_stylesJs.computedStyles)();

    var SIZE = _computedStyles.SIZE;

    if (! typeof params === 'object') {
        return;
    }

    var vertical = params.vertical;
    var horizon = params.horizon;
    var display = params.display;
    var duration = params.duration;
    var msg = params.msg;

    vertical = vertical || 3;
    horizon = horizon || 7;
    display = display || 1500;
    var margin = SIZE / (horizon * 5);
    var emblemSize = margin * 3;

    var group = new EmblemGroup(msg[0], { length: vertical * horizon, size: emblemSize, displayTime: display, duration: duration });

    group.emblems.forEach(function (e) {
        e.dom.style.margin = margin + 'px';
    });

    return group;
}

exports.clickButtonHandler = clickButtonHandler;
exports.getInputValues = getInputValues;

},{"./computed_styles.js":2}]},{},[1]);
