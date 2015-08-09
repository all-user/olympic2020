class Olympic2020 {

    constructor(c, opt) {
        if (typeof opt === 'object') {
            var { size, displayTime, duration, easing, roop, random } = opt;
        }
        this.char = null;
        this.dom  = _createDom();
        this._displayTime = displayTime || 1000;
        this._duration    = duration || 800;
        this._easing      = easing || 'cubic-bezier(.26,.92,.41,.98)';
        this._isAnimating = false;
        this._resume      = null;
        this._loop        = roop || false;
        this._random      = random || false;

        _updateTransitionConfig.call(this);
        if (typeof size === 'number' && size > 0) {
            this.size = size;
        } else {
            this.size = 100;
        }
        this.to(c);
    }

    to(c) {
        let _c = c && c.toLowerCase && c.toLowerCase();
        if (FORMATION_TABLE[_c]) {
            _changeStyle.call(this, _c);
            this.char = _c;
            return true;
        }
        return false;
    }

    appendTo(parent) {
        parent.appendChild(this.dom);
    }

    stopAnimate() {
        this._isAnimating = false;
    }

    resumeAnimate() {
        this._isAnimating = true;
        this._resume();
    }

    animateFromString(str, opt) {
        if (typeof opt === 'object') {
            var { displayTime, loop, random } = opt;
        }
        this._isAnimating = true;
        this._resume      = null;
        if (loop != null) {
            this._loop = loop;
        }
        if (random != null) {
            this._random = random;
        }
        if (typeof displayTime === 'number' && displayTime > 0) {
            this._displayTime = displayTime;
        } else {
            displayTime = this._displayTime;
        }

        [].reduce.call(str, (p, c, idx) => {
            let isLast = idx === str.length - 1;
            return p.then(() => {
                return new Promise((resolve, reject) => {
                    if (!this._isAnimating) {
                        this._resume = resolve;
                        return;
                    }
                    if (this._random) {
                        let _c = str[Math.random() * str.length | 0];
                        this.to(_c);
                    } else {
                        this.to(c);
                    }
                    if (isLast) {
                        if (this._loop) {
                            setTimeout(() => {
                                this.animateFromString.call(this, str);
                                resolve();
                            }, this._displayTime);
                            return;
                        } else {
                            setTimeout(reject, this._displayTime);
                            return;
                        }
                    }
                    setTimeout(resolve, this._displayTime);
                });
            });
        }, Promise.resolve()).catch(() => { this._isAnimating = false; });
    }

    /*
     * seter and geter of propertys
     */
    set size(size) {
        let domStyle = this.dom.style;
        domStyle.width  = `${ size }px`;
        domStyle.height = `${ size }px`;
    }

    set displayTime(time) { this._displayTime = time; }
    get displayTime()     { return this._displayTime; }

    set duration(time) {
        this._duration = time;
        _updateTransitionConfig.call(this);
    }

    get duration() { return this._duration; }

    set easing(val) {
        this._easing = val;
        _updateTransitionConfig.call(this);
    }

    get easing() { return this._easing; }

    get isAnimating() { return this._isAnimating; }

    set loop(bool) { this._loop = bool; }
    get loop()     { return this._loop; }

    set random(bool) { this._random = bool; }
    get random()     { return this._random; }

}


function _createDom() {
    return baseDom.cloneNode(true);
}

function _changeStyle(c) { // @bind this
    let classTable = FORMATION_TABLE[c];
    [].forEach.call(this.dom.childNodes, (node, idx) => {
        let pos;
        // fix for '/'
        if (c === '/' && idx === 0) {
            pos = 'pos_3_0';
        } else {
            pos = `pos_${ idx % 3 }_${ idx / 3 | 0 }`;
        }
        node.className = `${ classTable[idx] } ${ pos }`;
        if ([].some.call(node.classList, c => ROTATE_TABLE.indexOf(c) !== -1)) {
            return;
        }
        node.classList.add(ROTATE_TABLE[Math.random() * 4 | 0]);
    });
}

function _updateTransitionConfig() { // @bind this
    let val = TRANSITION_PROPS.reduce((str, prop, idx) => {
        return `${ str }${ idx ? ',' : '' } ${ prop } ${ this._duration }ms ${ this._easing }`;
    }, '');

    _updateStyle(this.dom.childNodes);

    function _updateStyle(list) {
        [].forEach.call(list, node => {
            node.style.transition = val;
            if (node.firstChild) { _updateStyle(node.childNodes); }
        });
    }
}

/*
 * original of emblem dom.
 */
let baseDom = (() => {
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

    // div.wrapper > div.part * 9 (emmet syntax)
    for (let i = 0; i < 9; i++) {
        let _part = part.cloneNode(true);
        _part.classList.add(`pos_${ i % 3 }_${ i / 3 | 0 }`);
        docFrag.appendChild(_part);
    }
    wrapper.appendChild(docFrag);

    return wrapper;
})();


const ROTATE_TABLE = ['rotate0', 'rotate90', 'rotate180', 'rotate270'];

/*
 * parts className table.
 */
const G_R0   = "part arc gold rotate0";
const G_R90  = "part arc gold rotate90";
const G_R180 = "part arc gold rotate180";
const G_R270 = "part arc gold rotate270";
const S_R0   = "part arc silver rotate0";
const S_R90  = "part arc silver rotate90";
const S_R180 = "part arc silver rotate180";
const S_R270 = "part arc silver rotate270";
const P1     = "part pole1 gray";
const P2_V   = "part pole2_v gray";
const P2_H   = "part pole2_h gray";
const P3_V   = "part pole3_v gray";
const P3_H   = "part pole3_h gray";
const C_S    = "part circle_s red";
const C_L    = "part circle_l red";
const BL     = "part blank";

/*
 * formation settings of all characters.
 */
const FORMATION_TABLE = {
    "a": [
        G_R180, P1,     G_R270,
        S_R0,   C_S,    S_R90,
        P1,     BL,     P1
    ],
    "b": [
        BL,     P3_V,   G_R90,
        BL,     BL,     S_R90,
        BL,     BL,     S_R180
    ],
    "c": [
        S_R180, P1,     G_R90,
        P1,     BL,     BL,
        G_R90,  P1,     S_R180
    ],
    "d": [
        P3_V,   S_R90,  G_R270,
        BL,     BL,     P1,
        BL,     G_R180, S_R0
    ],
    "e": [
        BL,     P3_V,   G_R90,
        BL,     BL,     C_S,
        BL,     BL,     S_R180
    ],
    "f": [
        BL,     P3_V,   S_R90,
        BL,     BL,     C_S,
        BL,     BL,     BL
    ],
    "g": [
        P3_V,   G_R0,   BL,
        BL,     BL,     S_R90,
        BL,     C_S,    G_R180
    ],
    "h": [
        P3_V,   BL,     P3_V,
        BL,     C_S,    BL,
        BL,     BL,     BL
    ],
    "i": [
        BL,     C_S,    BL,
        BL,     P2_V,   BL,
        BL,     BL,     BL
    ],
    "j": [
        BL,     BL,     P2_V,
        BL,     BL,     BL,
        S_R90,  C_S,    G_R180
    ],
    "k": [
        P3_V,   BL,     G_R0,
        BL,     C_S,    BL,
        BL,     BL,     S_R270
    ],
    "l": [
        P3_V,   BL,     BL,
        BL,     BL,     BL,
        BL,     C_S,    G_R180
    ],
    "m": [
        G_R270, BL,     S_R180,
        P2_V,   C_S,    P2_V,
        BL,     BL,     BL
    ],
    "n": [
        P3_V,   G_R270, P3_V,
        BL,     C_S,    BL,
        BL,     S_R90,  BL
    ],
    "o": [
        S_R180, P1,     G_R270,
        P1,     BL,     P1,
        G_R90,  P1,     S_R0
    ],
    "p": [
        P3_V,   C_S,    G_R90,
        BL,     S_R270, BL,
        BL,     BL,     BL
    ],
    "q": [
        S_R180, P1,     G_R270,
        P1,     BL,     P1,
        G_R90,  P1,     C_S
    ],
    "r": [
        P3_V,   C_S,    S_R90,
        BL,     P1,     S_R180,
        BL,     BL,     G_R270
    ],
    "s": [
        G_R180, P3_V,   S_R90,
        S_R90,  BL,     BL,
        G_R270, BL,     C_S
    ],
    "t": [
        G_R0,   P3_V,   C_S,
        BL,     BL,     BL,
        BL,     BL,     S_R180
    ],
    "u":  [
        P2_V,   BL,     C_S,
        P1,     BL,     P1,
        G_R90,  P1,     S_R0
    ],
    "v": [
        S_R270, BL,     S_R180,
        G_R90,  BL,     G_R0,
        BL,     P1,     BL
    ],
    "w": [
        S_R270, BL,     G_R180,
        S_R270, P1,     G_R180,
        G_R90,  BL,     S_R0
    ],
    "x": [
        G_R90,  BL,     S_R0,
        BL,     P1,     BL,
        S_R180, BL,     G_R270
    ],
    "y": [
        G_R270, BL,     S_R180,
        BL,     C_S,    BL,
        BL,     P1,     BL
    ],
    "z": [
        G_R0,   P1,     S_R0,
        BL,     C_S,    BL,
        S_R180, P1,     S_R180
    ],
    "1": [
        G_R180, P3_V,   BL,
        BL,     BL,     BL,
        BL,     BL,     BL
    ],
    "2": [
        S_R0,   P3_V,   G_R270,
        BL,     BL,     S_R0,
        C_S,    BL,     G_R180
    ],
    "3": [
        G_R0,   P1,     G_R270,
        BL,     C_S,    BL,
        S_R270, P1,     S_R0
    ],
    "4": [
        BL,     S_R180, BL,
        G_R180, C_S,    P1,
        BL,     P1,     BL
    ],
    "5": [
        BL,     P1,     S_R0,
        BL,     G_R90,  P1,
        BL,     C_S,    S_R180
    ],
    "6": [
        BL,     S_R0,   BL,
        BL,     P2_V,   G_R90,
        BL,     BL,     S_R180
    ],
    "7": [
        G_R0,   C_S,    P3_V,
        BL,     BL,     BL,
        BL,     BL,     BL
    ],
    "8": [
        S_R0,   C_S,    S_R90,
        G_R0,   BL,     G_R90,
        S_R270, BL,     S_R180
    ],
    "9": [
        G_R0,   P2_V,   BL,
        S_R270, BL,     BL,
        BL,     G_R180, BL
    ],
    "0": [
        C_L,    BL,     BL,
        BL,     BL,     BL,
        BL,     BL,     BL
    ],
    "!": [
        P2_V,   BL,     BL,
        BL,     BL,     BL,
        C_S,    BL,     BL
    ],
    ".": [
        BL,     BL,     BL,
        BL,     BL,     BL,
        P1,     BL,     BL
    ],
    "'": [
        P1,     BL,     BL,
        G_R0,   BL,     BL,
        BL,     BL,     BL
    ],
    ":": [
        P1,     BL,     BL,
        BL,     BL,     BL,
        P1,     BL,     BL
    ],
    ";": [
        P1,     BL,     BL,
        BL,     BL,     BL,
        C_S,    BL,     BL
    ],
    "/": [
        G_R0,   BL,     S_R180,
        BL,     S_R180, G_R0,
        S_R180, G_R0,   BL
    ],
    "_": [
        BL,     BL,     BL,
        BL,     BL,     BL,
        P2_H,   BL,     BL
    ],
    " ": [
        BL,     BL,     BL,
        BL,     BL,     BL,
        BL,     BL,     BL
    ],
};


/*
 * transition settings.
 */
const TRANSITION_PROPS = [
    'top',
    'left',
    'background-color',
    'border-radius',
];

export default Olympic2020;
