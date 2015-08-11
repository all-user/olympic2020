(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var margin = 30;

    var wrapper = document.querySelector('#wrapper');
    var olms = [];
    var size = getComputedStyle(document.body).width.replace('px', '') - margin * 2;
    size = size > 500 ? 500 : size;
    var sizeS = size * 0.9;

    olms.push(new Olympic2020('a', { size: sizeS, displayTime: 3111, random: true }));
    olms.push(new Olympic2020('z', { size: sizeS, displayTime: 6399, random: true }));
    olms.push(new Olympic2020('t', { size: sizeS, displayTime: 1477, random: true }));
    olms.push(new Olympic2020('/', { size: size }));

    var ALL_VALID_CHARS = Olympic2020.ALL_VALID_CHARS;

    olms.forEach(function (olm, idx) {
        olm.dom.addEventListener('click', function () {
            if (olm.isAnimating) {
                olm.stopAnimate.call(olm);
            } else {
                olm.resumeAnimate.call(olm);
            }
        });

        wrapper.appendChild(olm.dom);

        setTimeout(function () {
            olm.animateFromString(ALL_VALID_CHARS, { loop: true });
        }, 1000);
    });
});

},{}]},{},[1]);
