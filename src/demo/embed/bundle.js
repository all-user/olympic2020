(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _helpersEmbed_helperJs = require('./helpers/embed_helper.js');

document.addEventListener('DOMContentLoaded', function () {
    var wrapper = document.querySelector('#wrapper');
    var messageInput = document.querySelector('#message');
    var embedOutput = document.querySelector('#embed-output');
    var genButton = document.querySelector('#generate-button');
    var codeButton = document.querySelector('#embed-button');

    var TITLE_COPY = 'tokyo  2020   olympic';
    var SHORT_COPY = 'hi!!   ';
    var DATE_COPY = '8/9:sun';
    var BLANK_COPY = '       ';
    var LONG_COPY = 'olympicparalympicgame';
    var COPYS = [TITLE_COPY, LONG_COPY, SHORT_COPY, BLANK_COPY, '1234567890    ', BLANK_COPY, DATE_COPY, 'happy  day!', BLANK_COPY, 'hello  world!!'];

    var params = {
        vertical: 3,
        horizon: 7,
        display: 1500,
        duration: 800,
        msg: COPYS
    };

    messageInput.textContent = COPYS.join('\n');

    (0, _helpersEmbed_helperJs.clickButtonHandler)(params);

    genButton.addEventListener('click', function (e) {
        (0, _helpersEmbed_helperJs.clickButtonHandler)((0, _helpersEmbed_helperJs.getInputValues)());
        scroll(0, 0);
    });

    codeButton.addEventListener('click', function (e) {
        var embedCode = genEmbedCode();
        embedOutput.value = embedCode;
    });
});

function genEmbedCode() {
    var _getInputValues = (0, _helpersEmbed_helperJs.getInputValues)();

    var width = _getInputValues.width;
    var height = _getInputValues.height;
    var vertical = _getInputValues.vertical;
    var horizon = _getInputValues.horizon;
    var display = _getInputValues.display;
    var duration = _getInputValues.duration;
    var msg = _getInputValues.msg;

    return '<iframe style="width:' + width + ';height:' + height + ';" src="https://all-user.github.io/olympic2020/demo/embed_response/index.html?vertical=' + vertical + '&horizon=' + horizon + '&display=' + display + '&duration=' + duration + '&msg=' + fixedEncodeURIComponent(msg) + '"></iframe>';
}

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

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

var verticalInput = undefined,
    horizonInput = undefined,
    displayInput = undefined,
    durationInput = undefined,
    messageInput = undefined,
    iWidthInput = undefined,
    iHeightInput = undefined;

function getInputValues() {
    verticalInput = verticalInput || document.querySelector('#vertical');
    horizonInput = horizonInput || document.querySelector('#horizon');
    displayInput = displayInput || document.querySelector('#display');
    durationInput = durationInput || document.querySelector('#duration');
    messageInput = messageInput || document.querySelector('#message');
    iWidthInput = iWidthInput || document.querySelector('#i-width');
    iHeightInput = iHeightInput || document.querySelector('#i-height');

    var vertical = verticalInput.value | 0;
    var horizon = horizonInput.value | 0;
    var display = displayInput.value | 0;
    var duration = durationInput.value | 0;
    var msg = messageInput.value.split('\n');
    var width = iWidthInput.value;
    var height = iHeightInput.value;

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
