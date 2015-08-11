(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var wrapper = document.querySelector('#wrapper');
    var verticalInput = document.querySelector('#vertical');
    var horizonInput = document.querySelector('#horizon');
    var displayInput = document.querySelector('#display');
    var durationInput = document.querySelector('#duration');
    var messageInput = document.querySelector('#message');
    var genButton = document.querySelector('#generate-button');

    var WIDTH = +getComputedStyle(document.querySelector('.container')).width.replace('px', '');
    var PADDING = +getComputedStyle(document.querySelector('.container')).paddingLeft.replace('px', '');
    var SIZE = WIDTH - PADDING * 2;
    var TITLE_COPY = 'tokyo  2020   olympic';
    var SHORT_COPY = 'hi!!';
    var DATE_COPY = '8/9:sunday';
    var BLANK_COPY = '                                                        ';
    var LONG_COPY = 'olympic paralympic games';
    var COPYS = [TITLE_COPY, LONG_COPY, SHORT_COPY, '1234567890', BLANK_COPY, DATE_COPY, 'happy day!', BLANK_COPY, 'hello world', TITLE_COPY, LONG_COPY, SHORT_COPY, BLANK_COPY, '1234567890', 'happy day!', 'hello world', BLANK_COPY];

    var cfg = {
        vertical: 3,
        horizon: 7,
        display: 1500,
        duration: 800,
        msg: COPYS.join('')
    };

    messageInput.textContent = COPYS.join('\n');

    clickButtonHandler(cfg);

    genButton.addEventListener('click', function (e) {
        clickButtonHandler();
    });

    function clickButtonHandler(cfg) {

        if (typeof cfg !== 'object') {
            var vertical = verticalInput.value | 0;
            var horizon = horizonInput.value | 0;
            var display = displayInput.value | 0;
            var duration = durationInput.value | 0;
            var msg = messageInput.value.replace(/\n/g, '');

            cfg = { vertical: vertical, horizon: horizon, display: display, duration: duration, msg: msg };
        }

        while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild);
        }

        var group = generateSignboard(cfg);
        group.appendTo(wrapper);

        wrapper.addEventListener('click', function () {
            if (group.isAnimating) {
                group.stopAnimate.call(group);
            } else {
                group.resumeAnimate.call(group);
            }
        });

        group.animateFromString(cfg.msg, { loop: true });
    }

    function generateSignboard(cfg) {
        // object => EmblemGroup
        if (! typeof cfg === 'object') {
            return;
        }

        var vertical = cfg.vertical;
        var horizon = cfg.horizon;
        var display = cfg.display;
        var duration = cfg.duration;
        var msg = cfg.msg;

        vertical = vertical || 3;
        horizon = horizon || 7;
        display = display || 1500;
        var margin = SIZE / (horizon * 5);
        var emblemSize = margin * 3;

        var group = new EmblemGroup(msg, { length: vertical * horizon, size: emblemSize, displayTime: display, duration: duration });

        group.emblems.forEach(function (e) {
            e.dom.style.margin = margin + 'px';
        });

        return group;
    }
});

},{}]},{},[1]);
