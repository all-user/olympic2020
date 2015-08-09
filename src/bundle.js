(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Olympic2020Js = require('./Olympic2020.js');

var _Olympic2020Js2 = _interopRequireDefault(_Olympic2020Js);

var EmblemGroup = (function () {
    function EmblemGroup(chars, length, size) {
        _classCallCheck(this, EmblemGroup);

        if (chars.length < length) {
            for (var i = chars.length; i < length; i++) {
                chars += ' ';
            }
        } else if (length != null && chars.length > length) {
            chars = chars.slice(0, length);
        }

        var emblems = _transfromToOlympic2020Array(chars, size);

        if (emblems) {
            this.emblems = emblems;
        } else {
            throw new Error('EmblemGroup arguments expect string or array of Olympic2020.');
        }
    }

    _createClass(EmblemGroup, [{
        key: 'toString',
        value: function toString() {
            return this.emblems.map(function (e) {
                return e.char;
            }).join('');
        }
    }, {
        key: 'map',
        value: function map(str) {
            this.emblems.forEach(function (emblem, idx) {
                var c = str[idx];
                if (!c) {
                    c = ' ';
                }
                emblem.to(c);
            });
        }
    }, {
        key: 'appendTo',
        value: function appendTo(parent) {
            var frag = this.emblems.reduce(function (f, e) {
                f.appendChild(e.dom);
            }, document.createDocumentFragment());
            parent.appenChild(frag);
        }
    }]);

    return EmblemGroup;
})();

function _transfromToOlympic2020Array(arg) {
    // (string | [Olympic2020]) => [Olympic2020] | false

    var res = undefined;
    switch (typeof arg) {
        case 'string':
            res = [].map.call(arg, function (c) {
                return new _Olympic2020Js2['default'](c, size);
            });
            break;
        case 'object':
            if (Array.isArray(arg) && arg.every(function (o) {
                return o instanceof _Olympic2020Js2['default'];
            })) {
                res = arg;
            } else {
                res = false;
            };
            break;
        default:
            res = false;
    }

    return res;
}

exports['default'] = EmblemGroup;
module.exports = exports['default'];

},{"./Olympic2020.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Olympic2020 = (function () {
    function Olympic2020(c, size) {
        _classCallCheck(this, Olympic2020);

        this.char = null;
        this.dom = _createDom();
        this._displayTime = 1000;
        this._duration = 800;
        this._easing = 'cubic-bezier(.26,.92,.41,.98)';
        this._stopAnimate = false;

        _updateTransitionConfig.call(this);
        if (typeof size === 'number' && size > 0) {
            this.size = size;
        } else {
            this.size = 100;
        }
        this.to(c);
    }

    _createClass(Olympic2020, [{
        key: 'to',
        value: function to(c) {
            var _c = c && c.toLowerCase && c.toLowerCase();
            if (FORMATION_TABLE[_c]) {
                _changeStyle.call(this, _c);
                this.char = _c;
                return true;
            }
            return false;
        }
    }, {
        key: 'appendTo',
        value: function appendTo(parent) {
            parent.appendChild(this.dom);
        }
    }, {
        key: 'stopAnimate',
        value: function stopAnimate() {
            this._stopAnimate = true;
        }
    }, {
        key: 'animateFromString',
        value: function animateFromString(str, time) {
            var _this = this;

            this._stopAnimate = false;
            if (typeof time === 'number') {
                this._displayTime = time;
            } else {
                time = this._displayTime;
            }

            [].reduce.call(str, function (p, c) {
                return p.then(function () {
                    return new Promise(function (resolve, reject) {
                        if (_this._stopAnimate) {
                            reject();
                            return;
                        }
                        _this.to(c);
                        setTimeout(resolve, _this._displayTime);
                    });
                });
            }, Promise.resolve());
        }
    }, {
        key: 'size',
        set: function set(size) {
            var domStyle = this.dom.style;
            domStyle.width = size + 'px';
            domStyle.height = size + 'px';
        }
    }, {
        key: 'displayTime',
        set: function set(time) {
            this._displayTime = time;
        },
        get: function get() {
            return this._displayTime;
        }
    }, {
        key: 'duration',
        set: function set(time) {
            this._duration = time;
            _updateTransitionConfig.call(this);
        },
        get: function get() {
            return this._duration;
        }
    }, {
        key: 'easing',
        set: function set(val) {
            this._easing = val;
            _updateTransitionConfig.call(this);
        },
        get: function get() {
            return this._easing;
        }
    }]);

    return Olympic2020;
})();

function _createDom() {
    return baseDom.cloneNode(true);
}

function _changeStyle(c) {
    // @bind this
    var classTable = FORMATION_TABLE[c];
    [].forEach.call(this.dom.childNodes, function (node, idx) {
        var pos = undefined;
        // fix for '/'
        if (c === '/' && idx === 0) {
            pos = 'pos_3_0';
        } else {
            pos = 'pos_' + idx % 3 + '_' + (idx / 3 | 0);
        }
        node.className = classTable[idx] + ' ' + pos;
        if ([].some.call(node.classList, function (c) {
            return ROTATE_TABLE.indexOf(c) !== -1;
        })) {
            return;
        }
        node.classList.add(ROTATE_TABLE[Math.random() * 4 | 0]);
    });
}

function _updateTransitionConfig() {
    var _this2 = this;

    // @bind this
    var val = TRANSITION_PROPS.reduce(function (str, prop, idx) {
        return '' + str + (idx ? ',' : '') + ' ' + prop + ' ' + _this2._duration + 'ms ' + _this2._easing;
    }, '');

    _updateStyle(this.dom.childNodes);

    function _updateStyle(list) {
        [].forEach.call(list, function (node) {
            node.style.transition = val;
            if (node.firstChild) {
                _updateStyle(node.childNodes);
            }
        });
    }
}

/*
 * prototype of emblem dom.
 */
var baseDom = (function () {
    var wrapper = document.createElement('div');
    var part = document.createElement('div');
    var whiteCircleW = document.createElement('div');
    var whiteCircle = document.createElement('div');
    var docFrag = document.createDocumentFragment();

    wrapper.className = 'olympic-emblem';
    part.className = 'part';
    whiteCircleW.className = 'white_circle_wrapper';
    whiteCircle.className = 'white_circle';

    whiteCircleW.appendChild(whiteCircle);
    part.appendChild(whiteCircleW);

    // div.wrapper > div.part * 9 (emmet syntax)
    for (var i = 0; i < 9; i++) {
        var _part = part.cloneNode(true);
        _part.classList.add('pos_' + i % 3 + '_' + (i / 3 | 0));
        docFrag.appendChild(_part);
    }
    wrapper.appendChild(docFrag);

    return wrapper;
})();

var ROTATE_TABLE = ['rotate0', 'rotate90', 'rotate180', 'rotate270'];

/*
 * parts className table.
 */
var G_R0 = "part arc gold rotate0";
var G_R90 = "part arc gold rotate90";
var G_R180 = "part arc gold rotate180";
var G_R270 = "part arc gold rotate270";
var S_R0 = "part arc silver rotate0";
var S_R90 = "part arc silver rotate90";
var S_R180 = "part arc silver rotate180";
var S_R270 = "part arc silver rotate270";
var P1 = "part pole1 gray";
var P2_V = "part pole2_v gray";
var P2_H = "part pole2_h gray";
var P3_V = "part pole3_v gray";
var P3_H = "part pole3_h gray";
var C_S = "part circle_s red";
var C_L = "part circle_l red";
var BL = "part blank";

/*
 * formation settings of all characters.
 */
var FORMATION_TABLE = {
    "a": [G_R180, P1, G_R270, S_R0, C_S, S_R90, P1, BL, P1],
    "b": [BL, P3_V, G_R90, BL, BL, S_R90, BL, BL, S_R180],
    "c": [S_R180, P1, G_R90, P1, BL, BL, G_R90, P1, S_R180],
    "d": [P3_V, S_R90, G_R270, BL, BL, P1, BL, G_R180, S_R0],
    "e": [BL, P3_V, G_R90, BL, BL, C_S, BL, BL, S_R180],
    "f": [BL, P3_V, S_R90, BL, BL, C_S, BL, BL, BL],
    "g": [P3_V, G_R0, BL, BL, BL, S_R90, BL, C_S, G_R180],
    "h": [P3_V, BL, P3_V, BL, C_S, BL, BL, BL, BL],
    "i": [BL, C_S, BL, BL, P2_V, BL, BL, BL, BL],
    "j": [BL, BL, P2_V, BL, BL, BL, S_R90, C_S, G_R180],
    "k": [P3_V, BL, G_R0, BL, C_S, BL, BL, BL, S_R270],
    "l": [P3_V, BL, BL, BL, BL, BL, BL, C_S, G_R180],
    "m": [G_R270, BL, S_R180, P2_V, C_S, P2_V, BL, BL, BL],
    "n": [P3_V, G_R270, P3_V, BL, C_S, BL, BL, S_R90, BL],
    "o": [S_R180, P1, G_R270, P1, BL, P1, G_R90, P1, S_R0],
    "p": [P3_V, C_S, G_R90, BL, S_R270, BL, BL, BL, BL],
    "q": [S_R180, P1, G_R270, P1, BL, P1, G_R90, P1, C_S],
    "r": [P3_V, C_S, S_R90, BL, P1, S_R180, BL, BL, G_R270],
    "s": [G_R180, P3_V, S_R90, S_R90, BL, BL, G_R270, BL, C_S],
    "t": [G_R0, P3_V, C_S, BL, BL, BL, BL, BL, S_R180],
    "u": [P2_V, BL, C_S, P1, BL, P1, G_R90, P1, S_R0],
    "v": [S_R270, BL, S_R180, G_R90, BL, G_R0, BL, P1, BL],
    "w": [S_R270, BL, G_R180, S_R270, P1, G_R180, G_R90, BL, S_R0],
    "x": [G_R90, BL, S_R0, BL, P1, BL, S_R180, BL, G_R270],
    "y": [G_R270, BL, S_R180, BL, C_S, BL, BL, P1, BL],
    "z": [G_R0, P1, S_R0, BL, C_S, BL, S_R180, P1, S_R180],
    "1": [G_R180, P3_V, BL, BL, BL, BL, BL, BL, BL],
    "2": [S_R0, P3_V, G_R270, BL, BL, S_R0, C_S, BL, G_R180],
    "3": [G_R0, P1, G_R270, BL, C_S, BL, S_R270, P1, S_R0],
    "4": [BL, S_R180, BL, G_R180, C_S, P1, BL, P1, BL],
    "5": [BL, P1, S_R0, BL, G_R90, P1, BL, C_S, S_R180],
    "6": [BL, S_R0, BL, BL, P2_V, G_R90, BL, BL, S_R180],
    "7": [G_R0, C_S, P3_V, BL, BL, BL, BL, BL, BL],
    "8": [S_R0, C_S, S_R90, G_R0, BL, G_R90, S_R270, BL, S_R180],
    "9": [G_R0, P2_V, BL, S_R270, BL, BL, BL, G_R180, BL],
    "0": [C_L, BL, BL, BL, BL, BL, BL, BL, BL],
    "!": [P2_V, BL, BL, BL, BL, BL, C_S, BL, BL],
    ".": [BL, BL, BL, BL, BL, BL, P1, BL, BL],
    "'": [P1, BL, BL, G_R0, BL, BL, BL, BL, BL],
    ":": [P1, BL, BL, BL, BL, BL, P1, BL, BL],
    ";": [P1, BL, BL, BL, BL, BL, C_S, BL, BL],
    "/": [G_R0, BL, S_R180, BL, S_R180, G_R0, S_R180, G_R0, BL],
    "_": [BL, BL, BL, BL, BL, BL, P2_H, BL, BL],
    " ": [BL, BL, BL, BL, BL, BL, BL, BL, BL]
};

/*
 * transition settings.
 */
var TRANSITION_PROPS = ['top', 'left', 'background-color', 'border-radius'];

exports['default'] = Olympic2020;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Olympic2020Js = require('./Olympic2020.js');

var _Olympic2020Js2 = _interopRequireDefault(_Olympic2020Js);

var _EmblemGroupJs = require('./EmblemGroup.js');

var _EmblemGroupJs2 = _interopRequireDefault(_EmblemGroupJs);

window.Olympic2020 = _Olympic2020Js2['default'];
window.EmblemGroup = _EmblemGroupJs2['default'];

},{"./EmblemGroup.js":1,"./Olympic2020.js":2}]},{},[3])
//# sourceMappingURL=bundle.js.map
