/**
 * Created by mendieta on 4/16/17.
 */

export default class Random {

    /**
     * The <code>Random.float</code> method returns Number value between a Minimum and a Maximum Number
     * @method getRandomNumber
     * @static
     * @public
     * @param {number} min The min number
     * @param {number} max The max number
     * @returns {number} the random number
     */
    static float(min, max) {
        return min + (Math.random() * (max - min));
    }

    /**
     * The <code>Random.int</code> method returns an int value between a Minimum and a Maximum int
     * @method getRandomInt
     * @static
     * @public
     * @param {number} min The min integer
     * @param {number} max The max integer
     * @returns {number} The random integer
     */
    static int(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return min + Math.floor(Math.random() * (max + 1 - min));
    }

    /**
     * Returns a random element from the Array
     * @method randomElement
     * @static
     * @param {Array} array The Array to extract a random element
     * @returns {Object} The extracted element
     * @public
     */
    element(array){
        if (array.length > 0) {
            return array[Math.floor(Math.random * array.length)];
        }
        return null;
    }

}
