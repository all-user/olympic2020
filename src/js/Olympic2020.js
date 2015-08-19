const _CHAR_PROP         = Symbol();
const _DOM_PROP          = Symbol();
const _DISPLAY_TIME_PROP = Symbol();
const _DURATION_PROP     = Symbol();
const _EASING_PROP       = Symbol();
const _IS_ANIMATING_PROP = Symbol();
const _RESUME_PROP       = Symbol();
const _LOOP_PROP         = Symbol();
const _RANDOM_PROP       = Symbol();
const _PEDAL_PROP        = Symbol();

class Olympic2020 {
    constructor(c, opt) {
        if (typeof opt === 'object') {
            var { size, displayTime, duration, easing, loop, random, pedal } = opt;
        }

        this[_IS_ANIMATING_PROP]  =   false;
        this[_RESUME_PROP]        =   null;
        this[_CHAR_PROP]          =   null;
        this[_DOM_PROP]           =   _createDom();

        // --- option ---
        this.displayTime          =   (displayTime | 0) || 1500;
        this.duration             =   (duration    | 0) || 1000;
        this.loop                 =   loop              || false;
        this.random               =   random            || false;
        this.easing               =   easing            || 'cubic-bezier(.26,.92,.41,.98)';
        this.pedal                =   pedal == null ? true : pedal;

        if (typeof size === 'number' && size >= 0) {
            this.size = size;
        } else {
            console.error('Olympic2020.size should be type of zero or positive number.');
            this.size = 100;
        }

        this.to(c);
    }

    to(c) {
        let _c = c && c.toLowerCase && c.toLowerCase();
        if (!_formationTable[_c])    { return false; }
        if (this[_CHAR_PROP] === _c) { return false; }
        _changeStyle.call(this, _c);
        this[_CHAR_PROP] = _c;
        return true;
    }

    appendTo(parent) {
        parent.appendChild(this[_DOM_PROP]);
    }

    stopAnimate() {
        this[_IS_ANIMATING_PROP] = false;
    }

    resumeAnimate() {
        this[_IS_ANIMATING_PROP] = true;
        this[_RESUME_PROP]();
    }

    animateFromString(str, opt) {
        if (typeof opt === 'object') {
            this.option = opt;
        }

        this[_IS_ANIMATING_PROP] = true;
        this[_RESUME_PROP]       = null;

        [].reduce.call(str, (p, c, idx) => {  // p = Promise.resolve(); c = str[idx];
            let isLast = idx === str.length - 1;
            return p.then(() => {
                return new Promise((resolve, reject) => {
                    if (!this[_IS_ANIMATING_PROP]) {
                        this[_RESUME_PROP] = resolve;
                        return;
                    }
                    if (this[_RANDOM_PROP]) {
                        let _c = str[Math.random() * str.length | 0];
                        this.to(_c);
                    } else {
                        this.to(c);
                    }
                    if (isLast) {
                        if (this[_LOOP_PROP]) {
                            setTimeout(() => {
                                this.animateFromString.call(this, str);
                                resolve();
                            }, this[_DISPLAY_TIME_PROP]);
                            return;
                        } else {
                            setTimeout(reject, this[_DISPLAY_TIME_PROP]);
                            return;
                        }
                    }
                    setTimeout(resolve, this[_DISPLAY_TIME_PROP]);
                });
            });
        }, Promise.resolve()).catch(() => { this[_IS_ANIMATING_PROP] = false; });
    }


    /**
     * Setter and Getter
     */

    // --- option ---
    set option({ size, displayTime, duration, loop, random, pedal, easing }) {
        this.size        = size;
        this.displayTime = displayTime;
        this.duration    = duration;
        this.easing      = easing;
        this.loop        = loop;
        this.random      = random;
        this.pedal       = pedal;
    }
    get option() {
        return {
            size:        this.size,
            displaytime: this.displayTime,
            duration:    this.duration,
            easing:      this.easing,
            loop:        this.loop,
            random:      this.random,
            pedal:       this.pedal,
        }
    }

    // --- size ---
    set size(size) {
        if (typeof size === 'number' && size >= 0) {
            let domStyle = this.dom.style;
            domStyle.width  = `${ size }px`;
            domStyle.height = `${ size }px`;
        } else {
            console.error('Olympic2020.size should be type of zero or positive number.');
        }
    }
    get size() { return +this[_DOM_PROP].style.width.replace('px', ''); }


    // --- displayTime ---
    set displayTime(time) {
        if (typeof time === 'number' && time > 0) {
            this[_DISPLAY_TIME_PROP] = time;
        } else {
            console.error('Olympic2020.displayTime should be type of positive number.');
        }
    }
    get displayTime()     { return this[_DISPLAY_TIME_PROP]; }


    // --- duration ---
    set duration(time) {
        if (typeof time === 'number' && time >= 0) {
            this[_DURATION_PROP] = time;
            _updateTransitionConfig.call(this);
        } else {
            console.error('Olympic2020.duration should be type of zero or positive number.');
        }
    }
    get duration() { return this[_DURATION_PROP]; }


    // --- easing ---
    set easing(val) {
        this[_EASING_PROP] = val;
        _updateTransitionConfig.call(this);
    }
    get easing() { return this[_EASING_PROP]; }


    // --- loop ---
    set loop(bool) {
        if (bool != null) {
            this[_LOOP_PROP] = bool;
        }
    }
    get loop() { return this[_LOOP_PROP]; }


    // --- random ---
    set random(bool) {
        if (bool != null) {
            this[_RANDOM_PROP] = bool;
        }
    }
    get random() { return this[_RANDOM_PROP]; }


    // --- pedal ---
    set pedal(bool) {
        if (bool != null) {
            this[_PEDAL_PROP] = bool;
        }
    }
    get pedal() { return this[_PEDAL_PROP]; }


    // --- dom ---
    get dom() { return this[_DOM_PROP]; }


    // --- char ---
    get char() { return this[_CHAR_PROP]; }


    // --- isAnimating ---
    get isAnimating() { return this[_IS_ANIMATING_PROP]; }


    // --- allValidChars ---
    static get allValidChars() { return Object.keys(_formationTable); }


}


function _createDom() {
    return _BASE_DOM.cloneNode(true);
}

function _changeStyle(c) { // @bind this
    let oldC         = this[_CHAR_PROP];
    let oldFormation = _formationTable[oldC];
    let newFormation = _formationTable[c];
    if (!newFormation) { return; }
    let diffFormation;
    if (oldC) {
        diffFormation = newFormation.map((newStr, idx) => {
            let oldStr = oldFormation[idx];
            return newStr !== oldStr ? newStr : false;
        });
    } else {
        diffFormation = newFormation;
    }
    [].forEach.call(this[_DOM_PROP].childNodes, (node, idx) => {
        if (!diffFormation[idx]) { return; }
        let pos;
        // fix for '/'
        if (c === '/' && idx === 0) {
            pos = 'pos_3_0';
        } else {
            pos = `pos_${ idx % 3 }_${ idx / 3 | 0 }`;
        }
        node.className = `${ diffFormation[idx] } ${ pos }`;
        if (node.classList.contains('arc')) { return; }
        node.classList.add(_ROTATE_TABLE[Math.random() * 4 | 0]);
    });
}

function _updateTransitionConfig() { // @bind this
    let val = _TRANSITION_PROPS.reduce((str, prop, idx) => {
        return `${ str }${ idx ? ',' : '' } ${ prop } ${ this[_DURATION_PROP] }ms ${ this[_EASING_PROP] }`;
    }, '');

    _updateStyle(this[_DOM_PROP].childNodes);

    function _updateStyle(list) {
        [].forEach.call(list, node => {
            node.style.transition = val;
            if (node.firstChild) { _updateStyle(node.childNodes); }
        });
    }
}

/*
 * DOM in instance of Olympic2020.
 */
const _BASE_DOM = (() => {
    let wrapper      = document.createElement('div');
    let part         = document.createElement('div');
    let whiteCircleW = document.createElement('div');
    let whiteCircle  = document.createElement('div');
    let docFrag      = document.createDocumentFragment();

    wrapper.className      = 'olympic-emblem';
    part.className         = 'part';
    whiteCircleW.className = 'white_circle_wrapper';
    whiteCircle.className  = 'white_circle';

    whiteCircleW.appendChild(whiteCircle);
    part.appendChild(whiteCircleW);

    // in emmet syntax.
    // div.wrapper > div.part * 9
    for (let i = 0; i < 9; i++) {
        let _part = part.cloneNode(true);
        _part.classList.add(`pos_${ i % 3 }_${ i / 3 | 0 }`);
        docFrag.appendChild(_part);
    }
    wrapper.appendChild(docFrag);

    return wrapper;
})();


const _ROTATE_TABLE = ['rotate0', 'rotate90', 'rotate180', 'rotate270'];

/*
 * Parts className table.
 */
const _G_R0   = "part arc gold rotate0";
const _G_R90  = "part arc gold rotate90";
const _G_R180 = "part arc gold rotate180";
const _G_R270 = "part arc gold rotate270";
const _S_R0   = "part arc silver rotate0";
const _S_R90  = "part arc silver rotate90";
const _S_R180 = "part arc silver rotate180";
const _S_R270 = "part arc silver rotate270";
const _P1     = "part pole1 gray";
const _P2_V   = "part pole2_v gray";
const _P2_H   = "part pole2_h gray";
const _P3_V   = "part pole3_v gray";
const _P3_H   = "part pole3_h gray";
const _C_S    = "part circle_s red";
const _C_L    = "part circle_l red";
const _BL     = "part blank";

/*
 * Formation settings of all characters.
 */
let _formationTable = {
    "a": [
        _G_R180, _P1,     _G_R270,
        _S_R0,   _C_S,    _S_R90,
        _P1,     _BL,     _P1
    ],
    "b": [
        _BL,     _P3_V,   _G_R90,
        _BL,     _BL,     _S_R90,
        _BL,     _BL,     _S_R180
    ],
    "c": [
        _S_R180, _P1,     _G_R90,
        _P1,     _BL,     _BL,
        _G_R90,  _P1,     _S_R180
    ],
    "d": [
        _P3_V,   _S_R90,  _G_R270,
        _BL,     _BL,     _P1,
        _BL,     _G_R180, _S_R0
    ],
    "e": [
        _BL,     _P3_V,   _G_R90,
        _BL,     _BL,     _C_S,
        _BL,     _BL,     _S_R180
    ],
    "f": [
        _BL,     _P3_V,   _S_R90,
        _BL,     _BL,     _C_S,
        _BL,     _BL,     _BL
    ],
    "g": [
        _P3_V,   _G_R0,   _BL,
        _BL,     _BL,     _S_R90,
        _BL,     _C_S,    _G_R180
    ],
    "h": [
        _P3_V,   _BL,     _P3_V,
        _BL,     _C_S,    _BL,
        _BL,     _BL,     _BL
    ],
    "i": [
        _BL,     _C_S,    _BL,
        _BL,     _P2_V,   _BL,
        _BL,     _BL,     _BL
    ],
    "j": [
        _BL,     _BL,     _P2_V,
        _BL,     _BL,     _BL,
        _S_R90,  _C_S,    _G_R180
    ],
    "k": [
        _P3_V,   _BL,     _G_R0,
        _BL,     _C_S,    _BL,
        _BL,     _BL,     _S_R270
    ],
    "l": [
        _P3_V,   _BL,     _BL,
        _BL,     _BL,     _BL,
        _BL,     _C_S,    _G_R180
    ],
    "m": [
        _G_R270, _BL,     _S_R180,
        _P2_V,   _C_S,    _P2_V,
        _BL,     _BL,     _BL
    ],
    "n": [
        _P3_V,   _G_R270, _P3_V,
        _BL,     _C_S,    _BL,
        _BL,     _S_R90,  _BL
    ],
    "o": [
        _S_R180, _P1,     _G_R270,
        _P1,     _BL,     _P1,
        _G_R90,  _P1,     _S_R0
    ],
    "p": [
        _P3_V,   _C_S,    _G_R90,
        _BL,     _S_R270, _BL,
        _BL,     _BL,     _BL
    ],
    "q": [
        _S_R180, _P1,     _G_R270,
        _P1,     _BL,     _P1,
        _G_R90,  _P1,     _C_S
    ],
    "r": [
        _P3_V,   _C_S,    _S_R90,
        _BL,     _P1,     _S_R180,
        _BL,     _BL,     _G_R270
    ],
    "s": [
        _G_R180, _P3_V,   _S_R90,
        _S_R90,  _BL,     _BL,
        _G_R270, _BL,     _C_S
    ],
    "t": [
        _G_R0,   _P3_V,   _C_S,
        _BL,     _BL,     _BL,
        _BL,     _BL,     _S_R180
    ],
    "u":  [
        _P2_V,   _BL,     _C_S,
        _P1,     _BL,     _P1,
        _G_R90,  _P1,     _S_R0
    ],
    "v": [
        _S_R270, _BL,     _S_R180,
        _G_R90,  _BL,     _G_R0,
        _BL,     _P1,     _BL
    ],
    "w": [
        _S_R270, _BL,     _G_R180,
        _S_R270, _P1,     _G_R180,
        _G_R90,  _BL,     _S_R0
    ],
    "x": [
        _G_R90,  _BL,     _S_R0,
        _BL,     _P1,     _BL,
        _S_R180, _BL,     _G_R270
    ],
    "y": [
        _G_R270, _BL,     _S_R180,
        _BL,     _C_S,    _BL,
        _BL,     _P1,     _BL
    ],
    "z": [
        _G_R0,   _P1,     _S_R0,
        _BL,     _C_S,    _BL,
        _S_R180, _P1,     _S_R180
    ],
    "1": [
        _G_R180, _P3_V,   _BL,
        _BL,     _BL,     _BL,
        _BL,     _BL,     _BL
    ],
    "2": [
        _S_R0,   _P3_V,   _G_R270,
        _BL,     _BL,     _S_R0,
        _C_S,    _BL,     _G_R180
    ],
    "3": [
        _G_R0,   _P1,     _G_R270,
        _BL,     _C_S,    _BL,
        _S_R270, _P1,     _S_R0
    ],
    "4": [
        _BL,     _S_R180, _BL,
        _G_R180, _C_S,    _P1,
        _BL,     _P1,     _BL
    ],
    "5": [
        _BL,     _P1,     _S_R0,
        _BL,     _G_R90,  _P1,
        _BL,     _C_S,    _S_R180
    ],
    "6": [
        _BL,     _S_R0,   _BL,
        _BL,     _P2_V,   _G_R90,
        _BL,     _BL,     _S_R180
    ],
    "7": [
        _G_R0,   _C_S,    _P3_V,
        _BL,     _BL,     _BL,
        _BL,     _BL,     _BL
    ],
    "8": [
        _S_R0,   _C_S,    _S_R90,
        _G_R0,   _BL,     _G_R90,
        _S_R270, _BL,     _S_R180
    ],
    "9": [
        _G_R0,   _P2_V,   _BL,
        _S_R270, _BL,     _BL,
        _BL,     _G_R180, _BL
    ],
    "0": [
        _C_L,    _BL,     _BL,
        _BL,     _BL,     _BL,
        _BL,     _BL,     _BL
    ],
    "!": [
        _P2_V,   _BL,     _BL,
        _BL,     _BL,     _BL,
        _C_S,    _BL,     _BL
    ],
    ".": [
        _BL,     _BL,     _BL,
        _BL,     _BL,     _BL,
        _P1,     _BL,     _BL
    ],
    "'": [
        _P1,     _BL,     _BL,
        _G_R0,   _BL,     _BL,
        _BL,     _BL,     _BL
    ],
    ":": [
        _P1,     _BL,     _BL,
        _BL,     _BL,     _BL,
        _P1,     _BL,     _BL
    ],
    ";": [
        _P1,     _BL,     _BL,
        _BL,     _BL,     _BL,
        _C_S,    _BL,     _BL
    ],
    "/": [
        _G_R0,   _BL,     _S_R180,
        _BL,     _S_R180, _G_R0,
        _S_R180, _G_R0,   _BL
    ],
    "_": [
        _BL,     _BL,     _BL,
        _BL,     _BL,     _BL,
        _P2_H,   _BL,     _BL
    ],
    " ": [
        _BL,     _BL,     _BL,
        _BL,     _BL,     _BL,
        _BL,     _BL,     _BL
    ],
};


/*
 * Transition settings.
 */
const _TRANSITION_PROPS = [
    'top',
    'left',
    'background-color',
    'border-radius',
];

export default Olympic2020;
