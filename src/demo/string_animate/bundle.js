(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var wrapper = document.querySelector('#wrapper');
    var WIDTH = +getComputedStyle(document.querySelector('.container')).width.replace('px', '');
    var PADDING = +getComputedStyle(document.querySelector('.container')).paddingLeft.replace('px', '');
    var SIZE = WIDTH - PADDING * 2;
    var MARGIN = SIZE / 35;
    var EMBLEM_SIZE = MARGIN * 3;
    var TITLE_COPY = 'tokyo  2020   olympic';
    var SHORT_COPY = 'hi!!';
    var DATE_COPY = '8/9:sunday';
    var BLANK_COPY = '                                                        ';
    var LONG_COPY = 'olympic paralympic games';
    var COPYS = [TITLE_COPY, LONG_COPY, SHORT_COPY, '1234567890', BLANK_COPY, DATE_COPY, 'happy day!', BLANK_COPY, 'hello world', TITLE_COPY, LONG_COPY, SHORT_COPY, BLANK_COPY, '1234567890', 'happy day!', 'hello world', BLANK_COPY];

    var group = new EmblemGroup(TITLE_COPY, { length: 21, size: EMBLEM_SIZE, displayTime: 1500 });

    group.emblems.forEach(function (e) {
        e.dom.style.margin = MARGIN + 'px';
    });

    group.appendTo(wrapper);

    wrapper.addEventListener('click', function () {
        if (group.isAnimating) {
            group.stopAnimate.call(group);
        } else {
            group.resumeAnimate.call(group);
        }
    });

    group.animateFromString(COPYS, { loop: true });
});

},{}]},{},[1]);
