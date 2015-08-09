import Olympic2020 from './Olympic2020.js'

class EmblemGroup {

    constructor(chars) {
        let emblems = _transfromToOlympic2020Array(chars);

        if (emblems) {
            this.emblems = emblems;
        } else {
            throw new Error('EmblemGroup arguments expect string or array of Olympic2020.')
        }
    }

    map(str) {
        this.emblems.forEach((emblem, idx) => {
            let c = str[idx];
            if (!c) { c = ' '; }
            emblem.to(c);
        });
    }

}

function _transfromToOlympic2020Array(arg) { // (string | [Olympic2020]) => [Olympic2020] | false

    let res;
    switch (typeof arg) {
        case 'string':
            res = [].map.call(arg, c => new Olympic2020(c));
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

export default EmblemGroup
