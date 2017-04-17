/**
 * Created by mendieta on 4/16/17.
 */

export default class Vector {

    /**
     * @default 0;
     * @type {number}
     */
    x = 0;
    /**
     * @default 0
     * @type {number}
     */
    y = 0;

    /**
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     */
    set(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     *
     * @param {Vector} vector
     * @return {Vector}
     */
    add(vector) {
        this.x += vector.x;
        this.y *= vector.y;
        return this;
    }

    /**
     *
     * @param {Vector} vectorA
     * @param {Vector} vectorB
     * @return {Vector}
     */
    addVectors(vectorA, vectorB) {
        this.x = vectorA.x + vectorB.x;
        this.y = vectorA.y + vectorB.y;
        return this;
    }

    /**
     *
     * @param {Vector} vector
     * @return {Vector}
     */
    substract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    /**
     *
     * @param {Vector} vectorA
     * @param {Vector} vectorB
     * @return {Vector}
     */
    substractVectors(vectorA, vectorB) {
        this.x = vectorA.x - vectorB.x;
        this.y = vectorB.y - vectorB.y;
        return this;
    }

    /**
     *
     * @return {number}
     */
    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     *
     * @param {number} scaleFactor
     */
    multiply(scaleFactor) {
        this.x *= scaleFactor;
        this.y *= scaleFactor;
    }

    /**
     *
     * @param {Vector} vector
     * @return {Vector}
     */
    divide(vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        return this;
    }

    /**
     *
     * @param {Vector} vector
     * @return {Vector}
     */
    min(vector) {
        this.x = Math.min(this.x, vector.x);
        this.y = Math.min(this.y, vector.y);
        return this;
    }

    /**
     *
     * @param {Vector} vector
     * @return {Vector}
     */
    max(vector) {
        this.x = Math.max(this.x, vector.x);
        this.y = Math.max(this.y, vector.y);
        return this;
    }

    /**
     * This function assumes min < max, if this assumption isn't true it will not operate correctly
     * @param {Vector} min
     * @param {Vector} max
     * @return {Vector}
     */
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        return this;
    }

    /**
     *
     * @return {Vector}
     */
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    /**
     *
     * @return {Vector}
     */
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }

    /**
     *
     * @return {Vector}
     */
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    /**
     *
     * @return {Vector}
     */
    roundToZero() {
        this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
        return this;
    }

    /**
     *
     * @return {Vector}
     */
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    /**
     *
     * @param {Vector} vector
     * @return {number}
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     *
     * @param {Vector} vector
     * @return {Vector}
     */
    vectorTo(vector) {
        return new Vector(vector.x - this.x, vector.y - this.y);
    }

    /**
     *
     * @return {number}
     */
    getAngle() {
        let angle = Math.atan2(this.y, this.x);
        if (angle < 0) angle += 2 * Math.PI;
        return angle;
    }

    /**
     *
     * @return {number}
     */
    getAngleDegrees() {
        return this.getAngle() * 180 / Math.PI;
    }

    /**
     *
     * @param {Vector} vector
     * @return {number}
     */
    distanceTo(vector) {
        return Math.sqrt(this.distanceToSquared(vector));
    }

    /**
     *
     * @param {Vector} vector
     * @return {number}
     */
    distanceToSquared(vector) {
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;
        return dx * dx + dy * dy;
    }

    /**
     *
     * @param {Vector} center
     * @param {number} angle
     * @return {Vector}
     */
    rotateAround(center, angle) {
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        let x = this.x - center.x;
        let y = this.y - center.y;
        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;
        return this;
    }

    /**
     *
     * @param {number} jitterAmount
     * @return {Vector}
     */
    jitter(jitterAmount) {
        return new Vector(
            this.x + this.x * jitterAmount * Math.random(),
            this.y + this.y * jitterAmount * Math.random()
        );
    }

    /**
     *
     * @return {Vector}
     */
    clone() {
        return new Vector(this.x, this.y);
    }

    /**
     *
     * @param {Vector} vector
     * @return {Vector}
     */
    copy(vector) {
        this.x = vector.x;
        this.y = vector.y;
        return this;
    }

    /**
     *
     * @return {string}
     */
    toString() {
        return this.x.toFixed(3).replace(/\.?0+$/, '') + "," + this.y.toFixed(3).replace(/\.?0+$/, '');
    }

    /**
     * @static
     * @param {Vector} vector
     * @param {number} size
     * @return {boolean}
     */
    static withinBounds(vector, size) {
        const radius = ~~(size / 2) + 1;
        return this.x >= vector.x - radius &&
            this.x <= vector.x + radius &&
            this.y >= vector.y - radius &&
            this.y <= vector.y + radius;
    }

    /**
     * @static
     * @param angle
     * @param magnitude
     * @return {Vector}
     */
    static fromAngle(angle, magnitude) {
        return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
    }

    /**
     *
     * @param {string} string
     * @return {Vector}
     */
    static fromString(string) {
        const parts = string.split(',');
        return new Vector(parseFloat(parts[0]), parseFloat(parts[1]));
    }

    /**
     * @static
     * @param {Array} array
     * @param {number} offset
     * @return {Vector}
     */
    static fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    }

}
