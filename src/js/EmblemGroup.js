import Olympic2020 from './Olympic2020.js'

class EmblemGroup {

    constructor(chars) {
        let emblems;
        switch (typeof chars) {
            case 'string':
                emblems = [].map.call(chars, c => new Olympic2020(c));
                break;
            case 'object':
                if (Array.isArray(chars) && chars.every(o => o instanceof Olympic2020)) {
                    emblems = chars;
                } else {
                    return false;
                };
                break;
            default:
                return false;
        }

        this.emblems = emblems;
    }

    map()

}

