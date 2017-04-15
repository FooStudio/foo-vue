/* eslint-disable */
/**
 * Created by mendieta on 1/5/17.
 */

function Polyfills() {

    //ARRAY INCLUDES
    if (!Array.prototype.includes) {
        Array.prototype.includes = function (searchElement /*, fromIndex*/) {
            'use strict';
            let O = Object(this);
            let len = parseInt(O.length) || 0;
            if (len === 0) {
                return false;
            }
            let n = parseInt(arguments[1]) || 0;
            let k;
            if (n >= 0) {
                k = n;
            } else {
                k = len + n;
                if (k < 0) {
                    k = 0;
                }
            }
            let currentElement;
            while (k < len) {
                currentElement = O[k];
                if (searchElement === currentElement ||
                    (searchElement !== searchElement && currentElement !== currentElement)) {
                    return true;
                }
                k++;
            }
            return false;
        };
    }

}

module.exports = Polyfills;
