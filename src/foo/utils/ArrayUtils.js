/**
 * Helper Class to work with Arrays
 *
 *      import ArrayUtils from "foo/utils/types/ArrayUtils"
 *
 *      let arr = [10, 20, 30, 40];
 *
 *      let resultArray = ArrayUtils.contains(40);
 *
 *      console.log(resultArray); // true
 *
 * @module foo
 * @namespace utils
 * @class ArrayUtils
 */
export default class ArrayUtils {

    /**
     * Checks if an array contains a specific value
     * @param {Array} array The Array to be searched
     * @param {object} value The value to be looked for
     * @returns {boolean} A boolean determining if the value is in the Array
     * @method contains
     * @public
     * @static
     */
    static contains(array, value) {
        return (array.indexOf(value) !== -1);
    }

    /**
     * Checks if an element in the array has a field with a specific value
     * @param {Array} array The array to be searched
     * @param {string} field The field on the Array to be searched
     * @param {Object} value The value the field must have
     * @return {boolean} A boolean determining if the value is in the Array
     * @method inArrayField
     * @static
     * @public
     */
    static inArrayField(array, field, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][field] === value) return true;
        }
        return false;
    }

    /**
     * Shuffles an array (sort random)
     * @static
     * @public
     * @method shuffle
     * @param {Array} array The Array to be shuffled
     * @returns {void}
     */
    static shuffle(array) {
        let i = array.length;
        if (i === 0) {
            return;
        }
        let j;
        let temp;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    /**
     * Copies the source to the target array, without removing the reference
     *
     * @method copy
     * @static
     * @public
     * @param {Array} array The Array to be copied
     * @param {Array} target The Array to copy the supplied Array
     * @returns {void}
     */
    static copy(array, target) {
        let leni = target.length = array.length;
        for (let i = 0; i < leni; i++) {
            target[i] = array[i];
        }
    }

    /**
     * Recursively clone an Array and its subArray (doesn't clone content objects)
     * @method deepArrayClone
     * @static
     * @public
     * @param {Array} array The Array to be cloned
     * @return {Array} the cloned Array
     */
    static deepArrayClone(array) {
        let ret = array.concat();
        let iLim = ret.length;
        let i;
        for (i = 0; i < iLim; i++) {
            ret[i] = ArrayUtils.deepArrayClone(ret[i]);
        }
        return ret;
    }

    /**
     * Calculates the average value of all elements in an array.
     * Works only for array with numeric values
     * @method average
     * @static
     * @public
     * @param {Array} array The array to get the average value
     * @return {number} The average value
     */
    static average(array) {
        if (array === null || array.length === 0) return NaN;
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += array[i];
        }
        return total / array.length;
    }

    /**
     * Remove all instances of the specified value from the array
     * @method removeValueFromArray
     * @static
     * @public
     * @param {Array} array The Array t removed elements from
     * @param {object} value The value to be removed
     * @return {number} The number of removed items
     */
    static removeValueFromArray(array, value) {
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
     * @method removeValueFromArrayOnce
     * @static
     * @public
     * @param {Array} array The array to remove the element
     * @param {object} value The value to be removed
     * @returns {boolean} A boolean which indicates if a value was removed
     */
    static removeValueFromArrayOnce(array, value) {
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
     * @method clone
     * @static
     * @public
     * @param {Array} array The Array to be cloned
     * @return {Array} The cloned Array
     */
    static clone(array) {
        return array.slice(0, array.length);
    }

    /**
     * Compares two arrays and returns a boolean indicating whether the arrays contain the same values at the same indexes
     * @method areEqual
     * @static
     * @public
     * @param {Array} array1 An Array to compare
     * @param {Array} array2 An Array to compare
     * @return {boolean} A boolean determining if the two Arrays were equal
     */
    static areEqual(array1, array2) {
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
     * @method filledLength
     * @static
     * @public
     * @param {Array} array The Array to be evaluated
     * @return {number} The amount of not empty items
     */
    static filledLength(array) {
        let length = 0;
        let leni = array.length;
        for (let i = 0; i < leni; i++) {
            if (array[i] !== undefined) length++;
        }
        return length;
    }

    /**
     * Returns the items that are unique in the first array
     * @method getUniqueFirst
     * @static
     * @public
     * @param {Array} array1 The array to be evaluated
     * @param {Array} array2 The second array to be evaluated
     * @return {Array} The resulting array with the items unique in first array
     */
    static getUniqueFirst(array1, array2) {
        let ret = [];
        for (let i = 0; i < array1.length; i++) {
            if (array2.indexOf(array1[i]) === -1) ret.push(array1[i]);
        }
        return ret;
    }

    /**
     * Returns the items that are in both arrays.
     * @method intersect
     * @static
     * @public
     * @param {Array} array1 The Array to be evaluated
     * @param {Array} array2 The array to be evaluated
     * @return {Array} The resulting array
     */
    static intersect(array1, array2) {
        let ret = [];
        let i;

        for (i = 0; i < array1.length; i++) {
            if (array2.indexOf(array1[i]) !== -1) ret.push(array1[i]);
        }
        for (i = 0; i < array2.length; i++) {
            if (array1.indexOf(array2[i]) !== -1) ret.push(array2[i]);
        }

        ret = ArrayUtils.createUniqueCopy(ret);

        return ret;
    }

    /**
     * Adds elements to an Array the amount of times specified
     * @method addElements
     * @static
     * @public
     * @param {object} element The element to be added
     * @param {number} [amount=1] The amount of times to be added
     * @param {Array} [array] The Array to add elements
     * @return {Array} The Array with the added elements
     */
    static addElements(element, amount = 1, array = []) {
        for (let i = 0; i < amount; i++) {
            array.push(element);
        }
        return array;
    }

    /**
     * Returns an new Array from an Array without the empty elements
     * @method removeEmptyElements
     * @static
     * @public
     * @param {Array} array The Array to remove empty elements from
     * @return {Array} The new Array without empty elements
     */
    static removeEmptyElements(array) {
        let results = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] !== "" && array[i] !== null && array[i] !== undefined) results.push(array[i]);
        }
        return results;
    }
}

