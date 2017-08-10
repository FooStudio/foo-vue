/**
     * Calculates the angle of a vector.
     * @param {number} x the x component of the vector
     * @param {number} y the y component of the vector
     * @returns {number} The the angle of the passed vector in degrees.
     */
export function getVectorAngle(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * Calculates the angle between two points.
 * @param {object} p1
 * @param {object} p2
 * @return {number}
 */
export function getPointsAngle(p1 = { x: 0, y: 0 }, p2 = { x: 0, y: 0 }) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}

/**
 *
 * @param probability specified probability (0 to 1) that the random "event" occurs
 * @return {boolean}
 */
export function chance(probability) {
    return (Math.random() <= probability);
}

/**
 * The <code>normalize</code> method
 * @param {number} value The value
 * @param {number} min The min value
 * @param {number} max The max value
 * @returns {number} the normalize result
 */
export function normalize(value, min, max) {
    return (value - min) / (max - min);
}

/**
 * The <code>interpolate</code> method
 * @param {number} value The value
 * @param {number} min The min value
 * @param {number} max the max value
 * @returns {number} The interpolation result
 */
export function interpolate(value, min, max) {
    return min + (max - min) * value;
}

/**
 * The <code>map</code> method
 * @param {number} value The value
 * @param {number} min1 The min 1 value
 * @param {number} max1 The max 1 value
 * @param {number} min2 The min 2 value
 * @param {number} max2 the max 2 value
 * @returns {number} The map result
 */
export function map(value, min1, max1, min2, max2) {
    return interpolate(normalize(value, min1, max1), min2, max2);
}

/**
 * The <code>findPreferredRatio</code> is used to find the correct ratio to fit content in a container using a maximum area.
 * @param {number} width The width
 * @param {number} height The height
 * @param {number} maxWidth The max width
 * @param {number} maxHeight The max height
 * @returns {number} The preferred radio
 */
export function findPreferredRatio(width, height, maxWidth, maxHeight) {
    let dw = maxWidth / width;
    let dh = maxHeight / height;
    return dw < dh ? dw : dh;
}

/**
 * The <code>limit()</code> method checks if a given value is within a specific range.
 *  It returns the value if it's within the range.
 *  It returns the min/max value if the value is lower/higher than the min/max.
 * @param {number} value The value
 * @param {number} min The min value
 * @param {number} max The max value
 * @returns {number} The number limited
 */
export function limit(value, min, max) {
    return Math.min(Math.max(min, value), max);
}

/**
 * The <code>roundNumber()</code> method
 * @param {number} val Specifies the Number to round.
 * @param {number} [digits=0] Specifies the digits after the comma.
 * @returns {number} The number rounbded
 */
export function roundNumber(val, digits = 0) {
    let factor = Math.pow(10, digits);
    return Math.round(val * factor) / factor;
}

/**
 * The <code>degreesToRadians()</code> method calculates degrees to radians
 * @param {number} degrees The degrees to be transformed
 * @returns {number} The angle in radians
 */
export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * The <code>degreesToRadians()</code> method calculates degrees to radians
 * @param {number} radians the radians to be transformed
 * @returns {number} The angle in degrees
 */
export function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

export default {
    getVectorAngle,
    getPointsAngle,
    chance,
    normalize,
    interpolate,
    map,
    findPreferredRatio,
    limit,
    roundNumber,
    degreesToRadians,
    radiansToDegrees,
}
