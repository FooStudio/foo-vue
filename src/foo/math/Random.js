/**
 * Created by mendieta on 4/16/17.
 */

/**
* The <code>Random.randomFloat</code> method returns Number value between a Minimum and a Maximum Number
* @method randomFloat
* @static
* @public
* @param {number} min The min number
* @param {number} max The max number
* @returns {number} the random number
*/
export function randomFloat(min, max) {
    return min + (Math.random() * (max - min));
}

/**
* The <code>Random.randomInt</code> method returns an int value between a Minimum and a Maximum int
* @method randomInt
* @static
* @public
* @param {number} min The min integer
* @param {number} max The max integer
* @returns {number} The random integer
*/
export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return min + Math.floor(Math.random() * (max + 1 - min));
}

/**
* Returns a random element from the Array
* @method randomElement
* @static
* @param {Array} array The Array to extract a random element
* @returns {Object|Null} The extracted element
* @public
*/
export function randomElement(array) {
    if (array.length > 0) {
        return array[Math.floor(Math.random * array.length)];
    }
    return null;
}

export default {
    randomFloat,
    randomInt,
    randomElement
}
