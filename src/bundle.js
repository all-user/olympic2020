(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":8}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":9}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":10}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":11}],5:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],6:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":1}],7:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],8:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":39}],9:[function(require,module,exports){
require('../../modules/es6.object.statics-accept-primitives');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":16,"../../modules/es6.object.statics-accept-primitives":62}],10:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$.core').Promise;
},{"../modules/$.core":16,"../modules/es6.object.to-string":63,"../modules/es6.promise":64,"../modules/es6.string.iterator":65,"../modules/web.dom.iterable":67}],11:[function(require,module,exports){
require('../../modules/es6.symbol');
module.exports = require('../../modules/$.core').Symbol;
},{"../../modules/$.core":16,"../../modules/es6.symbol":66}],12:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],13:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":31}],14:[function(require,module,exports){
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":15,"./$.wks":59}],15:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],16:[function(require,module,exports){
var core = module.exports = {};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],17:[function(require,module,exports){
// Optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(~length && that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  } return function(/* ...args */){
      return fn.apply(that, arguments);
    };
};
},{"./$.a-function":12}],18:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , PROTOTYPE = 'prototype';
function ctx(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
}
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
function $def(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {})[PROTOTYPE]
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    if(isGlobal && typeof target[key] != 'function')exp = source[key];
    // bind timers to global for call from export context
    else if(type & $def.B && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & $def.W && target[key] == out)!function(C){
      exp = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      exp[PROTOTYPE] = C[PROTOTYPE];
    }(out);
    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export
    exports[key] = exp;
    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
}
module.exports = $def;
},{"./$.core":16,"./$.global":25}],19:[function(require,module,exports){
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],20:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":25,"./$.is-object":31}],21:[function(require,module,exports){
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , isEnum     = $.isEnum
    , getSymbols = $.getSymbols;
  if(getSymbols)for(var symbols = getSymbols(it), i = 0, key; symbols.length > i; ){
    if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":39}],22:[function(require,module,exports){
// fallback for not array-like ES3 strings
var cof     = require('./$.cof')
  , $Object = Object;
module.exports = 0 in $Object('z') ? $Object : function(it){
  return cof(it) == 'String' ? it.split('') : $Object(it);
};
},{"./$.cof":15}],23:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":13,"./$.ctx":17,"./$.is-array-iter":30,"./$.iter-call":33,"./$.to-length":55,"./core.get-iterator-method":60}],24:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toString = {}.toString
  , toObject = require('./$.to-object')
  , getNames = require('./$').getNames;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

function getWindowNames(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
}

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toObject(it));
};
},{"./$":39,"./$.to-object":56}],25:[function(require,module,exports){
var global = typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
module.exports = global;
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],26:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],27:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.support-desc') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":39,"./$.property-desc":43,"./$.support-desc":51}],28:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":25}],29:[function(require,module,exports){
// Fast apply
// http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
  } return              fn.apply(that, args);
};
},{}],30:[function(require,module,exports){
var Iterators = require('./$.iterators')
  , ITERATOR  = require('./$.wks')('iterator');
module.exports = function(it){
  return ('Array' in Iterators ? Iterators.Array : Array.prototype[ITERATOR]) === it;
};
},{"./$.iterators":38,"./$.wks":59}],31:[function(require,module,exports){
// http://jsperf.com/core-js-isobject
module.exports = function(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
};
},{}],32:[function(require,module,exports){
// Safari has buggy iterators w/o `next`
module.exports = 'keys' in [] && !('next' in [].keys());
},{}],33:[function(require,module,exports){
var anObject = require('./$.an-object');
function close(iterator){
  var ret = iterator['return'];
  if(ret !== undefined)anObject(ret.call(iterator));
}
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch(e){
    close(iterator);
    throw e;
  }
};
},{"./$.an-object":13}],34:[function(require,module,exports){
'use strict';
var $ = require('./$')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: require('./$.property-desc')(1,next)});
  require('./$.tag')(Constructor, NAME + ' Iterator');
};
},{"./$":39,"./$.hide":27,"./$.property-desc":43,"./$.tag":52,"./$.wks":59}],35:[function(require,module,exports){
'use strict';
var LIBRARY         = require('./$.library')
  , $def            = require('./$.def')
  , $redef          = require('./$.redef')
  , hide            = require('./$.hide')
  , has             = require('./$.has')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , Iterators       = require('./$.iterators')
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values';
function returnThis(){ return this; }
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  require('./$.iter-create')(Constructor, NAME, next);
  function createMethod(kind){
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  }
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || createMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = require('./$').getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    require('./$.tag')(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
  }
  // Define iterator
  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      keys:    IS_SET            ? _default : createMethod(KEYS),
      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$redef(proto, key, methods[key]);
    } else $def($def.P + $def.F * require('./$.iter-buggy'), NAME, methods);
  }
};
},{"./$":39,"./$.def":18,"./$.has":26,"./$.hide":27,"./$.iter-buggy":32,"./$.iter-create":34,"./$.iterators":38,"./$.library":41,"./$.redef":44,"./$.tag":52,"./$.wks":59}],36:[function(require,module,exports){
var SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , SAFE_CLOSING    = false;
try {
  var riter = [7][SYMBOL_ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }
module.exports = function(exec){
  if(!SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[SYMBOL_ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[SYMBOL_ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":59}],37:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],38:[function(require,module,exports){
module.exports = {};
},{}],39:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],40:[function(require,module,exports){
var $        = require('./$')
  , toObject = require('./$.to-object');
module.exports = function(object, el){
  var O      = toObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":39,"./$.to-object":56}],41:[function(require,module,exports){
module.exports = true;
},{}],42:[function(require,module,exports){
var $redef = require('./$.redef');
module.exports = function(target, src){
  for(var key in src)$redef(target, key, src[key]);
  return target;
};
},{"./$.redef":44}],43:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],44:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":27}],45:[function(require,module,exports){
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],46:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
function check(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
}
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
    ? function(buggy, set){
        try {
          set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
          set({}, []);
        } catch(e){ buggy = true; }
        return function setPrototypeOf(O, proto){
          check(O, proto);
          if(buggy)O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }()
    : undefined),
  check: check
};
},{"./$":39,"./$.an-object":13,"./$.ctx":17,"./$.is-object":31}],47:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":25}],48:[function(require,module,exports){
var $       = require('./$')
  , SPECIES = require('./$.wks')('species');
module.exports = function(C){
  if(require('./$.support-desc') && !(SPECIES in C))$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":39,"./$.support-desc":51,"./$.wks":59}],49:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],50:[function(require,module,exports){
// true  -> String#at
// false -> String#codePointAt
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l
      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":19,"./$.to-integer":54}],51:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !!function(){
  try {
    return Object.defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
},{}],52:[function(require,module,exports){
var has  = require('./$.has')
  , hide = require('./$.hide')
  , TAG  = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
};
},{"./$.has":26,"./$.hide":27,"./$.wks":59}],53:[function(require,module,exports){
'use strict';
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
function run(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
}
function listner(event){
  run.call(event.data);
}
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Modern browsers, skip implementation for WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id, '*');
    };
    global.addEventListener('message', listner, false);
  // WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$.cof":15,"./$.ctx":17,"./$.dom-create":20,"./$.global":25,"./$.html":28,"./$.invoke":29}],54:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],55:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":54}],56:[function(require,module,exports){
var ES5Object = require('./$.es5-object')
  , defined   = require('./$.defined');
module.exports = function(it, realString){
  return (realString ? Object : ES5Object)(defined(it));
};
},{"./$.defined":19,"./$.es5-object":22}],57:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],58:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],59:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || require('./$.uid'))('Symbol.' + name));
};
},{"./$.global":25,"./$.shared":47,"./$.uid":57}],60:[function(require,module,exports){
var global    = require('./$.global')
  , classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  var Symbol = global.Symbol;
  if(it != undefined){
    return it[Symbol && Symbol.iterator || '@@iterator']
      || it[ITERATOR]
      || Iterators[classof(it)];
  }
};
},{"./$.classof":14,"./$.core":16,"./$.global":25,"./$.iterators":38,"./$.wks":59}],61:[function(require,module,exports){
var setUnscope = require('./$.unscope')
  , step       = require('./$.iter-step')
  , Iterators  = require('./$.iterators')
  , toObject   = require('./$.to-object');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toObject(iterated); // target
  this._i = 0;                  // next index
  this._k = kind;               // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

setUnscope('keys');
setUnscope('values');
setUnscope('entries');
},{"./$.iter-define":35,"./$.iter-step":37,"./$.iterators":38,"./$.to-object":56,"./$.unscope":58}],62:[function(require,module,exports){
var $        = require('./$')
  , core     = require('./$.core')
  , $def     = require('./$.def')
  , toObject = require('./$.to-object')
  , isObject = require('./$.is-object');
$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
, function(KEY, ID){
  var fn     = (core.Object || {})[KEY] || Object[KEY]
    , forced = 0
    , method = {};
  method[KEY] = ID == 0 ? function freeze(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 1 ? function seal(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 2 ? function preventExtensions(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 3 ? function isFrozen(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 4 ? function isSealed(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 5 ? function isExtensible(it){
    return isObject(it) ? fn(it) : false;
  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
    return fn(toObject(it), key);
  } : ID == 7 ? function getPrototypeOf(it){
    return fn(toObject(it, true));
  } : ID == 8 ? function keys(it){
    return fn(toObject(it));
  } : require('./$.get-names').get;
  try {
    fn('z');
  } catch(e){
    forced = 1;
  }
  $def($def.S + $def.F * forced, 'Object', method);
});
},{"./$":39,"./$.core":16,"./$.def":18,"./$.get-names":24,"./$.is-object":31,"./$.to-object":56}],63:[function(require,module,exports){

},{}],64:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $def       = require('./$.def')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same')
  , species    = require('./$.species')
  , SPECIES    = require('./$.wks')('species')
  , RECORD     = require('./$.uid')('record')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , asap       = process && process.nextTick || require('./$.task').set
  , P          = global[PROMISE]
  , Wrapper;

function testResolve(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
}

var useNative = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && require('./$.support-desc')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
function isPromise(it){
  return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
}
function sameConstructor(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
}
function getConstructor(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
}
function isThenable(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
}
function notify(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  // strange IE + webpack dev server bug - use .call(global)
  asap.call(global, function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    function run(react){
      var cb = ok ? react.ok : react.fail
        , ret, then;
      try {
        if(cb){
          if(!ok)record.h = true;
          ret = cb === true ? value : cb(value);
          if(ret === react.P){
            react.rej(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(ret)){
            then.call(ret, react.res, react.rej);
          } else react.res(ret);
        } else react.rej(value);
      } catch(err){
        react.rej(err);
      }
    }
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      // strange IE + webpack dev server bug - use .call(global)
      asap.call(global, function(){
        if(isUnhandled(record.p)){
          if(isNode){
            process.emit('unhandledRejection', value, record.p);
          } else if(global.console && console.error){
            console.error('Unhandled promise rejection', value);
          }
        }
        record.a = undefined;
      });
    }, 1);
  });
}
function isUnhandled(promise){
  var record = promise[RECORD]
    , chain  = record.a || record.c
    , i      = 0
    , react;
  if(record.h)return false;
  while(chain.length > i){
    react = chain[i++];
    if(react.fail || !isUnhandled(react.P))return false;
  } return true;
}
function $reject(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
}
function $resolve(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(then = isThenable(value)){
      // strange IE + webpack dev server bug - use .call(global)
      asap.call(global, function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
}

// constructor polyfill
if(!useNative){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    this[RECORD] = record;
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.mix')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var S = anObject(anObject(this).constructor)[SPECIES];
      var react = {
        ok:   typeof onFulfilled == 'function' ? onFulfilled : true,
        fail: typeof onRejected == 'function'  ? onRejected  : false
      };
      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
        react.res = aFunction(res);
        react.rej = aFunction(rej);
      });
      var record = this[RECORD];
      record.c.push(react);
      if(record.a)record.a.push(react);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

// export
$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
require('./$.tag')(P, PROMISE);
species(P);
species(Wrapper = require('./$.core')[PROMISE]);

// statics
$def($def.S + $def.F * !useNative, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    return new this(function(res, rej){ rej(r); });
  }
});
$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    return isPromise(x) && sameConstructor(x.constructor, this)
      ? x : new this(function(res){ res(x); });
  }
});
$def($def.S + $def.F * !(useNative && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C      = getConstructor(this)
      , values = [];
    return new C(function(res, rej){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        C.resolve(promise).then(function(value){
          results[index] = value;
          --remaining || res(results);
        }, rej);
      });
      else res(results);
    });
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C = getConstructor(this);
    return new C(function(res, rej){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(res, rej);
      });
    });
  }
});
},{"./$":39,"./$.a-function":12,"./$.an-object":13,"./$.classof":14,"./$.core":16,"./$.ctx":17,"./$.def":18,"./$.for-of":23,"./$.global":25,"./$.is-object":31,"./$.iter-detect":36,"./$.library":41,"./$.mix":42,"./$.same":45,"./$.set-proto":46,"./$.species":48,"./$.strict-new":49,"./$.support-desc":51,"./$.tag":52,"./$.task":53,"./$.uid":57,"./$.wks":59}],65:[function(require,module,exports){
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":35,"./$.string-at":50}],66:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , SUPPORT_DESC   = require('./$.support-desc')
  , $def           = require('./$.def')
  , $redef         = require('./$.redef')
  , shared         = require('./$.shared')
  , setTag         = require('./$.tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , anObject       = require('./$.an-object')
  , toObject       = require('./$.to-object')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , $create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

var setSymbolDesc = SUPPORT_DESC ? function(){ // fallback for old Android
  try {
    return $create(setDesc({}, HIDDEN, {
      get: function(){
        return setDesc(this, HIDDEN, {value: false})[HIDDEN];
      }
    }))[HIDDEN] || setDesc;
  } catch(e){
    return function(it, key, D){
      var protoDesc = getDesc(ObjectProto, key);
      if(protoDesc)delete ObjectProto[key];
      setDesc(it, key, D);
      if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
    };
  }
}() : setDesc;

function wrap(tag){
  var sym = AllSymbols[tag] = $create($Symbol.prototype);
  sym._k = tag;
  SUPPORT_DESC && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
}

function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = $create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
}
function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)defineProperty(it, key = keys[i++], P[key]);
  return it;
}
function create(it, P){
  return P === undefined ? $create(it) : defineProperties($create(it), P);
}
function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
}
function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
}
function getOwnPropertyNames(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
}
function getOwnPropertySymbols(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
}

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments[0]));
  };
  $redef($Symbol.prototype, 'toString', function(){
    return this._k;
  });

  $.create     = create;
  $.isEnum     = propertyIsEnumerable;
  $.getDesc    = getOwnPropertyDescriptor;
  $.setDesc    = defineProperty;
  $.setDescs   = defineProperties;
  $.getNames   = $names.get = getOwnPropertyNames;
  $.getSymbols = getOwnPropertySymbols;

  if(SUPPORT_DESC && !require('./$.library')){
    $redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
  }
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
    'species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), function(it){
    var sym = wks(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  }
);

setter = true;

$def($def.G + $def.W, {Symbol: $Symbol});

$def($def.S, 'Symbol', symbolStatics);

$def($def.S + $def.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: getOwnPropertySymbols
});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setTag(global.JSON, 'JSON', true);
},{"./$":39,"./$.an-object":13,"./$.def":18,"./$.enum-keys":21,"./$.get-names":24,"./$.global":25,"./$.has":26,"./$.keyof":40,"./$.library":41,"./$.property-desc":43,"./$.redef":44,"./$.shared":47,"./$.support-desc":51,"./$.tag":52,"./$.to-object":56,"./$.uid":57,"./$.wks":59}],67:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":38,"./es6.array.iterator":61}],68:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Olympic2020Js = require('./Olympic2020.js');

var _Olympic2020Js2 = _interopRequireDefault(_Olympic2020Js);

var EmblemGroup = (function () {
    function EmblemGroup(chars, opt) {
        _classCallCheck(this, EmblemGroup);

        if (typeof opt === 'object') {
            var length = opt.length;
            var size = opt.size;
            var displayTime = opt.displayTime;
            var duration = opt.duration;
        }
        this._isAnimating = false;
        this._resume = null;
        this._displayTime = displayTime || 1000;
        this._duration = duration || 800;

        if (typeof chars === 'string') {
            if (chars.length < length) {
                for (var i = chars.length; i < length; i++) {
                    chars += ' ';
                }
            } else if (length != null && chars.length > length) {
                chars = chars.slice(0, length);
            }
        }

        var emblems = _transfromToOlympic2020Array(chars, { size: size, duration: duration });

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
                return f;
            }, document.createDocumentFragment());
            parent.appendChild(frag);
        }
    }, {
        key: 'stopAnimate',
        value: function stopAnimate() {
            this._isAnimating = false;
        }
    }, {
        key: 'resumeAnimate',
        value: function resumeAnimate() {
            this._isAnimating = true;
            this._resume();
        }
    }, {
        key: 'animateFromString',
        value: function animateFromString(str, opt) {
            var _this = this;

            this._isAnimating = true;
            this._resume = null;
            _asignOption.call(this, opt);

            var strArr = undefined;
            if (Array.isArray(str) && str.every(function (c) {
                return typeof c === 'string';
            })) {
                strArr = str;
            } else {
                (function () {
                    var len = _this.emblems.length;
                    strArr = [].reduce.call(str, function (arr, s, idx) {
                        if (idx % len === 0) {
                            arr.push('');
                        }
                        arr[idx / len | 0] += s;
                        return arr;
                    }, []);
                })();
            }

            _animateFromStringArray.call(this, strArr);
        }
    }, {
        key: 'animateFromStringArray',
        value: function animateFromStringArray(strArr, opt) {
            this._isAnimating = true;
            this._resume = null;
            _asignOption.call(this, opt);
            _animateFromStringArray.call(this, strArr);
        }

        /*
         * seter and geter of propertys
         */
    }, {
        key: 'displayTime',
        set: function set(time) {
            this._displayTime = time;
        },
        get: function get() {
            return this._displayTime;
        }
    }, {
        key: 'isAnimating',
        get: function get() {
            return this._isAnimating;
        }
    }]);

    return EmblemGroup;
})();

function _transfromToOlympic2020Array(arg, opt) {
    // (string | [Olympic2020]) => [Olympic2020] | false

    var res = undefined;
    switch (typeof arg) {
        case 'string':
            res = [].map.call(arg, function (c) {
                return new _Olympic2020Js2['default'](c, opt);
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

function _asignOption(opt) {
    if (typeof opt === 'object') {
        var displayTime = opt.displayTime;
        var loop = opt.loop;
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
    var _this2 = this;

    strArr.reduce(function (p, s, idx) {
        var isLast = idx === strArr.length - 1;
        return p.then(function () {
            return new _Promise(function (resolve, reject) {
                if (!_this2._isAnimating) {
                    _this2._resume = resolve;
                    return;
                }
                _this2.map(s);
                if (isLast) {
                    if (_this2._loop) {
                        setTimeout(function () {
                            _animateFromStringArray.call(_this2, strArr);
                            resolve();
                        }, _this2._displayTime);
                        return;
                    } else {
                        setTimeout(reject, _this2._displayTime);
                        return;
                    }
                }
                setTimeout(resolve, _this2._displayTime);
            });
        });
    }, _Promise.resolve())['catch'](function () {
        _this2._isAnimating = false;
    });
}

exports['default'] = EmblemGroup;
module.exports = exports['default'];

},{"./Olympic2020.js":69,"babel-runtime/core-js/promise":3,"babel-runtime/helpers/class-call-check":5,"babel-runtime/helpers/create-class":6,"babel-runtime/helpers/interop-require-default":7}],69:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Symbol = require('babel-runtime/core-js/symbol')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
var CHAR_PROP = _Symbol();
var DOM_PROP = _Symbol();
var DISPLAY_TIME_PROP = _Symbol();
var DURATION_PROP = _Symbol();
var EASING_PROP = _Symbol();
var IS_ANIMATING_PROP = _Symbol();
var RESUME_PROP = _Symbol();
var LOOP_PROP = _Symbol();
var RANDOM_PROP = _Symbol();
var PEDAL_PROP = _Symbol();

var Olympic2020 = (function () {
    function Olympic2020(c, opt) {
        _classCallCheck(this, Olympic2020);

        if (typeof opt === 'object') {
            var size = opt.size;
            var displayTime = opt.displayTime;
            var duration = opt.duration;
            var easing = opt.easing;
            var roop = opt.roop;
            var random = opt.random;
            var pedal = opt.pedal;
        }
        this[CHAR_PROP] = null;
        this[DOM_PROP] = _createDom();
        this[DISPLAY_TIME_PROP] = displayTime || 1500;
        this[DURATION_PROP] = duration || 1000;
        this[EASING_PROP] = easing || 'cubic-bezier(.26,.92,.41,.98)';
        this[IS_ANIMATING_PROP] = false;
        this[RESUME_PROP] = null;
        this[LOOP_PROP] = roop || false;
        this[RANDOM_PROP] = random || false;
        this[PEDAL_PROP] = pedal == null ? true : pedal;

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
            if (!formationTable[_c]) {
                return false;
            }
            if (this[CHAR_PROP] === _c) {
                return false;
            }
            _changeStyle.call(this, _c);
            this[CHAR_PROP] = _c;
            return true;
        }
    }, {
        key: 'appendTo',
        value: function appendTo(parent) {
            parent.appendChild(this[DOM_PROP]);
        }
    }, {
        key: 'stopAnimate',
        value: function stopAnimate() {
            this[IS_ANIMATING_PROP] = false;
        }
    }, {
        key: 'resumeAnimate',
        value: function resumeAnimate() {
            this[IS_ANIMATING_PROP] = true;
            this[RESUME_PROP]();
        }
    }, {
        key: 'animateFromString',
        value: function animateFromString(str, opt) {
            var _this = this;

            if (typeof opt === 'object') {
                var displayTime = opt.displayTime;
                var loop = opt.loop;
                var random = opt.random;
            }
            this[IS_ANIMATING_PROP] = true;
            this[RESUME_PROP] = null;
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

            [].reduce.call(str, function (p, c, idx) {
                // p = Promise.resolve(); c = str[idx];
                var isLast = idx === str.length - 1;
                return p.then(function () {
                    return new _Promise(function (resolve, reject) {
                        if (!_this[IS_ANIMATING_PROP]) {
                            _this[RESUME_PROP] = resolve;
                            return;
                        }
                        if (_this[RANDOM_PROP]) {
                            var _c = str[Math.random() * str.length | 0];
                            _this.to(_c);
                        } else {
                            _this.to(c);
                        }
                        if (isLast) {
                            if (_this[LOOP_PROP]) {
                                setTimeout(function () {
                                    _this.animateFromString.call(_this, str);
                                    resolve();
                                }, _this[DISPLAY_TIME_PROP]);
                                return;
                            } else {
                                setTimeout(reject, _this[DISPLAY_TIME_PROP]);
                                return;
                            }
                        }
                        setTimeout(resolve, _this[DISPLAY_TIME_PROP]);
                    });
                });
            }, _Promise.resolve())['catch'](function () {
                _this[IS_ANIMATING_PROP] = false;
            });
        }

        /*
         * seter and geter of propertys
         */

        // --- option object asignment ---
    }, {
        key: 'option',
        set: function set(opt) {
            var size = opt.size;
            var displayTime = opt.displayTime;
            var duration = opt.duration;
            var easing = opt.easing;
            var loop = opt.loop;
            var random = opt.random;
            var pedal = opt.pedal;

            this.size = size; // use setter
            this[DISPLAY_TIME_PROP] = displayTime;
            // call _updateTransitionConfig after assign parms.
            this[DURATION_PROP] = duration;
            this.easing = easing; // use setter
            // ---
            this[LOOP_PROP] = loop;
            this[RANDOM_PROP] = random;
            this[PEDAL_PROP] = pedal;
        },
        get: function get() {
            return {
                size: this.size,
                displaytime: this[DISPLAY_TIME_PROP],
                duration: this[DURATION_PROP],
                easing: this[EASING_PROP],
                loop: this[LOOP_PROP],
                random: this[RANDOM_PROP],
                pedal: this[PEDAL_PROP]
            };
        }

        // --- dom ---
    }, {
        key: 'dom',
        get: function get() {
            return this[DOM_PROP];
        }

        // --- char ---
    }, {
        key: 'char',
        get: function get() {
            return this[CHAR_PROP];
        }

        // --- size ---
    }, {
        key: 'size',
        set: function set(size) {
            var domStyle = this.dom.style;
            domStyle.width = size + 'px';
            domStyle.height = size + 'px';
        },
        get: function get() {
            return +this[DOM_PROP].style.width.replace('px', '');
        }

        // --- displayTime ---
    }, {
        key: 'displayTime',
        set: function set(time) {
            this[DISPLAY_TIME_PROP] = time;
        },
        get: function get() {
            return this[DISPLAY_TIME_PROP];
        }

        // --- duration ---
    }, {
        key: 'duration',
        set: function set(time) {
            this[DURATION_PROP] = time;
            _updateTransitionConfig.call(this);
        },
        get: function get() {
            return this[DURATION_PROP];
        }

        // --- easing ---
    }, {
        key: 'easing',
        set: function set(val) {
            this[EASING_PROP] = val;
            _updateTransitionConfig.call(this);
        },
        get: function get() {
            return this[EASING_PROP];
        }

        // --- isAnimating ---
    }, {
        key: 'isAnimating',
        get: function get() {
            return this[IS_ANIMATING_PROP];
        }

        // --- loop ---
    }, {
        key: 'loop',
        set: function set(bool) {
            this[LOOP_PROP] = bool;
        },
        get: function get() {
            return this[LOOP_PROP];
        }

        // --- random ---
    }, {
        key: 'random',
        set: function set(bool) {
            this[RANDOM_PROP] = bool;
        },
        get: function get() {
            return this[RANDOM_PROP];
        }

        // --- pedal ---
    }, {
        key: 'pedal',
        set: function set(bool) {
            this[PEDAL_PROP] = bool;
        },
        get: function get() {
            return this[PEDAL_PROP];
        }

        // --- allValidChars ---
    }], [{
        key: 'allValidChars',
        get: function get() {
            return _Object$keys(formationTable);
        }
    }]);

    return Olympic2020;
})();

function _createDom() {
    return BASE_DOM.cloneNode(true);
}

function _changeStyle(c) {
    // @bind this
    var oldC = this[CHAR_PROP];
    var oldFormation = formationTable[oldC];
    var newFormation = formationTable[c];
    if (!newFormation) {
        return;
    }
    var diffFormation = undefined;
    if (oldC) {
        diffFormation = newFormation.map(function (newStr, idx) {
            var oldStr = oldFormation[idx];
            return newStr !== oldStr ? newStr : false;
        });
    } else {
        diffFormation = newFormation;
    }
    [].forEach.call(this[DOM_PROP].childNodes, function (node, idx) {
        if (!diffFormation[idx]) {
            return;
        }
        var pos = undefined;
        // fix for '/'
        if (c === '/' && idx === 0) {
            pos = 'pos_3_0';
        } else {
            pos = 'pos_' + idx % 3 + '_' + (idx / 3 | 0);
        }
        node.className = diffFormation[idx] + ' ' + pos;
        if (node.classList.contains('arc')) {
            return;
        }
        node.classList.add(ROTATE_TABLE[Math.random() * 4 | 0]);
    });
}

function _updateTransitionConfig() {
    var _this2 = this;

    // @bind this
    var val = TRANSITION_PROPS.reduce(function (str, prop, idx) {
        return '' + str + (idx ? ',' : '') + ' ' + prop + ' ' + _this2[DURATION_PROP] + 'ms ' + _this2[EASING_PROP];
    }, '');

    _updateStyle(this[DOM_PROP].childNodes);

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
 * original of emblem dom.
 */
var BASE_DOM = (function () {
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

    // in emmet syntax.
    // div.wrapper > div.part * 9
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
var formationTable = {
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

},{"babel-runtime/core-js/object/keys":2,"babel-runtime/core-js/promise":3,"babel-runtime/core-js/symbol":4,"babel-runtime/helpers/class-call-check":5,"babel-runtime/helpers/create-class":6}],70:[function(require,module,exports){
// require('es6-promise').polyfill();
// require('babelify/polyfill');

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _Olympic2020Js = require('./Olympic2020.js');

var _Olympic2020Js2 = _interopRequireDefault(_Olympic2020Js);

var _EmblemGroupJs = require('./EmblemGroup.js');

var _EmblemGroupJs2 = _interopRequireDefault(_EmblemGroupJs);

window.Olympic2020 = _Olympic2020Js2['default'];
window.EmblemGroup = _EmblemGroupJs2['default'];

},{"./EmblemGroup.js":68,"./Olympic2020.js":69,"babel-runtime/helpers/interop-require-default":7}]},{},[70])
//# sourceMappingURL=bundle.js.map
