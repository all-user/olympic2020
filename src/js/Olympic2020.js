class Olympic2020 {
  constructor(c) {
    this.char = null;
    this.dom  = createEmblemDom();
    this.formTo(c);
  }

  formTo(c) {
    var _c = c && c.toLowerCase && c.toLowerCase();
    if (formationTable[_c]) {
      this.char = _c;
      return true;
    }
    return false;
  }
}


function createEmblemDom() {


  return
}

// base of emblem dom.

var baseDom = (() => {
  var wrapper = document.createElement('div');
  var part    = document.createElement('div');
  var docFrag = document.creteDocumnetFragment();

  wrapper.className = 'olympic-emblem';
  part.className    = 'part';
  for (var i = 0; i < 9; i++) {
    var _part = part.cloneNode();
    _part.classList.add(`pos_${ i % 3 }_${ i / 3 | 0 }`);
    docFrag.appendChild(_part.cloneNode());
  }
})();

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
  "_": "_",
};

export default Olympic2020;

