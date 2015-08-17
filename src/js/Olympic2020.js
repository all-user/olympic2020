const CHAR_PROP         = Symbol();
const DOM_PROP          = Symbol();
const DISPLAY_TIME_PROP = Symbol();
const DURATION_PROP     = Symbol();
const EASING_PROP       = Symbol();
const IS_ANIMATING_PROP = Symbol();
const RESUME_PROP       = Symbol();
const LOOP_PROP         = Symbol();
const RANDOM_PROP       = Symbol();
const PEDAL_PROP        = Symbol();

/**
 * エンブレム１文字を表現するクラス
 */
class Olympic2020 {

    /**
     * @param {string}  [c=null]                - エンブレムが表す文字の初期値
     * @param {Object}  [opt]                   - その他のオプション
     * @param {number}  [opt.size=100]          - エンブレムの大きさ、単位はpx
     * @param {number}  [opt.displayTime=1500]  - アニメーション時、opt.durationの時間を含めて一文字が表示され続けている時間
     * @param {number}  [opt.duration=1000]     - アニメーション時、次の文字に変化するのに掛かる時間
     * @param {boolean} [opt.loop=false]        - animateFromString実行時、アニメーションをループさせるかどうか
     * @param {boolean} [opt.raondom=false]     - animateFromString実行時、与えられた文字列から次に変化する文字をランダムで選ぶ
     * @param {boolean} [opt.pedal=true]        - アニメーション時、次に変化する文字が同じ場合何もしない
     * @param {number}  [opt.easing='cubic-bezier(.26,.92,.41,.98)'] - 次の文字に変化するアニメーションのイージング、CSS3timing-function
     */
    constructor(c, opt) {
        if (typeof opt === 'object') {
            var { size, displayTime, duration, easing, roop, random, pedal } = opt;
        }
        /** @access private */
        this[CHAR_PROP]          =   null;
        /** @access private */
        this[DOM_PROP]           =   _createDom();
        /** @access private */
        this[DISPLAY_TIME_PROP]  =   displayTime    || 1500;
        /** @access private */
        this[DURATION_PROP]      =   duration       || 1000;
        /** @access private */
        this[EASING_PROP]        =   easing         || 'cubic-bezier(.26,.92,.41,.98)';
        /** @access private */
        this[IS_ANIMATING_PROP]  =   false;
        /** @access private */
        this[RESUME_PROP]        =   null;
        /** @access private */
        this[LOOP_PROP]          =   roop           || false;
        /** @access private */
        this[RANDOM_PROP]        =   random         || false;
        /** @access private */
        this[PEDAL_PROP]         =   pedal == null  ?  true    :  pedal;

        _updateTransitionConfig.call(this);
        if (typeof size === 'number' && size > 0) {
            this.size = size;
        } else {
            this.size = 100;
        }
        this.to(c);
    }

    /**
     * エンブレムを別の文字に変化させる
     * @param  {string}  c - 変化させる文字
     * @return {boolean}   - 与えられた文字に変化した場合はtrue、文字が不正もしくは変化しない場合falseを返す
     */
    to(c) {
        let _c = c && c.toLowerCase && c.toLowerCase();
        if (!formationTable[_c])    { return false; }
        if (this[CHAR_PROP] === _c) { return false; }
        _changeStyle.call(this, _c);
        this[CHAR_PROP] = _c;
        return true;
    }

    /**
     * 与えられた要素にエンブレムを追加する
     * @param {ParentNode} parent - エンブレムを追加する親要素
     */
    appendTo(parent) {
        parent.appendChild(this[DOM_PROP]);
    }

    /**
     * animateFromStringの実行を中断する
     */
    stopAnimate() {
        this[IS_ANIMATING_PROP] = false;
    }

    /**
     * stopAnimateで中断したアニメーションを再開する
     */
    resumeAnimate() {
        this[IS_ANIMATING_PROP] = true;
        this[RESUME_PROP]();
    }

    /**
     * 文字列に沿って
     */
    animateFromString(str, opt) {
        if (typeof opt === 'object') {
            var { displayTime, loop, random } = opt;
        }
        this[IS_ANIMATING_PROP] = true;
        this[RESUME_PROP]       = null;
        if (loop != null) {
            this[LOOP_PROP] = loop;
        }
        if (random != null) {
            this[RANDOM_PROP] = random;
        }
        if (typeof displayTime === 'number' && displayTime > 0) {
            this[DISPLAY_TIME_PROP] = displayTime;
        } else {
            displayTime = this[DISPLAY_TIME_PROP];
        }

        [].reduce.call(str, (p, c, idx) => {  // p = Promise.resolve(); c = str[idx];
            let isLast = idx === str.length - 1;
            return p.then(() => {
                return new Promise((resolve, reject) => {
                    if (!this[IS_ANIMATING_PROP]) {
                        this[RESUME_PROP] = resolve;
                        return;
                    }
                    if (this[RANDOM_PROP]) {
                        let _c = str[Math.random() * str.length | 0];
                        this.to(_c);
                    } else {
                        this.to(c);
                    }
                    if (isLast) {
                        if (this[LOOP_PROP]) {
                            setTimeout(() => {
                                this.animateFromString.call(this, str);
                                resolve();
                            }, this[DISPLAY_TIME_PROP]);
                            return;
                        } else {
                            setTimeout(reject, this[DISPLAY_TIME_PROP]);
                            return;
                        }
                    }
                    setTimeout(resolve, this[DISPLAY_TIME_PROP]);
                });
            });
        }, Promise.resolve()).catch(() => { this[IS_ANIMATING_PROP] = false; });
    }

    /*
     * seter and geter of propertys
     */

    // --- option object asignment ---
    set option(opt) {
        let { size, displayTime, duration, easing, loop, random, pedal } = opt;
        this.size               = size;    // use setter
        this[DISPLAY_TIME_PROP] = displayTime;
        // call _updateTransitionConfig after assign parms.
        this[DURATION_PROP]     = duration;
        this.easing             = easing;  // use setter
        // ---
        this[LOOP_PROP]         = loop;
        this[RANDOM_PROP]       = random;
        this[PEDAL_PROP]        = pedal;
    }
    get option() {
        return {
            size:        this.size,
            displaytime: this[DISPLAY_TIME_PROP],
            duration:    this[DURATION_PROP],
            easing:      this[EASING_PROP],
            loop:        this[LOOP_PROP],
            random:      this[RANDOM_PROP],
            pedal:       this[PEDAL_PROP],
        }
    }

    // --- dom ---
    get dom() { return this[DOM_PROP]; }

    // --- char ---
    get char() { return this[CHAR_PROP]; }

    // --- size ---
    set size(size) {
        let domStyle = this.dom.style;
        domStyle.width  = `${ size }px`;
        domStyle.height = `${ size }px`;
    }
    get size() { return +this[DOM_PROP].style.width.replace('px', ''); }

    // --- displayTime ---
    set displayTime(time) { this[DISPLAY_TIME_PROP] = time; }
    get displayTime()     { return this[DISPLAY_TIME_PROP]; }

    // --- duration ---
    set duration(time) {
        this[DURATION_PROP] = time;
        _updateTransitionConfig.call(this);
    }
    get duration() { return this[DURATION_PROP]; }

    // --- easing ---
    set easing(val) {
        this[EASING_PROP] = val;
        _updateTransitionConfig.call(this);
    }
    get easing() { return this[EASING_PROP]; }

    // --- isAnimating ---
    get isAnimating() { return this[IS_ANIMATING_PROP]; }

    // --- loop ---
    set loop(bool) { this[LOOP_PROP] = bool; }
    get loop()     { return this[LOOP_PROP]; }

    // --- random ---
    set random(bool) { this[RANDOM_PROP] = bool; }
    get random()     { return this[RANDOM_PROP]; }

    // --- pedal ---
    set pedal(bool) { this[PEDAL_PROP] = bool; }
    get pedal()     { return this[PEDAL_PROP]; }

    // --- allValidChars ---
    static get allValidChars() { return Object.keys(formationTable); }
}


function _createDom() {
    return BASE_DOM.cloneNode(true);
}

function _changeStyle(c) { // @bind this
    let oldC         = this[CHAR_PROP];
    let oldFormation = formationTable[oldC];
    let newFormation = formationTable[c];
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
    [].forEach.call(this[DOM_PROP].childNodes, (node, idx) => {
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
        node.classList.add(ROTATE_TABLE[Math.random() * 4 | 0]);
    });
}

function _updateTransitionConfig() { // @bind this
    let val = TRANSITION_PROPS.reduce((str, prop, idx) => {
        return `${ str }${ idx ? ',' : '' } ${ prop } ${ this[DURATION_PROP] }ms ${ this[EASING_PROP] }`;
    }, '');

    _updateStyle(this[DOM_PROP].childNodes);

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
const BASE_DOM = (() => {
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
let formationTable = {
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
