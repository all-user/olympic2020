import Olympic2020 from './Olympic2020.js'

class EmblemGroup {

    constructor(chars, opt) {
        if (typeof opt === 'object') {
            var { length, size, displayTime } = opt;
        }
        this._isAnimating = false;
        this._resume      = null;
        this._displayTime = displayTime || 1000;
        if (chars.length < length) {
            for (var i = chars.length; i < length; i++) {
                chars += ' ';
            }
        } else if(length != null && chars.length > length) {
            chars = chars.slice(0, length);
        }

        let emblems = _transfromToOlympic2020Array(chars, size);

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

    animateFromString(str, time) {
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

        _animateFromStringArray.call(this, strArr, time);
    }

    animateFromStringArray(strArr, time) {
        _animateFromStringArray.call(this, strArr, time);
    }

    /*
     * seter and geter of propertys
     */
    set displayTime(time) { this._displayTime = time; }
    get displayTime()     { return this._displayTime; }

    get isAnimating() { return this._isAnimating; }
}

function _transfromToOlympic2020Array(arg, size) { // (string | [Olympic2020]) => [Olympic2020] | false

    let res;
    switch (typeof arg) {
        case 'string':
            res = [].map.call(arg, c => new Olympic2020(c, size));
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


function _animateFromStringArray(strArr, time) {
    this._isAnimating = true;
    this._resume      = null;
    if (typeof time === 'number') {
        this._displayTime = time;
    } else {
        time = this._displayTime;
    }

    console.log(this);

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
                    setTimout(reject, this._displayTime);
                    return;
                }
                setTimeout(resolve, this._displayTime);
            });
        });
    }, Promise.resolve()).catch(() => { this._isAnimating = false; });
}


export default EmblemGroup
