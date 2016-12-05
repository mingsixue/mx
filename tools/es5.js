/******************************
** 文件描述 :  ES5兼容实现
*******************************/
/***** Array *****/
if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
        var k;

        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var O = Object(this);
        var len = O.length >>> 0;

        if (len === 0) {
            return -1;
        }

        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }

        if (n >= len) {
            return -1;
        }

        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        while (k < len) {
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}

if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
        'use strict';

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var n, k,
            t = Object(this),
            len = t.length >>> 0;

        if (len === 0) {
            return -1;
        }

        n = len - 1;

        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) {
                n = 0;
            } else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }

        for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}

if (!Array.prototype.every) {
    Array.prototype.every = function(fun /*, thisArg*/) {
        'use strict';

        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;

        if (typeof fun !== 'function')
            throw new TypeError();

        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t && !fun.call(thisArg, t[i], i, t))
                return false;
        }

        return true;
    };
}

if (!Array.prototype.some) {
    Array.prototype.some = function(fun /*, thisArg */) {
        'use strict';

        if (this === void 0 || this === null)
        throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;

        if (typeof fun !== 'function')
            throw new TypeError();

        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(thisArg, t[i], i, t))
            return true;
        }

        return false;
    };
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
        var T, k;

        if (this === null) {
            throw new TypeError(' this is null or not defined');
        }

        var O = Object(this);
        var len = O.length >>> 0;

        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) {
            T = thisArg;
        }

        k = 0;

        while (k < len) {

            var kValue;

            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {
        var T, A, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        var O = Object(this);
        var len = O.length >>> 0;

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) {
            T = thisArg;
        }

        A = new Array(len);

        k = 0;

        while (k < len) {
            var kValue, mappedValue;

            if (k in O) {
                kValue = O[k];
                mappedValue = callback.call(T, kValue, k, O);
                A[k] = mappedValue;
            }

            k++;
        }

        return A;
    };
}
