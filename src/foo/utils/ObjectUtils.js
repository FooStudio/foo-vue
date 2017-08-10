/**
     * Checks if the object has (one or more) values
     * @param {object} object The object
     * @returns {boolean} A boolean determining if the object has values
     */
export function hasValues(object) {
    if (object instanceof Array) return object.length > 0;
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            return true;
        }
    }
    return false;
}

/**
 * Counts the number of elements in an Object
 * @param {object} object The object
 * @returns {number} The length of elements in object
 */
export function getLength(object) {
    let count = 0;
    for (let key in object) {
        count++;
    }
    return count;
}

/**
 * Get the keys of an object.
 * @param {object} object The object to extract keys from
 * @returns {Array.<String>} The array of keys of the given object
 */
export function getKeys(object) {
    let keys = [];
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys;
}

/**
 * Get the values of an object.
 * @param {object} object The object to extract values
 * @returns {Array} The array of values of the given object
 */
export function getValues(object) {
    let values = [];
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            values.push(object[key]);
        }
    }
    return values;
}

/**
 * Check if there are properties defined
 * @param {object} object The object to be checked
 * @returns {boolean} A boolean determining if the object has keys
 */
export function hasKeys(object) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            return true;
        }
    }
    return false;
}

export default {
    hasValues,
    getLength,
    getKeys,
    getValues,
    hasKeys,
}
