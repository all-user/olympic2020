(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var wrapper = document.querySelector('#wrapper');
    var olms = [];
    olms.push(new Olympic2020('a', { size: 90, displayTime: 3111, random: true }));
    olms.push(new Olympic2020('z', { size: 90, displayTime: 6399, random: true }));
    olms.push(new Olympic2020('t', { size: 90, displayTime: 1477, random: true }));
    olms.push(new Olympic2020('/', { size: 500 }));

    var ALL_VALID_CHARS = "abcdefghijklmnopqrstuvwxyz1234567890!.':;/_";

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
