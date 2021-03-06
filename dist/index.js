(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Color = {})));
}(this, (function (exports) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var crypt = createCommonjsModule(function (module) {
  (function () {
    var base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        crypt = {
      // Bit-wise rotation left
      rotl: function rotl(n, b) {
        return n << b | n >>> 32 - b;
      },

      // Bit-wise rotation right
      rotr: function rotr(n, b) {
        return n << 32 - b | n >>> b;
      },

      // Swap big-endian to little-endian and vice versa
      endian: function endian(n) {
        // If number given, swap endian
        if (n.constructor == Number) {
          return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
        }

        // Else, assume array and swap all items
        for (var i = 0; i < n.length; i++) {
          n[i] = crypt.endian(n[i]);
        }return n;
      },

      // Generate an array of any length of random bytes
      randomBytes: function randomBytes(n) {
        for (var bytes = []; n > 0; n--) {
          bytes.push(Math.floor(Math.random() * 256));
        }return bytes;
      },

      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function bytesToWords(bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) {
          words[b >>> 5] |= bytes[i] << 24 - b % 32;
        }return words;
      },

      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function wordsToBytes(words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8) {
          bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
        }return bytes;
      },

      // Convert a byte array to a hex string
      bytesToHex: function bytesToHex(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join('');
      },

      // Convert a hex string to a byte array
      hexToBytes: function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2) {
          bytes.push(parseInt(hex.substr(c, 2), 16));
        }return bytes;
      },

      // Convert a byte array to a base-64 string
      bytesToBase64: function bytesToBase64(bytes) {
        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
          for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F));else base64.push('=');
          }
        }
        return base64.join('');
      },

      // Convert a base-64 string to a byte array
      base64ToBytes: function base64ToBytes(base64) {
        // Remove non-base-64 characters
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

        for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
          if (imod4 == 0) continue;
          bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
        }
        return bytes;
      }
    };

    module.exports = crypt;
  })();
});

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function stringToBytes(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function bytesToString(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function stringToBytes(str) {
      for (var bytes = [], i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i) & 0xFF);
      }return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function bytesToString(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++) {
        str.push(String.fromCharCode(bytes[i]));
      }return str.join('');
    }
  }
};

var charenc_1 = charenc;

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var index = function index(obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

var md5 = createCommonjsModule(function (module) {
  (function () {
    var crypt$$1 = crypt,
        utf8 = charenc_1.utf8,
        isBuffer = index,
        bin = charenc_1.bin,


    // The core
    md5 = function md5(message, options) {
      // Convert to byte array
      if (message.constructor == String) {
        if (options && options.encoding === 'binary') message = bin.stringToBytes(message);else message = utf8.stringToBytes(message);
      } else if (isBuffer(message)) message = Array.prototype.slice.call(message, 0);else if (!Array.isArray(message)) message = message.toString();
      // else, assume byte array already

      var m = crypt$$1.bytesToWords(message),
          l = message.length * 8,
          a = 1732584193,
          b = -271733879,
          c = -1732584194,
          d = 271733878;

      // Swap endian
      for (var i = 0; i < m.length; i++) {
        m[i] = (m[i] << 8 | m[i] >>> 24) & 0x00FF00FF | (m[i] << 24 | m[i] >>> 8) & 0xFF00FF00;
      }

      // Padding
      m[l >>> 5] |= 0x80 << l % 32;
      m[(l + 64 >>> 9 << 4) + 14] = l;

      // Method shortcuts
      var FF = md5._ff,
          GG = md5._gg,
          HH = md5._hh,
          II = md5._ii;

      for (var i = 0; i < m.length; i += 16) {

        var aa = a,
            bb = b,
            cc = c,
            dd = d;

        a = FF(a, b, c, d, m[i + 0], 7, -680876936);
        d = FF(d, a, b, c, m[i + 1], 12, -389564586);
        c = FF(c, d, a, b, m[i + 2], 17, 606105819);
        b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
        a = FF(a, b, c, d, m[i + 4], 7, -176418897);
        d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
        c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
        b = FF(b, c, d, a, m[i + 7], 22, -45705983);
        a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
        d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
        c = FF(c, d, a, b, m[i + 10], 17, -42063);
        b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
        a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
        d = FF(d, a, b, c, m[i + 13], 12, -40341101);
        c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
        b = FF(b, c, d, a, m[i + 15], 22, 1236535329);

        a = GG(a, b, c, d, m[i + 1], 5, -165796510);
        d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
        c = GG(c, d, a, b, m[i + 11], 14, 643717713);
        b = GG(b, c, d, a, m[i + 0], 20, -373897302);
        a = GG(a, b, c, d, m[i + 5], 5, -701558691);
        d = GG(d, a, b, c, m[i + 10], 9, 38016083);
        c = GG(c, d, a, b, m[i + 15], 14, -660478335);
        b = GG(b, c, d, a, m[i + 4], 20, -405537848);
        a = GG(a, b, c, d, m[i + 9], 5, 568446438);
        d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
        c = GG(c, d, a, b, m[i + 3], 14, -187363961);
        b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
        a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
        d = GG(d, a, b, c, m[i + 2], 9, -51403784);
        c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
        b = GG(b, c, d, a, m[i + 12], 20, -1926607734);

        a = HH(a, b, c, d, m[i + 5], 4, -378558);
        d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
        c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
        b = HH(b, c, d, a, m[i + 14], 23, -35309556);
        a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
        d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
        c = HH(c, d, a, b, m[i + 7], 16, -155497632);
        b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
        a = HH(a, b, c, d, m[i + 13], 4, 681279174);
        d = HH(d, a, b, c, m[i + 0], 11, -358537222);
        c = HH(c, d, a, b, m[i + 3], 16, -722521979);
        b = HH(b, c, d, a, m[i + 6], 23, 76029189);
        a = HH(a, b, c, d, m[i + 9], 4, -640364487);
        d = HH(d, a, b, c, m[i + 12], 11, -421815835);
        c = HH(c, d, a, b, m[i + 15], 16, 530742520);
        b = HH(b, c, d, a, m[i + 2], 23, -995338651);

        a = II(a, b, c, d, m[i + 0], 6, -198630844);
        d = II(d, a, b, c, m[i + 7], 10, 1126891415);
        c = II(c, d, a, b, m[i + 14], 15, -1416354905);
        b = II(b, c, d, a, m[i + 5], 21, -57434055);
        a = II(a, b, c, d, m[i + 12], 6, 1700485571);
        d = II(d, a, b, c, m[i + 3], 10, -1894986606);
        c = II(c, d, a, b, m[i + 10], 15, -1051523);
        b = II(b, c, d, a, m[i + 1], 21, -2054922799);
        a = II(a, b, c, d, m[i + 8], 6, 1873313359);
        d = II(d, a, b, c, m[i + 15], 10, -30611744);
        c = II(c, d, a, b, m[i + 6], 15, -1560198380);
        b = II(b, c, d, a, m[i + 13], 21, 1309151649);
        a = II(a, b, c, d, m[i + 4], 6, -145523070);
        d = II(d, a, b, c, m[i + 11], 10, -1120210379);
        c = II(c, d, a, b, m[i + 2], 15, 718787259);
        b = II(b, c, d, a, m[i + 9], 21, -343485551);

        a = a + aa >>> 0;
        b = b + bb >>> 0;
        c = c + cc >>> 0;
        d = d + dd >>> 0;
      }

      return crypt$$1.endian([a, b, c, d]);
    };

    // Auxiliary functions
    md5._ff = function (a, b, c, d, x, s, t) {
      var n = a + (b & c | ~b & d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._gg = function (a, b, c, d, x, s, t) {
      var n = a + (b & d | c & ~d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._hh = function (a, b, c, d, x, s, t) {
      var n = a + (b ^ c ^ d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._ii = function (a, b, c, d, x, s, t) {
      var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };

    // Package private blocksize
    md5._blocksize = 16;
    md5._digestsize = 16;

    module.exports = function (message, options) {
      if (message === undefined || message === null) throw new Error('Illegal argument ' + message);

      var digestbytes = crypt$$1.wordsToBytes(md5(message, options));
      return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt$$1.bytesToHex(digestbytes);
    };
  })();
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var at;
var ch;
var escapee = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t'
};
var text;
var error = function error(m) {
    // Call error when something is wrong.
    throw {
        name: 'SyntaxError',
        message: m,
        at: at,
        text: text
    };
};
var next = function next(c) {
    // If a c parameter is provided, verify that it matches the current character.
    if (c && c !== ch) {
        error("Expected '" + c + "' instead of '" + ch + "'");
    }

    // Get the next character. When there are no more characters,
    // return the empty string.

    ch = text.charAt(at);
    at += 1;
    return ch;
};
var number = function number() {
    // Parse a number value.
    var number,
        string = '';

    if (ch === '-') {
        string = '-';
        next('-');
    }
    while (ch >= '0' && ch <= '9') {
        string += ch;
        next();
    }
    if (ch === '.') {
        string += '.';
        while (next() && ch >= '0' && ch <= '9') {
            string += ch;
        }
    }
    if (ch === 'e' || ch === 'E') {
        string += ch;
        next();
        if (ch === '-' || ch === '+') {
            string += ch;
            next();
        }
        while (ch >= '0' && ch <= '9') {
            string += ch;
            next();
        }
    }
    number = +string;
    if (!isFinite(number)) {
        error("Bad number");
    } else {
        return number;
    }
};
var string = function string() {
    // Parse a string value.
    var hex,
        i,
        string = '',
        uffff;

    // When parsing for string values, we must look for " and \ characters.
    if (ch === '"') {
        while (next()) {
            if (ch === '"') {
                next();
                return string;
            } else if (ch === '\\') {
                next();
                if (ch === 'u') {
                    uffff = 0;
                    for (i = 0; i < 4; i += 1) {
                        hex = parseInt(next(), 16);
                        if (!isFinite(hex)) {
                            break;
                        }
                        uffff = uffff * 16 + hex;
                    }
                    string += String.fromCharCode(uffff);
                } else if (typeof escapee[ch] === 'string') {
                    string += escapee[ch];
                } else {
                    break;
                }
            } else {
                string += ch;
            }
        }
    }
    error("Bad string");
};
var white = function white() {

    // Skip whitespace.

    while (ch && ch <= ' ') {
        next();
    }
};
var word = function word() {

    // true, false, or null.

    switch (ch) {
        case 't':
            next('t');
            next('r');
            next('u');
            next('e');
            return true;
        case 'f':
            next('f');
            next('a');
            next('l');
            next('s');
            next('e');
            return false;
        case 'n':
            next('n');
            next('u');
            next('l');
            next('l');
            return null;
    }
    error("Unexpected '" + ch + "'");
};
var value;
var array = function array() {

    // Parse an array value.

    var array = [];

    if (ch === '[') {
        next('[');
        white();
        if (ch === ']') {
            next(']');
            return array; // empty array
        }
        while (ch) {
            array.push(value());
            white();
            if (ch === ']') {
                next(']');
                return array;
            }
            next(',');
            white();
        }
    }
    error("Bad array");
};
var object = function object() {

    // Parse an object value.

    var key,
        object = {};

    if (ch === '{') {
        next('{');
        white();
        if (ch === '}') {
            next('}');
            return object; // empty object
        }
        while (ch) {
            key = string();
            white();
            next(':');
            if (Object.hasOwnProperty.call(object, key)) {
                error('Duplicate key "' + key + '"');
            }
            object[key] = value();
            white();
            if (ch === '}') {
                next('}');
                return object;
            }
            next(',');
            white();
        }
    }
    error("Bad object");
};

value = function value() {

    // Parse a JSON value. It could be an object, an array, a string, a number,
    // or a word.

    white();
    switch (ch) {
        case '{':
            return object();
        case '[':
            return array();
        case '"':
            return string();
        case '-':
            return number();
        default:
            return ch >= '0' && ch <= '9' ? number() : word();
    }
};

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */

var index$6 = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
      return port !== 80;

    case 'https':
    case 'wss':
      return port !== 443;

    case 'ftp':
      return port !== 21;

    case 'gopher':
      return port !== 70;

    case 'file':
      return false;
  }

  return port !== 0;
};

var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g,
      result = {},
      part;

  //
  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
  // the lastIndex property so we can continue executing this loop until we've
  // parsed all results.
  //
  for (; part = parser.exec(query); result[decode(part[1])] = decode(part[2])) {}

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
var stringify$4 = querystringify;
var parse$3 = querystring;

var index$8 = {
  stringify: stringify$4,
  parse: parse$3
};

var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i;
var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [['#', 'hash'], // Extract from the back.
['?', 'query'], // Extract from the back.
['/', 'pathname'], // Extract from the back.
['@', 'auth', 1], // Extract from the front.
[NaN, 'host', undefined, 1, 1], // Set left over value.
[/:(\d+)$/, 'port', undefined, 1], // RegExp the back.
[NaN, 'hostname', undefined, 1, 1] // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @api public
 */
function lolcation(loc) {
  loc = loc || commonjsGlobal.location || {};

  var finaldestination = {},
      type = typeof loc === 'undefined' ? 'undefined' : _typeof(loc),
      key;

  if ('blob:' === loc.protocol) {
    finaldestination = new URL$1(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new URL$1(loc, {});
    for (key in ignore) {
      delete finaldestination[key];
    }
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @api private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @api private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/')),
      i = path.length,
      last = path[i - 1],
      unshift = false,
      up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @api public
 */
function URL$1(address, location, parser) {
  if (!(this instanceof URL$1)) {
    return new URL$1(address, location, parser);
  }

  var relative,
      extracted,
      parse,
      instruction,
      index,
      key,
      instructions = rules.slice(),
      type = typeof location === 'undefined' ? 'undefined' : _typeof(location),
      url = this,
      i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = index$8.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if (index = parse.exec(address)) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (relative && instruction[3] ? location[key] || '' : '');

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (relative && location.slashes && url.pathname.charAt(0) !== '/' && (url.pathname !== '' || location.pathname !== '')) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!index$6(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL}
 * @api public
 */
function set$1(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || index$8.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!index$6(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname + ':' + value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':' + url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
      url.pathname = value.length && value.charAt(0) !== '/' ? '/' + value : value;

      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String}
 * @api public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = index$8.stringify;

  var query,
      url = this,
      protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':' + url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === _typeof(url.query) ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?' + query : query;

  if (url.hash) result += url.hash;

  return result;
}

URL$1.prototype = { set: set$1, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
URL$1.extractProtocol = extractProtocol;
URL$1.location = lolcation;
URL$1.qs = index$8;

var index$5 = URL$1;

var base64Arraybuffer = createCommonjsModule(function (module, exports) {
  /*
   * base64-arraybuffer
   * https://github.com/niklasvh/base64-arraybuffer
   *
   * Copyright (c) 2012 Niklas von Hertzen
   * Licensed under the MIT license.
   */
  (function () {
    "use strict";

    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    // Use a lookup table to find the index.
    var lookup = new Uint8Array(256);
    for (var i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
    }

    exports.encode = function (arraybuffer) {
      var bytes = new Uint8Array(arraybuffer),
          i,
          len = bytes.length,
          base64 = "";

      for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64 += chars[bytes[i + 2] & 63];
      }

      if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + "=";
      } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + "==";
      }

      return base64;
    };

    exports.decode = function (base64) {
      var bufferLength = base64.length * 0.75,
          len = base64.length,
          i,
          p = 0,
          encoded1,
          encoded2,
          encoded3,
          encoded4;

      if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }

      var arraybuffer = new ArrayBuffer(bufferLength),
          bytes = new Uint8Array(arraybuffer);

      for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];

        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
      }

      return arraybuffer;
    };
  })();
});

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = commonjsGlobal.crypto || commonjsGlobal.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function rng() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

var rngBrowser = rng;

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
}

var bytesToUuid_1 = bytesToUuid;

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rngBrowser();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [_seedBytes[0] | 0x01, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

function Namespace() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

  var symbol = Symbol(name);
  return function namespace(object) {
    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (data) {
      return data;
    };

    if (object[symbol] === undefined) {
      object[symbol] = init({});
    }
    return object[symbol];
  };
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$1 = Namespace('AggregateFunction');

var AggregateFunction = function () {
  // This constructor provides for inheritance only
  function AggregateFunction(namespace) {
    classCallCheck(this, AggregateFunction);

    if (namespace !== internal$1) {
      throw new Error();
    }
    var scope = internal$1(this);

    for (var _len = arguments.length, targets = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      targets[_key - 1] = arguments[_key];
    }

    scope.targets = targets;
  }

  createClass(AggregateFunction, [{
    key: 'apply',
    value: function apply(target, bound, args) {
      var scope = internal$1(this);
      return scope.targets.map(function (target) {
        return Reflect.apply(target, bound, args);
      });
    }
  }, {
    key: 'getPrototypeOf',
    value: function getPrototypeOf(target) {
      return this.constructor.prototype;
    }
  }], [{
    key: 'new',
    value: function _new() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var instance = new (Function.prototype.bind.apply(this, [null].concat([internal$1], args)))();
      return new Proxy(function () {}, instance);
    }
  }]);
  return AggregateFunction;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$1$1 = Namespace('Aggregate');

var Aggregate = function () {
  // This constructor provides for inheritance only
  function Aggregate(namespace) {
    classCallCheck(this, Aggregate);

    if (namespace !== internal$1$1) {
      throw new Error();
    }
    var scope = internal$1$1(this);

    for (var _len3 = arguments.length, targets = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      targets[_key3 - 1] = arguments[_key3];
    }

    scope.targets = targets;
  }

  createClass(Aggregate, [{
    key: 'set',
    value: function set$$1(target, property, value, receiver) {
      var scope = internal$1$1(this);
      scope.targets.forEach(function (target) {
        Reflect.set(target, property, value);
      });
      return Reflect.set(target, property, value, receiver);
    }
  }, {
    key: 'get',
    value: function get$$1(target, property, receiver) {
      var scope = internal$1$1(this);
      var aggregative = scope.targets.every(function (target) {
        return typeof Reflect.get(target, property) === 'function';
      });
      if (aggregative) {
        return AggregateFunction.new.apply(AggregateFunction, toConsumableArray(scope.targets.map(function (target) {
          return Reflect.get(target, property).bind(target);
        })));
      }
      return Reflect.get(scope.targets[0], property, receiver);
    }
  }, {
    key: 'getPrototypeOf',
    value: function getPrototypeOf(target) {
      return this.constructor.prototype;
    }
  }], [{
    key: 'new',
    value: function _new() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var instance = new (Function.prototype.bind.apply(this, [null].concat([internal$1$1], args)))();
      return new Proxy({}, instance);
    }
  }]);
  return Aggregate;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

function AssertionError(message) {
  this.message = message;
}

Object.setPrototypeOf(AssertionError, Error);
AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.name = 'AssertionError';
AssertionError.prototype.message = '';
AssertionError.prototype.constructor = AssertionError;

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//


var Environment = function () {
  function Environment() {
    classCallCheck(this, Environment);
  }

  createClass(Environment, null, [{
    key: 'type',
    get: function get$$1() {
      try {
        // eslint-disable-next-line no-new-func
        if (new Function('return this === window')()) {
          return 'browser';
        }
      } catch (error) {}
      try {
        // eslint-disable-next-line no-new-func
        if (new Function('return this === self')()) {
          return 'worker';
        }
      } catch (error) {}
      try {
        // eslint-disable-next-line no-new-func
        if (new Function('return this === global')()) {
          return 'node';
        }
      } catch (error) {}
      throw new Error();
    }
  }, {
    key: 'self',
    get: function get$$1() {
      switch (this.type) {
        case 'browser':
          return window;
        case 'worker':
          return self;
        case 'node':
          return global;
        default:
          break;
      }
      throw new Error();
    }
  }]);
  return Environment;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$3 = Namespace('FilePath');

var FilePath = function () {
  function FilePath() {
    classCallCheck(this, FilePath);
  }

  createClass(FilePath, null, [{
    key: 'self',
    get: function get$$1() {
      var scope = internal$3(this);
      return scope.self;
    }
  }, {
    key: 'current',
    get: function get$$1() {
      switch (Environment.type) {
        case 'browser':
          return window.location.href;
        case 'worker':
          return self.location.href;
        case 'node':
          return process.cwd();
        default:
          break;
      }
      throw new Error();
    }
  }]);
  return FilePath;
}();

internal$3(FilePath).self = FilePath.current;

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

function ImplementationError(message) {
  this.message = message;
}

Object.setPrototypeOf(ImplementationError, Error);
ImplementationError.prototype = Object.create(Error.prototype);
ImplementationError.prototype.name = 'ImplementationError';
ImplementationError.prototype.message = '';
ImplementationError.prototype.constructor = ImplementationError;

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$4 = Namespace('Multiton');

var Multiton = function () {
  function Multiton(key) {
    classCallCheck(this, Multiton);

    if (this.constructor.has(key)) {
      throw new Error('Attempt to create multiple instances for key "' + key + '"');
    }
  }

  createClass(Multiton, null, [{
    key: 'has',
    value: function has(key) {
      var scope = internal$4(this);
      if (scope.instances === undefined) {
        return false;
      }
      var coercedKey = this.coerceKey(key);
      return scope.instances[coercedKey] !== undefined;
    }
  }, {
    key: 'for',
    value: function _for(key) {
      var scope = internal$4(this);
      if (!scope.instances) {
        scope.instances = new Map();
      }
      var coercedKey = this.coerceKey(key);
      if (scope.instances.has(coercedKey)) {
        return scope.instances.get(coercedKey);
      }

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      var instance = this.new.apply(this, [coercedKey].concat(args));
      scope.instances.set(coercedKey, instance);
      return instance;
    }
  }, {
    key: 'new',
    value: function _new(key) {
      for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      return new (Function.prototype.bind.apply(this, [null].concat([key], args)))();
    }
  }, {
    key: 'coerceKey',
    value: function coerceKey(key) {
      return key;
    }
  }]);
  return Multiton;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

// Just use url-parse for now


var URL = function (_urlParse) {
  inherits(URL, _urlParse);

  function URL() {
    classCallCheck(this, URL);
    return possibleConstructorReturn(this, (URL.__proto__ || Object.getPrototypeOf(URL)).apply(this, arguments));
  }

  return URL;
}(index$5);

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

/* eslint-disable global-require */


var readFile = void 0;
var request = void 0;
if (Environment.type === 'node') {
  var _require = require('fs');

  readFile = _require.readFile;

  request = require('request');
}
/* eslint-enable global-require */

function browserRequest(url, options) {
  return new Promise(function (resolve, reject) {
    var parsed = new URL(url, true);
    if (options.query) {
      parsed.set('query', Object.assign({}, parsed.query, options.query));
    }
    var request = new XMLHttpRequest();
    request.open('get', parsed.toString(), true);
    if (options.headers) {
      Object.entries(options.headers).forEach(function (header) {
        request.setRequestHeader.apply(request, toConsumableArray(header));
      });
    }
    request.responseType = options.type;
    request.addEventListener('loadend', function (event) {
      if (request.status < 200 || request.status >= 300) {
        reject(request.status);
        return;
      }
      if (request.response === null && options.type === 'json') {
        reject(new Error('Could not parse JSON'));
        return;
      }
      resolve(request.response);
    }, false);
    request.send();
  });
}

function nodeRequest(url, options) {
  if (options.local) {
    return new Promise(function (resolve, reject) {
      readFile(url, options.encoding, function (error, response) {
        if (error) {
          reject(error);
          return;
        }
        resolve(response);
      });
    });
  }
  return new Promise(function (resolve, reject) {
    request({
      url: url,
      headers: options.headers || {},
      qs: options.query || {},
      encoding: options.encoding
    }, function (error, response) {
      if (error) {
        reject(error);
        return;
      }
      if (response.statusCode < 200 || response.statusCode >= 300) {
        reject(response.statusCode);
      }
      resolve(response.body);
    });
  });
}

function performRequest(url, options) {
  if (Environment.type === 'node') {
    var promise = nodeRequest(url, options);
    if (options.type === 'json') {
      return promise.then(function (response) {
        if (typeof response !== 'string') {
          throw new Error('Response is unexpectedly not a string');
        }
        return JSON.parse(response);
      });
    }
    if (options.type === 'arraybuffer') {
      return promise.then(function (response) {
        if (!(response instanceof Buffer)) {
          throw new Error('Response is unexpectedly not a buffer');
        }
        var buffer = new ArrayBuffer(response.length);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < response.length; ++i) {
          view[i] = response[i];
        }
        return buffer;
      });
    }
    return promise;
  }
  return browserRequest(url, options);
}

function parseArguments() {
  for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }

  var url = args[0],
      options = args[1];

  if (typeof url !== 'string') {
    options = url;
    url = options.url;
  }
  if (typeof url !== 'string') {
    throw new Error('The first argument or options.url must be a string');
  }
  options = Object.assign({}, {
    type: 'text',
    local: false,
    encoding: 'utf-8'
  }, options);
  return [url, options];
}

var Request = function () {
  function Request() {
    classCallCheck(this, Request);
  }

  createClass(Request, null, [{
    key: 'text',
    value: function text() {
      var _parseArguments = parseArguments.apply(undefined, arguments),
          _parseArguments2 = slicedToArray(_parseArguments, 2),
          url = _parseArguments2[0],
          options = _parseArguments2[1];

      options.type = 'text';
      return performRequest(url, options);
    }
  }, {
    key: 'json',
    value: function json() {
      var _parseArguments3 = parseArguments.apply(undefined, arguments),
          _parseArguments4 = slicedToArray(_parseArguments3, 2),
          url = _parseArguments4[0],
          options = _parseArguments4[1];

      options.type = 'json';
      return performRequest(url, options);
    }
  }, {
    key: 'buffer',
    value: function buffer() {
      var _parseArguments5 = parseArguments.apply(undefined, arguments),
          _parseArguments6 = slicedToArray(_parseArguments5, 2),
          url = _parseArguments6[0],
          options = _parseArguments6[1];

      options.type = 'arraybuffer';
      options.encoding = null;
      return performRequest(url, options);
    }
  }, {
    key: 'csv',
    value: function csv() {
      var _parseArguments7 = parseArguments.apply(undefined, arguments),
          _parseArguments8 = slicedToArray(_parseArguments7, 2),
          url = _parseArguments8[0],
          options = _parseArguments8[1];

      return this.text(url, options).then(function (response) {
        return Environment.self.d3.csvParse(response, options.row);
      });
    }
  }, {
    key: 'tsv',
    value: function tsv() {
      var _parseArguments9 = parseArguments.apply(undefined, arguments),
          _parseArguments10 = slicedToArray(_parseArguments9, 2),
          url = _parseArguments10[0],
          options = _parseArguments10[1];

      return this.text(url, options).then(function (response) {
        return Environment.self.d3.tsvParse(response, options.row);
      });
    }
  }]);
  return Request;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$6 = Namespace('Semaphore');

var Task = function Task(semaphore, callback) {
  var _this2 = this;

  classCallCheck(this, Task);

  var promises = [new Promise(function (resolve, reject) {
    _this2.resolve = resolve;
    _this2.reject = reject;
  }), new Promise(function (resolve) {
    _this2.let = resolve;
  }).then(function () {
    callback(_this2.resolve, _this2.reject);
  })];
  this.promise = Promise.all(promises).then(function (values) {
    semaphore.signal();
    return values[0];
  }, function (reason) {
    semaphore.signal();
    return Promise.reject(reason);
  });
};

var Semaphore = function () {
  function Semaphore(capacity) {
    classCallCheck(this, Semaphore);

    var scope = internal$6(this);
    scope.capacity = capacity;
    scope.available = capacity;
    scope.queue = [];
  }

  createClass(Semaphore, [{
    key: 'wait',
    value: function wait(callback) {
      var scope = internal$6(this);
      var task = new Task(this, callback);
      if (scope.available === 0) {
        scope.queue.push(task);
      } else {
        --scope.available;
        task.let();
      }
      return task.promise;
    }
  }, {
    key: 'signal',
    value: function signal() {
      var scope = internal$6(this);
      if (scope.queue.length === 0) {
        ++scope.available;
      } else {
        scope.queue.shift().let();
      }
    }

    // Properties

  }, {
    key: 'capacity',
    get: function get$$1() {
      var scope = internal$6(this);
      return scope.capacity;
    }
  }, {
    key: 'available',
    get: function get$$1() {
      var scope = internal$6(this);
      return scope.available;
    }
  }]);
  return Semaphore;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$7 = Namespace('Singleton');

var Singleton = function () {
  function Singleton() {
    classCallCheck(this, Singleton);

    if (internal$7(this.constructor).instance !== undefined) {
      throw new Error('Attempt to create multiple instances for singleton');
    }
  }

  createClass(Singleton, null, [{
    key: 'get',
    value: function get$$1() {
      var scope = internal$7(this);
      if (scope.instance === undefined) {
        scope.instance = this.new.apply(this, arguments);
      }
      return scope.instance;
    }
  }, {
    key: 'new',
    value: function _new() {
      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return new (Function.prototype.bind.apply(this, [null].concat(args)))();
    }
  }]);
  return Singleton;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var Stride = function () {
  function Stride() {
    classCallCheck(this, Stride);
  }

  createClass(Stride, null, [{
    key: 'transform',
    value: function transform(array, stride, callback) {
      var values = [];
      array.forEach(function (value, index) {
        var modulo = index % stride;
        values[modulo] = value;
        if (modulo === stride - 1) {
          var transformed = callback.apply(undefined, values.concat([Math.floor(index / stride)]));
          for (var offset = 0; offset < stride; ++offset) {
            array[index - (stride - offset - 1)] = transformed[offset];
          }
        }
      });
      return array;
    }
  }, {
    key: 'forEach',
    value: function forEach(array, stride, callback) {
      var values = [];
      array.forEach(function (value, index) {
        var modulo = index % stride;
        values[modulo] = value;
        if (modulo === stride - 1) {
          callback.apply(undefined, values.concat([Math.floor(index / stride)]));
        }
      });
    }
  }, {
    key: 'some',
    value: function some(array, stride, callback) {
      var values = [];
      return array.some(function (value, index) {
        var modulo = index % stride;
        values[modulo] = value;
        if (modulo === stride - 1) {
          return callback.apply(undefined, values.concat([Math.floor(index / stride)]));
        }
        return false;
      });
    }
  }, {
    key: 'every',
    value: function every(array, stride, callback) {
      var values = [];
      return array.every(function (value, index) {
        var modulo = index % stride;
        values[modulo] = value;
        if (modulo === stride - 1) {
          return callback.apply(undefined, values.concat([Math.floor(index / stride)]));
        }
        return true;
      });
    }
  }, {
    key: 'reduce',
    value: function reduce(array, stride, callback, initial) {
      var values = [];
      return array.reduce(function (result, value, index) {
        var modulo = index % stride;
        values[modulo] = value;
        if (modulo === stride - 1) {
          return callback.apply(undefined, [result].concat(values, [Math.floor(index / stride)]));
        }
        return result;
      }, initial);
    }
  }]);
  return Stride;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

if (Environment.type === 'node') {
  // eslint-disable-next-line global-require
  var encoding = require('text-encoding');
  if (Environment.self.TextEncoder === undefined) {
    Environment.self.TextEncoder = encoding.TextEncoder;
  }
  if (Environment.self.TextDecoder === undefined) {
    Environment.self.TextDecoder = encoding.TextDecoder;
  }
}

var Transferral = function () {
  function Transferral() {
    classCallCheck(this, Transferral);
  }

  createClass(Transferral, null, [{
    key: 'encode',
    value: function encode(object) {
      if (typeof TextEncoder !== 'function') {
        throw new Error('TextEncoder is missing');
      }
      var encoder = new TextEncoder();
      var text = JSON.stringify(object);
      var array = encoder.encode(text);
      return array.buffer;
    }
  }, {
    key: 'decode',
    value: function decode(buffer) {
      if (typeof TextDecoder !== 'function') {
        throw new Error('TextDecoder is missing');
      }
      var decoder = new TextDecoder();
      var view = new DataView(buffer);
      var text = decoder.decode(view);
      return JSON.parse(text);
    }
  }, {
    key: 'pack',
    value: function pack(buffer) {
      return base64Arraybuffer.encode(buffer);
    }
  }, {
    key: 'unpack',
    value: function unpack(string) {
      return base64Arraybuffer.decode(string);
    }
  }, {
    key: 'packBufferGeometry',
    value: function packBufferGeometry(geometry) {
      var _this3 = this;

      Object.values(geometry.data.attributes).forEach(function (attribute) {
        var constructor = Environment.self[attribute.type];
        var buffer = new constructor(attribute.array).buffer;
        attribute.array = _this3.pack(buffer);
      });
    }
  }, {
    key: 'unpackBufferGeometry',
    value: function unpackBufferGeometry(geometry) {
      var _this4 = this;

      Object.values(geometry.data.attributes).forEach(function (attribute) {
        var constructor = Environment.self[attribute.type];
        var buffer = _this4.unpack(attribute.array);
        attribute.array = Array.from(new constructor(buffer));
      });
    }
  }]);
  return Transferral;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var Matrix = {
  get identity() {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  },

  equals: function equals(matrix1, matrix2) {
    if (matrix1 === matrix2) {
      return true;
    }
    if (!Array.isArray(matrix1) || !Array.isArray(matrix2)) {
      return false;
    }
    if (matrix1.length !== matrix2.length) {
      return false;
    }
    return matrix1.every(function (value, index) {
      return value === matrix2[index];
    });
  },
  transform: function transform(matrix, vector) {
    var _vector = slicedToArray(vector, 3),
        x = _vector[0],
        y = _vector[1],
        z = _vector[2];

    return [matrix[0] * x + matrix[1] * y + matrix[2] * z, matrix[3] * x + matrix[4] * y + matrix[5] * z, matrix[6] * x + matrix[7] * y + matrix[8] * z];
  },
  multiply: function multiply(matrix1, matrix2) {
    var _matrix = slicedToArray(matrix1, 9),
        a11 = _matrix[0],
        a12 = _matrix[1],
        a13 = _matrix[2],
        a21 = _matrix[3],
        a22 = _matrix[4],
        a23 = _matrix[5],
        a31 = _matrix[6],
        a32 = _matrix[7],
        a33 = _matrix[8];

    var _matrix2 = slicedToArray(matrix2, 9),
        b11 = _matrix2[0],
        b12 = _matrix2[1],
        b13 = _matrix2[2],
        b21 = _matrix2[3],
        b22 = _matrix2[4],
        b23 = _matrix2[5],
        b31 = _matrix2[6],
        b32 = _matrix2[7],
        b33 = _matrix2[8];

    return [a11 * b11 + a12 * b21 + a13 * b31, a11 * b12 + a12 * b22 + a13 * b32, a11 * b13 + a12 * b23 + a13 * b33, a21 * b11 + a22 * b21 + a23 * b31, a21 * b12 + a22 * b22 + a23 * b32, a21 * b13 + a22 * b23 + a23 * b33, a31 * b11 + a32 * b21 + a33 * b31, a31 * b12 + a32 * b22 + a33 * b32, a31 * b13 + a32 * b23 + a33 * b33];
  },
  invert: function invert(matrix) {
    var _matrix3 = slicedToArray(matrix, 9),
        m11 = _matrix3[0],
        m12 = _matrix3[1],
        m13 = _matrix3[2],
        m21 = _matrix3[3],
        m22 = _matrix3[4],
        m23 = _matrix3[5],
        m31 = _matrix3[6],
        m32 = _matrix3[7],
        m33 = _matrix3[8];

    var p = m22 * m33 - m23 * m32;
    var q = m23 * m31 - m21 * m33;
    var r = m21 * m32 - m22 * m31;
    var determinant = m11 * p + m12 * q + m13 * r;
    if (determinant === 0) {
      throw new Error();
    }
    return [p / determinant, (m13 * m32 - m12 * m33) / determinant, (m12 * m23 - m13 * m22) / determinant, q / determinant, (m11 * m33 - m13 * m31) / determinant, (m13 * m21 - m11 * m23) / determinant, r / determinant, (m12 * m31 - m11 * m32) / determinant, (m11 * m22 - m12 * m21) / determinant];
  }
};

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$2 = Namespace('Tristimulus');

var Tristimulus = function () {
  function Tristimulus(chromaticity) {
    var luminance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    classCallCheck(this, Tristimulus);

    var scope = internal$2(this);
    var x = chromaticity.x,
        y = chromaticity.y;

    scope.y = luminance;
    var ly = luminance / y;
    scope.x = ly * x;
    scope.z = ly * (1 - x - y);
  }

  createClass(Tristimulus, [{
    key: 'equals',
    value: function equals(other) {
      return other.x === this.x && other.y === this.y && other.z === this.z;
    }
  }, {
    key: 'toArray',
    value: function toArray$$1() {
      return [this.x, this.y, this.z];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['x', 'y', 'z'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'x',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.x;
    }
  }, {
    key: 'y',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.y;
    }
  }, {
    key: 'z',
    get: function get$$1() {
      var scope = internal$2(this);
      return scope.z;
    }
  }]);
  return Tristimulus;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal = Namespace('ChromaticAdaptation');

var ChromaticAdaptation = function () {
  function ChromaticAdaptation(matrix, inverseMatrix) {
    classCallCheck(this, ChromaticAdaptation);

    var scope = internal(this);
    scope.matrix = matrix;
    scope.inverseMatrix = inverseMatrix || Matrix.invert(matrix);
    scope.transformationMatrices = new Map();
  }

  createClass(ChromaticAdaptation, [{
    key: 'transformationMatrix',
    value: function transformationMatrix(source, destination) {
      var scope = internal(this);
      var found = Array.from(scope.transformationMatrices.keys()).find(function (key) {
        return source.equals(key.source) && destination.equals(key.destination);
      });
      var matrix = void 0;
      if (found) {
        matrix = [].concat(toConsumableArray(scope.transformationMatrices.get(found)));
      } else {
        var _toArray = new Tristimulus(source).toArray(),
            _toArray2 = slicedToArray(_toArray, 3),
            Xs = _toArray2[0],
            Ys = _toArray2[1],
            Zs = _toArray2[2];

        var _toArray3 = new Tristimulus(destination).toArray(),
            _toArray4 = slicedToArray(_toArray3, 3),
            Xd = _toArray4[0],
            Yd = _toArray4[1],
            Zd = _toArray4[2];

        var s = Matrix.transform(this.matrix, [Xs, Ys, Zs]);
        var d = Matrix.transform(this.matrix, [Xd, Yd, Zd]);
        matrix = Matrix.multiply(this.inverseMatrix, [d[0] / s[0], 0, 0, 0, d[1] / s[1], 0, 0, 0, d[2] / s[2]]);
        matrix = Matrix.multiply(matrix, this.matrix);
        scope.transformationMatrices.set({ source: source, destination: destination }, [].concat(toConsumableArray(matrix)));
      }
      return matrix;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['matrix', 'inverseMatrix'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'matrix',
    get: function get$$1() {
      var scope = internal(this);
      return [].concat(toConsumableArray(scope.matrix));
    }
  }, {
    key: 'inverseMatrix',
    get: function get$$1() {
      var scope = internal(this);
      return [].concat(toConsumableArray(scope.inverseMatrix));
    }
  }], [{
    key: 'new',
    value: function _new(matrix, inverseMatrix) {
      var scope = internal(this);
      if (!scope.instances) {
        scope.instances = new Map();
      }
      var found = Array.from(scope.instances.keys()).find(function (key) {
        return Matrix.equals(matrix, key.matrix) && Matrix.equals(inverseMatrix, key.inverseMatrix);
      });
      var instance = void 0;
      if (found) {
        instance = scope.instances.get(found);
      } else {
        instance = new this(matrix, inverseMatrix);
        scope.instances.set({ matrix: matrix, inverseMatrix: inverseMatrix }, instance);
      }
      return instance;
    }
  }]);
  return ChromaticAdaptation;
}();

Object.assign(ChromaticAdaptation, {
  // Performance Of Five Chromatic Adaptation Transforms Using Large Number Of
  // Color Patches
  // http://hrcak.srce.hr/file/95370
  // Retrieved 2016.
  // * We need to find the primary source.
  XYZ: ChromaticAdaptation.new(Matrix.identity, Matrix.identity),
  Bradford: ChromaticAdaptation.new([0.8951, 0.2664, -0.1614, -0.7502, 1.7135, 0.0367, 0.0389, -0.0685, 1.0296]),
  VonKries: ChromaticAdaptation.new([0.4002, 0.7076, -0.0808, -0.2263, 1.1653, 0.0457, 0.0000, 0.0000, 0.9182]),

  // The CIE 1997 Interim Colour Appearance Model (Simple Version), CIECAM97s
  // http://rit-mcsl.org/fairchild/PDFs/CIECAM97s_TC_Draft.pdf
  // Retrieved 2016.
  CIECAM97: ChromaticAdaptation.new([0.8951, 0.2664, -0.1614, -0.7502, 1.7135, 0.0367, 0.0389, -0.0685, 1.0296]),

  // Color Appearance Models: CIECAM02 and Beyond
  // http://rit-mcsl.org/fairchild/PDFs/AppearanceLec.pdf
  // Retrieved 2016.
  // * We need to find the primary source.
  CIECAM02: ChromaticAdaptation.new([0.7328, 0.4296, -0.1624, -0.7036, 1.6975, 0.0061, 0.0030, 0.0136, 0.9834])
});

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$3$1 = Namespace('Chromaticity');

var Chromaticity = function () {
  function Chromaticity(x, y) {
    classCallCheck(this, Chromaticity);

    var scope = internal$3$1(this);
    scope.x = x;
    scope.y = y;
  }

  createClass(Chromaticity, [{
    key: 'equals',
    value: function equals(other) {
      return other.x === this.x && other.y === this.y;
    }
  }, {
    key: 'toArray',
    value: function toArray$$1() {
      return [this.x, this.y];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['x', 'y'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'x',
    get: function get$$1() {
      var scope = internal$3$1(this);
      return scope.x;
    }
  }, {
    key: 'y',
    get: function get$$1() {
      var scope = internal$3$1(this);
      return scope.y;
    }
  }, {
    key: 'z',
    get: function get$$1() {
      var scope = internal$3$1(this);
      return 1 - scope.x - scope.y;
    }
  }]);
  return Chromaticity;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var Illuminant = function (_Chromaticity) {
  inherits(Illuminant, _Chromaticity);

  function Illuminant() {
    classCallCheck(this, Illuminant);
    return possibleConstructorReturn(this, (Illuminant.__proto__ || Object.getPrototypeOf(Illuminant)).apply(this, arguments));
  }

  return Illuminant;
}(Chromaticity);

Object.assign(Illuminant, {
  A: new Illuminant(0.44757, 0.40745),
  B: new Illuminant(0.34842, 0.35161),
  C: new Illuminant(0.31006, 0.31616),
  D50: new Illuminant(0.34567, 0.35850),
  D55: new Illuminant(0.33242, 0.34743),
  D65: new Illuminant(0.31271, 0.32902),
  D75: new Illuminant(0.29902, 0.31485),
  E: new Illuminant(1 / 3, 1 / 3),
  F1: new Illuminant(0.31310, 0.33727),
  F2: new Illuminant(0.37208, 0.37529),
  F3: new Illuminant(0.40910, 0.39430),
  F4: new Illuminant(0.44018, 0.40329),
  F5: new Illuminant(0.31379, 0.34531),
  F6: new Illuminant(0.37790, 0.38835),
  F7: new Illuminant(0.31292, 0.32933),
  F8: new Illuminant(0.34588, 0.35875),
  F9: new Illuminant(0.37417, 0.37281),
  F10: new Illuminant(0.34609, 0.35986),
  F11: new Illuminant(0.38052, 0.37713),
  F12: new Illuminant(0.43695, 0.40441)
});

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$4$1 = Namespace('Primaries');

var Primaries = function () {
  function Primaries(r, g, b, w) {
    classCallCheck(this, Primaries);

    var scope = internal$4$1(this);
    scope.r = r;
    scope.g = g;
    scope.b = b;
    scope.w = w;
  }

  createClass(Primaries, [{
    key: 'toArray',
    value: function toArray$$1() {
      return [this.r, this.g, this.b, this.w];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['r', 'g', 'b', 'w'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'r',
    get: function get$$1() {
      var scope = internal$4$1(this);
      return scope.r;
    }
  }, {
    key: 'g',
    get: function get$$1() {
      var scope = internal$4$1(this);
      return scope.g;
    }
  }, {
    key: 'b',
    get: function get$$1() {
      var scope = internal$4$1(this);
      return scope.b;
    }
  }, {
    key: 'w',
    get: function get$$1() {
      var scope = internal$4$1(this);
      return scope.w;
    }
  }, {
    key: 'red',
    get: function get$$1() {
      return this.r;
    }
  }, {
    key: 'green',
    get: function get$$1() {
      return this.g;
    }
  }, {
    key: 'blue',
    get: function get$$1() {
      return this.b;
    }
  }, {
    key: 'white',
    get: function get$$1() {
      return this.w;
    }
  }]);
  return Primaries;
}();

Object.assign(Primaries, {
  // Specification of sRGB.
  // http://www.color.org/srgb.pdf
  // Retrieved 2016.
  sRGB: new Primaries(new Chromaticity(0.64, 0.33), new Chromaticity(0.30, 0.60), new Chromaticity(0.15, 0.06), new Illuminant(0.3127, 0.3290)),

  // Adobe RGB (1998) Color Image Encoding. Version 2005-05. May 2005.
  // https://www.adobe.com/digitalimag/pdfs/AdobeRGB1998.pdf
  // Retrieved 2016.
  AdobeRGB: new Primaries(new Chromaticity(0.6400, 0.3300), new Chromaticity(0.2100, 0.7100), new Chromaticity(0.1500, 0.0600), new Illuminant(0.3127, 0.3290))
});

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$5 = Namespace('RGB');

var RGB = function () {
  // RGB([primaries])
  // RGB(value [, primaries]])
  // RGB(red, green, blue [, primaries])
  function RGB() {
    classCallCheck(this, RGB);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var rest = [].concat(args);
    var scope = internal$5(this);
    if (args[args.length - 1] instanceof Primaries) {
      scope.primaries = rest.pop();
    } else {
      scope.primaries = Primaries.sRGB;
    }
    if (rest.length === 0) {
      this.r = 0;
      this.g = 0;
      this.b = 0;
    } else if (rest.length === 1) {
      var _rest = slicedToArray(rest, 1),
          value = _rest[0];

      this.r = value || 0;
      this.g = value || 0;
      this.b = value || 0;
    } else {
      var _rest2 = slicedToArray(rest, 3),
          r = _rest2[0],
          g = _rest2[1],
          b = _rest2[2];

      this.r = r || 0;
      this.g = g || 0;
      this.b = b || 0;
    }
  }

  createClass(RGB, [{
    key: 'equals',
    value: function equals(other) {
      return other.r === this.r && other.g === this.g && other.b === this.b;
    }
  }, {
    key: 'toArray',
    value: function toArray$$1() {
      return [this.r, this.g, this.b];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['r', 'g', 'b'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'red',
    get: function get$$1() {
      return this.r;
    },
    set: function set$$1(value) {
      this.r = value;
    }
  }, {
    key: 'green',
    get: function get$$1() {
      return this.g;
    },
    set: function set$$1(value) {
      this.g = value;
    }
  }, {
    key: 'blue',
    get: function get$$1() {
      return this.b;
    },
    set: function set$$1(value) {
      this.b = value;
    }
  }, {
    key: 'primaries',
    get: function get$$1() {
      var scope = internal$5(this);
      return scope.primaries;
    }
  }]);
  return RGB;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

function convertRGBToHSL(rgb) {
  var _rgb = slicedToArray(rgb, 3),
      r = _rgb[0],
      g = _rgb[1],
      b = _rgb[2];

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = void 0;
  var s = void 0;
  var l = (max + min) / 2;
  if (max === min) {
    h = 0;
    s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) {
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      h = ((b - r) / d + 2) / 6;
    } else {
      h = ((r - g) / d + 4) / 6;
    }
  }
  return [h, s, l];
}

function convertHSLToRGB(hsl) {
  var _hsl = slicedToArray(hsl, 3),
      h = _hsl[0],
      s = _hsl[1],
      l = _hsl[2];

  var r = void 0;
  var g = void 0;
  var b = void 0;
  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    var f = function f(s) {
      var t = s;
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    };
    r = f(h + 1 / 3);
    g = f(h);
    b = f(h - 1 / 3);
  }
  return [r, g, b];
}

var HSL = function () {
  // HSL([lightness])
  // HSL(hue, saturation, lightness)
  function HSL() {
    classCallCheck(this, HSL);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 0) {
      this.h = 0;
      this.s = 0;
      this.l = 0;
    } else if (args.length === 1) {
      var value = args[0];

      this.h = 0;
      this.s = 0;
      this.l = value || 0;
    } else {
      var h = args[0],
          s = args[1],
          l = args[2];

      this.h = h || 0;
      this.s = s || 0;
      this.l = l || 0;
    }
  }

  createClass(HSL, [{
    key: 'toRGB',
    value: function toRGB() {
      var primaries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Primaries.sRGB;

      return new (Function.prototype.bind.apply(RGB, [null].concat(toConsumableArray(convertHSLToRGB(this.toArray())), [primaries])))();
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      return other.h === this.h && other.s === this.s && other.l === this.l;
    }
  }, {
    key: 'toArray',
    value: function toArray$$1() {
      return [this.h, this.s, this.l];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['h', 's', 'l'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'hue',
    get: function get$$1() {
      return this.h;
    },
    set: function set$$1(value) {
      this.h = value;
    }
  }, {
    key: 'saturation',
    get: function get$$1() {
      return this.s;
    },
    set: function set$$1(value) {
      this.s = value;
    }
  }, {
    key: 'lightness',
    get: function get$$1() {
      return this.l;
    },
    set: function set$$1(value) {
      this.l = value;
    }
  }], [{
    key: 'fromRGB',
    value: function fromRGB(rgb) {
      return new (Function.prototype.bind.apply(this, [null].concat(toConsumableArray(convertRGBToHSL(rgb.toArray())))))();
    }
  }]);
  return HSL;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

function convertRGBToHSV(rgb) {
  var _rgb = slicedToArray(rgb, 3),
      r = _rgb[0],
      g = _rgb[1],
      b = _rgb[2];

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var d = max - min;
  var s = max === 0 ? 0 : d / max;
  var v = max;
  var h = void 0;
  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  } else if (max === g) {
    h = ((b - r) / d + 2) / 6;
  } else {
    h = ((r - g) / d + 4) / 6;
  }
  return [h, s, v];
}

function convertHSVToRGB(hsv) {
  var _hsv = slicedToArray(hsv, 3),
      h = _hsv[0],
      s = _hsv[1],
      v = _hsv[2];

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
    default:
      break;
  }
  return [0, 0, 0];
}

var HSV = function () {
  // HSV([value])
  // HSV(hue, saturation, value)
  function HSV() {
    classCallCheck(this, HSV);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 0) {
      this.h = 0;
      this.s = 0;
      this.v = 0;
    } else if (args.length === 1) {
      var value = args[0];

      this.h = 0;
      this.s = 0;
      this.v = value || 0;
    } else {
      var h = args[0],
          s = args[1],
          v = args[2];

      this.h = h || 0;
      this.s = s || 0;
      this.v = v || 0;
    }
  }

  createClass(HSV, [{
    key: 'toRGB',
    value: function toRGB() {
      var primaries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Primaries.sRGB;

      return new (Function.prototype.bind.apply(RGB, [null].concat(toConsumableArray(convertHSVToRGB(this.toArray())), [primaries])))();
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      return other.h === this.h && other.s === this.s && other.v === this.v;
    }
  }, {
    key: 'toArray',
    value: function toArray$$1() {
      return [this.h, this.s, this.v];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['h', 's', 'v'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'hue',
    get: function get$$1() {
      return this.h;
    },
    set: function set$$1(value) {
      this.h = value;
    }
  }, {
    key: 'saturation',
    get: function get$$1() {
      return this.s;
    },
    set: function set$$1(value) {
      this.s = value;
    }
  }, {
    key: 'value',
    get: function get$$1() {
      return this.v;
    },
    set: function set$$1(value) {
      this.v = value;
    }
  }], [{
    key: 'fromRGB',
    value: function fromRGB(rgb) {
      return new (Function.prototype.bind.apply(this, [null].concat(toConsumableArray(convertRGBToHSV(rgb.toArray())))))();
    }
  }]);
  return HSV;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$7$1 = Namespace('XYZ');

function compand$1(value) {
  if (value <= 0.0031308) {
    return 12.92 * value;
  }
  return 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
}

function decompand$1(value) {
  if (value <= 0.04045) {
    return value / 12.92;
  }
  return Math.pow((value + 0.055) / 1.055, 2.4);
}

var XYZ = function () {
  // XYZ([lightness])
  // XYZ(x, y, z)
  function XYZ() {
    classCallCheck(this, XYZ);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var rest = [].concat(args);
    var scope = internal$7$1(this);
    if (args[args.length - 1] instanceof Illuminant) {
      scope.illuminant = rest.pop();
    } else {
      scope.illuminant = Illuminant.D50;
    }
    if (rest.length === 0) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    } else if (rest.length === 1) {
      var _rest = slicedToArray(rest, 1),
          value = _rest[0];

      this.x = 0;
      this.y = value || 0;
      this.z = 0;
    } else {
      var _rest2 = slicedToArray(rest, 3),
          x = _rest2[0],
          y = _rest2[1],
          z = _rest2[2];

      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    }
  }

  createClass(XYZ, [{
    key: 'toRGB',
    value: function toRGB() {
      var primaries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Primaries.sRGB;
      var x = this.x,
          y = this.y,
          z = this.z;

      var m = this.constructor.XYZToRGBMatrix(primaries, this.illuminant);
      var r = m[0] * x + m[1] * y + m[2] * z;
      var g = m[3] * x + m[4] * y + m[5] * z;
      var b = m[6] * x + m[7] * y + m[8] * z;
      return new RGB(compand$1(r), compand$1(g), compand$1(b), primaries);
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      return other.x === this.x && other.y === this.y && other.z === this.z;
    }
  }, {
    key: 'toArray',
    value: function toArray$$1() {
      return [this.x, this.y, this.z];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['x', 'y', 'z'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'illuminant',
    get: function get$$1() {
      var scope = internal$7$1(this);
      return scope.illuminant;
    }
  }], [{
    key: 'fromRGB',
    value: function fromRGB(rgb) {
      var illuminant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Illuminant.D50;

      var m = this.RGBToXYZMatrix(rgb.primaries);
      var r = decompand$1(rgb.r);
      var g = decompand$1(rgb.g);
      var b = decompand$1(rgb.b);
      return new this(m[0] * r + m[1] * g + m[2] * b, m[3] * r + m[4] * g + m[5] * b, m[6] * r + m[7] * g + m[8] * b, illuminant);
    }
  }, {
    key: 'RGBToXYZMatrix',
    value: function RGBToXYZMatrix(primaries) {
      var illuminant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Illuminant.D50;

      var scope = internal$7$1(primaries);
      if (scope.RGBToXYZMatrix !== undefined) {
        return [].concat(toConsumableArray(scope.RGBToXYZMatrix));
      }

      var _toArray = new Tristimulus(primaries.r).toArray(),
          _toArray2 = slicedToArray(_toArray, 3),
          xr = _toArray2[0],
          yr = _toArray2[1],
          zr = _toArray2[2];

      var _toArray3 = new Tristimulus(primaries.g).toArray(),
          _toArray4 = slicedToArray(_toArray3, 3),
          xg = _toArray4[0],
          yg = _toArray4[1],
          zg = _toArray4[2];

      var _toArray5 = new Tristimulus(primaries.b).toArray(),
          _toArray6 = slicedToArray(_toArray5, 3),
          xb = _toArray6[0],
          yb = _toArray6[1],
          zb = _toArray6[2];

      var _toArray7 = new Tristimulus(primaries.w).toArray(),
          _toArray8 = slicedToArray(_toArray7, 3),
          xw = _toArray8[0],
          yw = _toArray8[1],
          zw = _toArray8[2];

      var s = Matrix.invert([xr, xg, xb, yr, yg, yb, zr, zg, zb]);
      var sr = s[0] * xw + s[1] * yw + s[2] * zw;
      var sg = s[3] * xw + s[4] * yw + s[5] * zw;
      var sb = s[6] * xw + s[7] * yw + s[8] * zw;
      var ca = ChromaticAdaptation.Bradford;
      var cat = ca.transformationMatrix(primaries.w, illuminant);
      var matrix = Matrix.multiply(cat, [sr * xr, sg * xg, sb * xb, sr * yr, sg * yg, sb * yb, sr * zr, sg * zg, sb * zb]);
      scope.RGBToXYZMatrix = [].concat(toConsumableArray(matrix));
      return matrix;
    }
  }, {
    key: 'XYZToRGBMatrix',
    value: function XYZToRGBMatrix(primaries) {
      var illuminant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Illuminant.D50;

      var scope = internal$7$1(primaries);
      if (scope.XYZToRGBMatrix !== undefined) {
        return [].concat(toConsumableArray(scope.XYZToRGBMatrix));
      }
      var matrix = Matrix.invert(this.RGBToXYZMatrix(primaries, illuminant));
      scope.XYZToRGBMatrix = [].concat(toConsumableArray(matrix));
      return matrix;
    }
  }]);
  return XYZ;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$6$1 = Namespace('Lab');

function compand(value) {
  if (value > 216 / 24389) {
    return Math.pow(value, 1 / 3);
  }
  return 841 / 108 * value + 4 / 29;
}

function decompand(value) {
  if (value > 6 / 29) {
    return Math.pow(value, 3);
  }
  return 108 / 841 * (value - 4 / 29);
}

var Lab = function () {
  // Lab([illuminant])
  // Lab(lightness [, illuminant]])
  // Lab(lightness, a, b [, illuminant])
  function Lab() {
    classCallCheck(this, Lab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var rest = [].concat(args);
    var scope = internal$6$1(this);
    if (args[args.length - 1] instanceof Illuminant) {
      scope.illuminant = rest.pop();
    } else {
      scope.illuminant = Illuminant.D50;
    }
    if (rest.length === 0) {
      this.l = 0;
      this.a = 0;
      this.b = 0;
    } else if (rest.length === 1) {
      var _rest = slicedToArray(rest, 1),
          value = _rest[0];

      this.l = value || 0;
      this.a = 0;
      this.b = 0;
    } else {
      var _rest2 = slicedToArray(rest, 3),
          l = _rest2[0],
          a = _rest2[1],
          b = _rest2[2];

      this.l = l || 0;
      this.a = a || 0;
      this.b = b || 0;
    }
  }

  createClass(Lab, [{
    key: 'toRGB',
    value: function toRGB() {
      var primaries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Primaries.sRGB;

      return this.toXYZ().toRGB(primaries);
    }
  }, {
    key: 'toXYZ',
    value: function toXYZ() {
      var w = new Tristimulus(this.illuminant);
      var t = (this.l + 16) / 116;
      return new XYZ(decompand(t + this.a / 500) * w.x, decompand(t) * w.y, decompand(t - this.b / 200) * w.z);
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      return other.l === this.l && other.a === this.a && other.b === this.b;
    }
  }, {
    key: 'toArray',
    value: function toArray$$1() {
      return [this.l, this.a, this.b];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['l', 'a', 'b'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'lightness',
    get: function get$$1() {
      return this.l;
    },
    set: function set$$1(value) {
      this.l = value;
    }
  }, {
    key: 'illuminant',
    get: function get$$1() {
      var scope = internal$6$1(this);
      return scope.illuminant;
    }
  }], [{
    key: 'fromRGB',
    value: function fromRGB(rgb) {
      var illuminant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Illuminant.D50;

      return this.fromXYZ(XYZ.fromRGB(rgb), illuminant);
    }
  }, {
    key: 'fromXYZ',
    value: function fromXYZ(xyz) {
      var illuminant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Illuminant.D50;

      var w = new Tristimulus(illuminant);
      var t = compand(xyz.y / w.y);
      return new this(116 * t - 16, 500 * (compand(xyz.x / w.x) - t), 200 * (t - compand(xyz.z / w.z)), illuminant);
    }
  }]);
  return Lab;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$8 = Namespace('LCHab');

var LCHab = function () {
  // LCHab([illuminant])
  // LCHab(lightness [, illuminant]])
  // LCHab(lightness, c, h [, illuminant])
  function LCHab() {
    classCallCheck(this, LCHab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var rest = [].concat(args);
    var scope = internal$8(this);
    if (args[args.length - 1] instanceof Illuminant) {
      scope.illuminant = rest.pop();
    } else {
      scope.illuminant = Illuminant.D50;
    }
    if (rest.length === 0) {
      this.l = 0;
      this.c = 0;
      this.h = 0;
    } else if (rest.length === 1) {
      var _rest = slicedToArray(rest, 1),
          value = _rest[0];

      this.l = value || 0;
      this.c = 0;
      this.h = 0;
    } else {
      var _rest2 = slicedToArray(rest, 3),
          l = _rest2[0],
          c = _rest2[1],
          h = _rest2[2];

      this.l = l || 0;
      this.c = c || 0;
      this.h = h || 0;
    }
  }

  createClass(LCHab, [{
    key: 'toRGB',
    value: function toRGB() {
      var primaries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Primaries.sRGB;

      return this.toLab().toRGB(primaries);
    }
  }, {
    key: 'toLab',
    value: function toLab() {
      var l = this.l,
          c = this.c,
          h = this.h,
          illuminant = this.illuminant;

      return new Lab(l, c * Math.cos(h), c * Math.sin(h), illuminant);
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      return other.l === this.l && other.c === this.c && other.h === this.h;
    }
  }, {
    key: 'toArray',
    value: function toArray$$1() {
      return [this.l, this.c, this.h];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['l', 'c', 'h'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'lightness',
    get: function get$$1() {
      return this.l;
    },
    set: function set$$1(value) {
      this.l = value;
    }
  }, {
    key: 'chroma',
    get: function get$$1() {
      return this.c;
    },
    set: function set$$1(value) {
      this.c = value;
    }
  }, {
    key: 'hue',
    get: function get$$1() {
      return this.h;
    },
    set: function set$$1(value) {
      this.h = value;
    }
  }, {
    key: 'illuminant',
    get: function get$$1() {
      var scope = internal$8(this);
      return scope.illuminant;
    }
  }], [{
    key: 'fromRGB',
    value: function fromRGB(rgb) {
      var illuminant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Illuminant.D50;

      return this.fromLab(Lab.fromRGB(rgb, illuminant));
    }
  }, {
    key: 'fromLab',
    value: function fromLab(lab) {
      var l = lab.l,
          a = lab.a,
          b = lab.b,
          illuminant = lab.illuminant;

      return new this(l, Math.sqrt(a * a + b * b), Math.atan2(b, a), illuminant);
    }
  }]);
  return LCHab;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$10 = Namespace('Luv');

function compand$2(value) {
  if (value > 216 / 24389) {
    return Math.pow(value, 1 / 3);
  }
  return 841 / 108 * value + 4 / 29;
}

function decompand$2(value) {
  if (value > 6 / 29) {
    return Math.pow(value, 3);
  }
  return 108 / 841 * (value - 4 / 29);
}

function ucs(tristimulus) {
  var x = tristimulus.x,
      y = tristimulus.y,
      z = tristimulus.z;

  return {
    u: 4 * x / (x + 15 * y + 3 * z),
    v: 9 * x / (x + 15 * y + 3 * z)
  };
}

var Luv = function () {
  // Luv([illuminant])
  // Luv(lightness [, illuminant]])
  // Luv(lightness, u, v [, illuminant])
  function Luv() {
    classCallCheck(this, Luv);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var rest = [].concat(args);
    var scope = internal$10(this);
    if (args[args.length - 1] instanceof Illuminant) {
      scope.illuminant = rest.pop();
    } else {
      scope.illuminant = Illuminant.D50;
    }
    if (rest.length === 0) {
      this.l = 0;
      this.u = 0;
      this.v = 0;
    } else if (rest.length === 1) {
      var _rest = slicedToArray(rest, 1),
          value = _rest[0];

      this.l = value || 0;
      this.u = 0;
      this.v = 0;
    } else {
      var _rest2 = slicedToArray(rest, 3),
          l = _rest2[0],
          a = _rest2[1],
          b = _rest2[2];

      this.l = l || 0;
      this.u = a || 0;
      this.v = b || 0;
    }
  }

  createClass(Luv, [{
    key: 'toRGB',
    value: function toRGB() {
      var primaries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Primaries.sRGB;

      return this.toXYZ().toRGB(primaries);
    }
  }, {
    key: 'toXYZ',
    value: function toXYZ() {
      // TODO
      var l = this.l;

      var w = new Tristimulus(this.illuminant);
      var y = decompand$2((l + 16) / 116) * w.y;
      var ucsW = ucs(w);
      var ucsU = this.u / (13 * l) + ucsW.u;
      var ucsV = this.v / (13 * l) + ucsW.v;
      var s = 9 * y / ucsV;
      var x = ucsU / 4 * s;
      var z = (s - x - 15 * y) / 3;
      return new XYZ(x, y, z);
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      return other.l === this.l && other.u === this.u && other.v === this.v;
    }
  }, {
    key: 'toArray',
    value: function toArray$$1() {
      return [this.l, this.u, this.v];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['l', 'u', 'v'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'lightness',
    get: function get$$1() {
      return this.l;
    },
    set: function set$$1(value) {
      this.l = value;
    }
  }, {
    key: 'illuminant',
    get: function get$$1() {
      var scope = internal$10(this);
      return scope.illuminant;
    }
  }], [{
    key: 'fromRGB',
    value: function fromRGB(rgb) {
      var illuminant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Illuminant.D50;

      return this.fromXYZ(XYZ.fromRGB(rgb), illuminant);
    }
  }, {
    key: 'fromXYZ',
    value: function fromXYZ(xyz) {
      var illuminant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Illuminant.D50;

      // TODO
      var l = 116 * compand$2(xyz.y) - 16;
      var w = new Tristimulus(illuminant);
      var ucsW = ucs(w);

      var _ucs = ucs(xyz),
          _ucs$u = _ucs.u,
          u = _ucs$u === undefined ? ucsU : _ucs$u,
          _ucs$v = _ucs.v,
          v = _ucs$v === undefined ? ucsV : _ucs$v;

      return new this(l, 13 * l * (ucsU - ucsW.u), 13 * l * (ucsV - ucsW.v));
    }
  }]);
  return Luv;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$9 = Namespace('LCHuv');

var LCHuv = function () {
  // LCHuv([illuminant])
  // LCHuv(lightness [, illuminant]])
  // LCHuv(lightness, c, h [, illuminant])
  function LCHuv() {
    classCallCheck(this, LCHuv);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var rest = [].concat(args);
    var scope = internal$9(this);
    if (args[args.length - 1] instanceof Illuminant) {
      scope.illuminant = rest.pop();
    } else {
      scope.illuminant = Illuminant.D50;
    }
    if (rest.length === 0) {
      this.l = 0;
      this.c = 0;
      this.h = 0;
    } else if (rest.length === 1) {
      var _rest = slicedToArray(rest, 1),
          value = _rest[0];

      this.l = value || 0;
      this.c = 0;
      this.h = 0;
    } else {
      var _rest2 = slicedToArray(rest, 3),
          l = _rest2[0],
          c = _rest2[1],
          h = _rest2[2];

      this.l = l || 0;
      this.c = c || 0;
      this.h = h || 0;
    }
  }

  createClass(LCHuv, [{
    key: 'toRGB',
    value: function toRGB() {
      var primaries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Primaries.sRGB;

      return this.toLuv().toRGB(primaries);
    }
  }, {
    key: 'toLuv',
    value: function toLuv() {
      var l = this.l,
          c = this.c,
          h = this.h,
          illuminant = this.illuminant;

      return new Luv(l, c * Math.cos(h), c * Math.sin(h), illuminant);
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      return other.l === this.l && other.c === this.c && other.h === this.h;
    }
  }, {
    key: 'toArray',
    value: function toArray$$1() {
      return [this.l, this.c, this.h];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['l', 'c', 'h'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'lightness',
    get: function get$$1() {
      return this.l;
    },
    set: function set$$1(value) {
      this.l = value;
    }
  }, {
    key: 'chroma',
    get: function get$$1() {
      return this.c;
    },
    set: function set$$1(value) {
      this.c = value;
    }
  }, {
    key: 'hue',
    get: function get$$1() {
      return this.h;
    },
    set: function set$$1(value) {
      this.h = value;
    }
  }, {
    key: 'illuminant',
    get: function get$$1() {
      var scope = internal$9(this);
      return scope.illuminant;
    }
  }], [{
    key: 'fromRGB',
    value: function fromRGB(rgb) {
      var illuminant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Illuminant.D50;

      return this.fromLuv(Luv.fromRGB(rgb, illuminant));
    }
  }, {
    key: 'fromLuv',
    value: function fromLuv(luv) {
      var l = luv.l,
          u = luv.u,
          v = luv.v,
          illuminant = luv.illuminant;

      return new this(l, Math.sqrt(u * u + v * v), Math.atan2(v, u), illuminant);
    }
  }]);
  return LCHuv;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

function convertRGBToRYB(rgb) {
  var _rgb = slicedToArray(rgb, 3),
      r = _rgb[0],
      g = _rgb[1],
      b = _rgb[2];

  var white = Math.min(r, g, b);
  r -= white;
  g -= white;
  b -= white;
  var maxG = Math.max(r, g, b);
  var y = Math.min(r, g);
  r -= y;
  g -= y;
  if (b !== 0 && g !== 0) {
    b /= 2;
    g /= 2;
  }
  y += g;
  b += g;
  var maxY = Math.max(r, y, b);
  if (maxY !== 0) {
    var n = maxG / maxY;
    r *= n;
    y *= n;
    b *= n;
  }
  r += white;
  y += white;
  b += white;
  return [r, y, b];
}

function convertRYBToRGB(ryb) {
  var _ryb = slicedToArray(ryb, 3),
      r = _ryb[0],
      y = _ryb[1],
      b = _ryb[2];

  var white = Math.min(r, y, b);
  r -= white;
  y -= white;
  b -= white;
  var maxY = Math.max(r, y, b);
  var g = Math.min(y, b);
  y -= g;
  b -= g;
  if (b !== 0 && g !== 0) {
    b *= 2;
    g *= 2;
  }
  r += y;
  g += y;
  var maxG = Math.max(r, g, b);
  if (maxG !== 0) {
    var n = maxY / maxG;
    r *= n;
    g *= n;
    b *= n;
  }
  r += white;
  g += white;
  b += white;
  return [r, g, b];
}

var RYB = function () {
  // RGB([value])
  // RGB(red, yellow, blue)
  function RYB() {
    classCallCheck(this, RYB);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 0) {
      this.r = 0;
      this.y = 0;
      this.b = 0;
    } else if (args.length === 1) {
      var value = args[0];

      this.r = value || 0;
      this.y = value || 0;
      this.b = value || 0;
    } else {
      var r = args[0],
          y = args[1],
          b = args[2];

      this.r = r || 0;
      this.y = y || 0;
      this.b = b || 0;
    }
  }

  createClass(RYB, [{
    key: 'toRGB',
    value: function toRGB() {
      var primaries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Primaries.sRGB;

      return new (Function.prototype.bind.apply(RGB, [null].concat(toConsumableArray(convertRYBToRGB(this.toArray())), [primaries])))();
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      return other.r === this.r && other.y === this.y && other.b === this.b;
    }
  }, {
    key: 'toArray',
    value: function toArray$$1() {
      return [this.r, this.y, this.b];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return this.constructor.name + ' { ' + ['r', 'y', 'b'].map(function (name) {
        return name + ': ' + _this[name];
      }).join(', ') + ' }';
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'red',
    get: function get$$1() {
      return this.r;
    },
    set: function set$$1(value) {
      this.r = value;
    }
  }, {
    key: 'yellow',
    get: function get$$1() {
      return this.y;
    },
    set: function set$$1(value) {
      this.y = value;
    }
  }, {
    key: 'blue',
    get: function get$$1() {
      return this.b;
    },
    set: function set$$1(value) {
      this.b = value;
    }
  }], [{
    key: 'fromRGB',
    value: function fromRGB(rgb) {
      return new (Function.prototype.bind.apply(this, [null].concat(toConsumableArray(convertRGBToRYB(rgb.toArray())))))();
    }
  }]);
  return RYB;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

exports.ChromaticAdaptation = ChromaticAdaptation;
exports.Chromaticity = Chromaticity;
exports.HSL = HSL;
exports.HSV = HSV;
exports.Illuminant = Illuminant;
exports.Lab = Lab;
exports.LCHab = LCHab;
exports.LCHuv = LCHuv;
exports.Luv = Luv;
exports.Primaries = Primaries;
exports.RGB = RGB;
exports.RYB = RYB;
exports.Tristimulus = Tristimulus;
exports.XYZ = XYZ;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
