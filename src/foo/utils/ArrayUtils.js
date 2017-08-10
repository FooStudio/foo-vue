/**
* Checks if an array contains a specific value
* @param {Array} array The Array to be searched
* @param {object} value The value to be looked for
* @returns {boolean} A boolean determining if the value is in the Array
*/
export function contains(array, value) {
    return (array.indexOf(value) !== -1);
}

/**
     * Checks if an element in the array has a field with a specific value
     * @param {Array} array The array to be searched
     * @param {string} field The field on the Array to be searched
     * @param {Object} value The value the field must have
     * @return {boolean} A boolean determining if the value is in the Array
     */
export function inArrayField(array, field, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][field] === value) return true;
    }
    return false;
}

/**
     * Shuffles an array (sort random)
     * @param {Array} array Array to shuffle
     * @param {boolean} modify[default=false] Modify passed array
     * @return {Array}
     */
export function shuffle(array, modify = false) {
    let isView = ArrayBuffer && ArrayBuffer.isView && ArrayBuffer.isView(array);
    array = modify || isView ? array : array.slice();
    let rnd = array.length;
    let tmp = array.length;
    let idx = array.length;
    while (idx > 1) {
        rnd = Math.random() * idx | 0;
        tmp = array[--idx];
        array[idx] = array[rnd];
        array[rnd] = tmp;
    }
    return array;
}

/**
     * Copies the source to the target array, without removing the reference
     * @param {Array} array The Array to be copied
     * @param {Array} target The Array to copy the supplied Array
     * @returns {void}
     */
export function copy(array, target) {
    const length = target.length = array.length;
    for (let i = 0; i < length; i++) {
        target[i] = array[i];
    }
}

/**
     * Recursively clone an Array and its subArray (doesn't clone content objects)
     * @param {Array} array The Array to be cloned
     * @return {Array} the cloned Array
     */
export function deepArrayClone(array) {
    let ret = array.concat();
    let iLim = ret.length;
    let i;
    for (i = 0; i < iLim; i++) {
        ret[i] = deepArrayClone(ret[i]);
    }
    return ret;
}

/**
 * Calculates the average value of all elements in an array.
 * Works only for array with numeric values
 * @param {Array} array The array to get the average value
 * @return {number} The average value
 */
export function average(array) {
    if (array === null || array.length === 0) return NaN;
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total / array.length;
}

/**
     * Remove all instances of the specified value from the array
     * @param {Array} array The Array t removed elements from
     * @param {object} value The value to be removed
     * @return {number} The number of removed items
     */
export function removeValueFromArray(array, value) {
    let total = 0;
    for (let i = array.length; i > -1; i--) {
        if (array[i] === value) {
            array.splice(i, 1);
            total++;
        }
    }
    return total;
}

/**
 * Removes a single (first occurring) value from an Array
 * @param {Array} array The array to remove the element
 * @param {object} value The value to be removed
 * @returns {boolean} A boolean which indicates if a value was removed
 */
export function removeValueFromArrayOnce(array, value) {
    let len = array.length;
    for (let i = len; i > -1; i--) {
        if (array[i] === value) {
            array.splice(i, 1);
            return true;
        }
    }
    return false;
}

/**
     * Creates a copy of the specified Array.
     *
     * Note that the array returned is a new array but the items are not copies of the items in the original array,
     * just references to the same items.
     * @param {Array} array The Array to be cloned
     * @return {Array} The cloned Array
     */
export function clone(array) {
    return array.slice(0, array.length);
}

/**
     * Compares two arrays and returns a boolean indicating whether the arrays contain the same values at the same indexes
     * @param {Array} array1 An Array to compare
     * @param {Array} array2 An Array to compare
     * @return {boolean} A boolean determining if the two Arrays were equal
     */
export function areEqual(array1, array2) {
    if (array1 === array2) {
        return true;
    }
    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = array1.length - 1; i >= 0; i--) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

/**
    * Return the amount of (not empty) items in an Array
    * @param {Array} array The Array to be evaluated
    * @return {number} The amount of not empty items
    */
export function filledLength(array) {
    let length = 0;
    let leni = array.length;
    for (let i = 0; i < leni; i++) {
        if (array[i] !== undefined) length++;
    }
    return length;
}

/**
     * Returns the items that are unique in the first array
     * @param {Array} array1 The array to be evaluated
     * @param {Array} array2 The second array to be evaluated
     * @return {Array} The resulting array with the items unique in first array
     */
export function getUniqueFirst(array1, array2) {
    let ret = [];
    for (let i = 0; i < array1.length; i++) {
        if (array2.indexOf(array1[i]) === -1) ret.push(array1[i]);
    }
    return ret;
}

/**
     * Adds elements to an Array the amount of times specified
     * @param {object} element The element to be added
     * @param {number} [amount=1] The amount of times to be added
     * @param {Array} [array] The Array to add elements
     * @return {Array} The Array with the added elements
     */
export function addElements(element, amount = 1, array = []) {
    for (let i = 0; i < amount; i++) {
        array.push(element);
    }
    return array;
}

/**
     * Returns an new Array from an Array without the empty elements
     * @param {Array} array The Array to remove empty elements from
     * @return {Array} The new Array without empty elements
     */
export function removeEmptyElements(array) {
    let results = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== "" && array[i] !== null && array[i] !== undefined) results.push(array[i]);
    }
    return results;
}

export default {
    copy,
    shuffle,
    contains,
    inArrayField,
    deepArrayClone,
    average,
    removeValueFromArray,
    removeValueFromArrayOnce,
    clone,
    areEqual,
    filledLength,
    getUniqueFirst,
    addElements,
    removeEmptyElements,
}

