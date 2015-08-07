(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Olympic2020 = (function () {
  function Olympic2020(c) {
    _classCallCheck(this, Olympic2020);

    this.char = null;
    this.dom = createEmblemDom();
    this.formTo(c);
  }

  _createClass(Olympic2020, [{
    key: 'formTo',
    value: function formTo(c) {
      var _c = c && c.toLowerCase && c.toLowerCase();
      if (formationTable[_c]) {
        this.char = _c;
        return true;
      }
      return false;
    }
  }]);

  return Olympic2020;
})();

function createEmblemDom() {

  return;
}

// base of emblem dom.

var wrapper = document.createElement('div');
var part = document.createElement('div');
var docFrag = document.creteDocumnetFragment();

wrapper.classList.add('olympic-emblem');
part.classList.add('part');

// formation settings of all characters.

var formationTable = {
  "a": "_",
  "b": "_",
  "c": "_",
  "d": "_",
  "e": "_",
  "f": "_",
  "g": "_",
  "h": "_",
  "i": "_",
  "j": "_",
  "k": "_",
  "l": "_",
  "m": "_",
  "n": "_",
  "o": "_",
  "p": "_",
  "q": "_",
  "r": "_",
  "s": "_",
  "t": "_",
  "u": "_",
  "v": "_",
  "w": "_",
  "x": "_",
  "y": "_",
  "z": "_",
  "1": "_",
  "2": "_",
  "3": "_",
  "4": "_",
  "5": "_",
  "6": "_",
  "7": "_",
  "8": "_",
  "9": "_",
  "0": "_",
  "!": "_",
  ".": "_",
  "'": "_",
  ":": "_",
  ";": "_",
  "/": "_",
  "_": "_"
};

exports['default'] = Olympic2020;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

require('./Olympic2020.js');

},{"./Olympic2020.js":1}]},{},[2])
//# sourceMappingURL=bundle.js.map
