const _CHAR_PROP         = Symbol();
const _DOM_PROP          = Symbol();
const _DISPLAY_TIME_PROP = Symbol();
const _DURATION_PROP     = Symbol();
const _EASING_PROP       = Symbol();
const _IS_ANIMATING_PROP = Symbol();
const _RESUME_PROP       = Symbol();
const _LOOP_PROP         = Symbol();
const _RAN_DOM_PROP      = Symbol();
const _PEDAL_PROP        = Symbol();

class Olympic2020 {
    constructor(c, opt) {
        if (typeof opt === 'object') {
            var { size, displayTime, duration, easing, roop, random, pedal } = opt;
        }

        this[_CHAR_PROP]          =   null;
        this[_DOM_PROP]           =   _createDom();
        this[_DISPLAY_TIME_PROP]  =   displayTime    || 1500;
        this[_DURATION_PROP]      =   duration       || 1000;
        this[_EASING_PROP]        =   easing         || 'cubic-bezier(.26,.92,.41,.98)';
        this[_IS_ANIMATING_PROP]  =   false;
        this[_RESUME_PROP]        =   null;
        this[_LOOP_PROP]          =   roop           || false;
        this[_RAN_DOM_PROP]       =   random         || false;
        this[_PEDAL_PROP]         =   pedal == null  ?  true    :  pedal;

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
        if (!_formationTable[_c])    { return false; }
        if (this[_CHAR_PROP] === _c) { return false; }
        _changeStyle.call(this, _c);
        this[_CHAR_PROP] = _c;
        return true;
    }

    /**
     * 与えられた要素にエンブレムを追加する
     * @param {ParentNode} parent - エンブレムを追加する親要素
     */
    appendTo(parent) {
        parent.appendChild(this[_DOM_PROP]);
    }

    /**
     * animateFromStringの実行を中断する
     */
    stopAnimate() {
        this[_IS_ANIMATING_PROP] = false;
    }

    /**
     * stopAnimateで中断したアニメーションを再開する
     */
    resumeAnimate() {
        this[_IS_ANIMATING_PROP] = true;
        this[_RESUME_PROP]();
    }

    /**
     * 与えられた文字列に沿って順に文字を変化せていく
     * @param {string} str - アニメーションの元になる文字列、この文字列の先頭から順にエンブレムを変化させていく
     */
    animateFromString(str, opt) {
        if (typeof opt === 'object') {
            var { displayTime, loop, random } = opt;
        }
        this[_IS_ANIMATING_PROP] = true;
        this[_RESUME_PROP]       = null;
        if (loop != null) {
            this[_LOOP_PROP] = loop;
        }
        if (random != null) {
            this[_RAN_DOM_PROP] = random;
        }
        if (typeof displayTime === 'number' && displayTime > 0) {
            this[_DISPLAY_TIME_PROP] = displayTime;
        } else {
            displayTime = this[_DISPLAY_TIME_PROP];
        }

        [].reduce.call(str, (p, c, idx) => {  // p = Promise.resolve(); c = str[idx];
            let isLast = idx === str.length - 1;
            return p.then(() => {
                return new Promise((resolve, reject) => {
                    if (!this[_IS_ANIMATING_PROP]) {
                        this[_RESUME_PROP] = resolve;
                        return;
                    }
                    if (this[_RAN_DOM_PROP]) {
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

    /*
     * seter and geter of propertys
     */

    // --- option object asignment ---

    /**
     * オプションをまとめて設定する
     * @example
     * let o = new Olympic2020();
     * o.option = { size: 200, displayTime: 1800 };
     * @type     {Object}                - オプションの設定をまとめたオブジェクト
     * @property {number}  [size]        - エンブレムの大きさ、単位はpx
     * @property {number}  [displayTime] - アニメーション時、opt.durationの時間を含めて一文字が表示され続けている時間
     * @property {number}  [duration]    - 次の文字に変化するアニメーションの時間
     * @property {boolean} [loop]        - animateFromString実行時、アニメーションをループさせるかどうか
     * @property {boolean} [random]      - animateFromString実行時、与えられた文字列から次に変化する文字をランダムで選ぶ
     * @property {boolean} [pedal]       - アニメーション時、次に変化する文字が同じ場合何もしない
     * @property {number}  [easing]      - 次の文字に変化するアニメーションのイージング、CSS3timing-function
     */
    set option({ size, displayTime, duration, loop, random, pedal, easing }) {
        this.size                = size;    // use setter
        this[_DISPLAY_TIME_PROP] = displayTime;
        // call _updateTransitionConfig after assign parms.
        this[_DURATION_PROP]     = duration;
        this.easing              = easing;  // use setter
        // ---
        this[_LOOP_PROP]         = loop;
        this[_RAN_DOM_PROP]      = random;
        this[_PEDAL_PROP]        = pedal;
    }
    /**
     * 現在のオプション設定を取得する
     * @type {Object}
     * @example
     * let o   = new Olympic2020({ size: 200, displayTime: 1200 })
     * let opt = o.option
     * // {
     * //     size       : 200,
     * //     displayTime: 1200,
     * //     duration   : 1000,
     * //     loop       : false,
     * //     random     : false,
     * //     pedal      : true,
     * //     easing     : 'cubic-bezier(.26,.92,.41,.98)'
     * // }
     */
    get option() {
        return {
            size:        this.size,
            displaytime: this[_DISPLAY_TIME_PROP],
            duration:    this[_DURATION_PROP],
            easing:      this[_EASING_PROP],
            loop:        this[_LOOP_PROP],
            random:      this[_RAN_DOM_PROP],
            pedal:       this[_PEDAL_PROP],
        }
    }


    // --- size ---

    /**
     * エンブレムの大きさを設定する、単位はpx
     * @type {number}
     */
    set size(size) {
        let domStyle = this.dom.style;
        domStyle.width  = `${ size }px`;
        domStyle.height = `${ size }px`;
    }
    /**
     * エンブレムの大きさ、単位はpx
     * @type {number}
     */
    get size() { return +this[_DOM_PROP].style.width.replace('px', ''); }


    // --- displayTime ---

    /**
     * アニメーション時、durationの時間を含めて一文字が表示され続けている時間を設定する、単位は1/1000秒
     * @type {number}
     */
    set displayTime(time) { this[_DISPLAY_TIME_PROP] = time; }

    /**
     * アニメーション時、durationの時間を含めて一文字が表示され続けている時間、単位は1/1000秒
     * @type {number}
     */
    get displayTime()     { return this[_DISPLAY_TIME_PROP]; }


    // --- duration ---

    /**
     * 次の文字に変化するアニメーションの時間を設定する、単位は1/1000秒
     * @type {number}
     */
    set duration(time) {
        this[_DURATION_PROP] = time;
        _updateTransitionConfig.call(this);
    }
    /**
     * 次の文字に変化するアニメーションの時間、単位は1/1000秒
     * @type {number}
     */
    get duration() { return this[_DURATION_PROP]; }


    // --- easing ---

    /**
     * 次の文字に変化するアニメーションの動き・イージングを設定する、CSS3timing-functionに準拠した文字列
     * @type {string}
     */
    set easing(val) {
        this[_EASING_PROP] = val;
        _updateTransitionConfig.call(this);
    }
    /**
     * 次の文字に変化するアニメーションの動き・イージング、CSS3timing-functionに準拠した文字列
     * @type {string}
     */
    get easing() { return this[_EASING_PROP]; }


    // --- loop ---

    /**
     * {@link Olympic2020#animateFromString}実行時、アニメーションをループさせるかどうかを設定する
     * @type {boolean}
     */
    set loop(bool) { this[_LOOP_PROP] = bool; }
    /**
     * {@link Olympic2020#animateFromString}実行時、アニメーションをループさせるかどうか
     * @type {boolean}
     */
    get loop()     { return this[_LOOP_PROP]; }


    // --- random ---

    /**
     * このオプションが有効の時{@link Olympic2020#animateFromString}を実行すると、与えられた文字列から次に変化する文字をランダムで選ぶ
     * @type {boolean}
     */
    set random(bool) { this[_RAN_DOM_PROP] = bool; }

    /**
     * このオプションが有効の時{@link Olympic2020#animateFromString}を実行すると、与えられた文字列から次に変化する文字をランダムで選ぶ
     * @type {boolean}
     */
    get random()     { return this[_RAN_DOM_PROP]; }


    // --- pedal ---

    /**
     * このオプションが有効の時、次にエンブレムに設定された文字が現在と同じなら何もしない
     * @type {boolean} bool
     */
    set pedal(bool) { this[_PEDAL_PROP] = bool; }

    /**
     * このオプションが有効の時、次にエンブレムに設定された文字が現在と同じなら何もしない
     * @type {boolean} bool
     */
    get pedal()     { return this[_PEDAL_PROP]; }


    // --- dom ---

    /**
     * エンブレムを構成するDOMエレメント
     * @type {HTMLDivElement}
     */
    get dom() { return this[_DOM_PROP]; }


    // --- char ---

    /**
     * 現在のエンブレムの文字、未定義の場合はnull
     * @type {string|null}
     */
    get char() { return this[_CHAR_PROP]; }


    // --- isAnimating ---

    /**
     * 現在animateFromStringが実行中かどうか
     * @type {boolean}
     */
    get isAnimating() { return this[_IS_ANIMATING_PROP]; }


    // --- allValidChars ---

    /**
     * 現在エンブレムが変更可能な全ての文字を取得する、変更可能な文字を格納した配列
     * @type {[string]}
     */
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
 *
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
 * parts className table.
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
 * formation settings of all characters.
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
 * transition settings.
 */
const _TRANSITION_PROPS = [
    'top',
    'left',
    'background-color',
    'border-radius',
];

export default Olympic2020;
