import Olympic2020 from './Olympic2020.js'

class EmblemGroup {

    constructor(chars, opt) {
        if (typeof opt === 'object') {
            var { length, size, displayTime, duration } = opt;
        }
        this._isAnimating = false;
        this._resume      = null;
        this._displayTime = displayTime || 1000;
        this._duration    = duration || 800;

        if (typeof chars === 'string') {
            if (chars.length < length) {
                for (var i = chars.length; i < length; i++) {
                    chars += ' ';
                }
            } else if (length != null && chars.length > length) {
                chars = chars.slice(0, length);
            }
        }

        let emblems = _transfromToOlympic2020Array(chars, { size: size, duration: duration });

        if (emblems) {
            this.emblems = emblems;
        } else {
            throw new Error('EmblemGroup arguments expect string or array of Olympic2020.')
        }
    }

    toString() {
        return this.emblems.map(e => e.char).join('');
    }

    map(str) {
        this.emblems.forEach((emblem, idx) => {
            let c = str[idx];
            if (!c) { c = ' '; }
            emblem.to(c);
        });
    }

    appendTo(parent) {
        var frag = this.emblems.reduce((f, e) => {
            f.appendChild(e.dom);
            return f;
        }, document.createDocumentFragment());
        parent.appendChild(frag);
    }

    stopAnimate() {
        this._isAnimating = false;
    }

    resumeAnimate() {
        this._isAnimating = true;
        this._resume();
    }

    animateFromString(str, opt) {
        this._isAnimating = true;
        this._resume      = null;
        _asignOption.call(this, opt);

        let strArr;
        if (Array.isArray(str) && str.every(c => typeof c === 'string')) {
            strArr = str;
        } else {
            let len = this.emblems.length;
            strArr = [].reduce.call(str, (arr, s, idx) => {
                if (idx % len === 0) { arr.push(''); }
                arr[idx / len | 0] += s;
                return arr;
            }, []);
        }

        _animateFromStringArray.call(this, strArr);
    }

    animateFromStringArray(strArr, opt) {
        this._isAnimating = true;
        this._resume      = null;
        _asignOption.call(this, opt);
        _animateFromStringArray.call(this, strArr);
    }

    /*
     * seter and geter of propertys
     */
    set displayTime(time) { this._displayTime = time; }
    get displayTime()     { return this._displayTime; }

    get isAnimating() { return this._isAnimating; }
}

function _transfromToOlympic2020Array(arg, opt) { // (string | [Olympic2020]) => [Olympic2020] | false

    let res;
    switch (typeof arg) {
        case 'string':
            res = [].map.call(arg, c => new Olympic2020(c, opt));
            break;
        case 'object':
            if (Array.isArray(arg) && arg.every(o => o instanceof Olympic2020)) {
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

function _asignOption(opt) {
    if (typeof opt === 'object') {
        var { displayTime, loop } = opt;
    }
    if (loop != null) {
        this._loop = loop;
    }
    if (typeof displayTime === 'number' && displayTime > 0) {
        this._displayTime = displayTime;
    } else {
        displayTime = this._displayTime;
    }
}



function _animateFromStringArray(strArr) {
    strArr.reduce((p, s, idx) => {
        let isLast = idx === strArr.length - 1;
        return p.then(() => {
            return new Promise((resolve, reject) => {
                if (!this._isAnimating) {
                    this._resume = resolve;
                    return;
                }
                this.map(s);
                if (isLast) {
                    if (this._loop) {
                        setTimeout(() => {
                            _animateFromStringArray.call(this, strArr);
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


export default EmblemGroup
