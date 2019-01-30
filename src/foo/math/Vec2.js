/**
 * Created by mendieta on 4/16/17.
 */

export default class Vec2 {

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
     * Sets the x, y, and z component of the vector using two or three separate
     * variables or the data from a Vec2.
     * @method set
     * @param {number|Vec2} x
     * @param {number} [y]
     * @return Vec2
     */
    set(x, y) {
        if (x instanceof Vec2) {
            this.x = x.x;
            this.y = x.y;
            return this;
        }
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * Adds x and y components to a vector or adds one vector to another.
     * @method add
     * @param {Number|Vec2} x
     * @param {Number} [y]
     * @return {Vec2}
     */
    add(x, y) {
        if (x instanceof Vec2) {
            this.x += x.x;
            this.y *= x.y;
            return this;
        }
        this.x += x;
        this.y += y;
        return this;
    }

    /**
     * Adds components of two vectors to the current vector.
     * @method addVectors
     * @param {Vec2} vectorA
     * @param {Vec2} vectorB
     * @return {Vec2}
     */
    addVectors(vectorA, vectorB) {
        this.x = vectorA.x + vectorB.x;
        this.y = vectorA.y + vectorB.y;
        return this;
    }

    /**
     * Subtracts x and y components from a vector or subtracts one vector from another.
     * @method subtract
     * @param {Number|Vec2} x
     * @param {Number} [y]
     * @return {Vec2}
     */
    subtract(x, y) {
        if (x instanceof Vec2) {
            this.x -= x.x;
            this.y -= x.y;
            return this;
        }
        this.x -= x;
        this.y -= y;
        return this;
    }

    /**
     * Subtracts components of two vectors to the current vector.
     * @method subtractVectors
     * @param {Vec2} vectorA
     * @param {Vec2} vectorB
     * @return {Vec2}
     */
    subtractVectors(vectorA, vectorB) {
        this.x = vectorA.x - vectorB.x;
        this.y = vectorB.y - vectorB.y;
        return this;
    }

    /**
     * Multiply the vector by a scalar.
     * @method multiply
     * @param {number} scalar[default=0] The number to multiply with the vector
     * @return {Vec2}
     */

    multiply(scalar = 0) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Divide the vector by a scalar.
     * @param {Number} scalar
     * @return {Vec2}
     */
    divide(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    /**
     *
     * @param {Vec2} vector
     * @return {Vec2}
     */
    min(vector) {
        this.x = Math.min(this.x, vector.x);
        this.y = Math.min(this.y, vector.y);
        return this;
    }

    /**
     *
     * @param {Vec2} vector
     * @return {Vec2}
     */
    max(vector) {
        this.x = Math.max(this.x, vector.x);
        this.y = Math.max(this.y, vector.y);
        return this;
    }

    /**
     * Normalize the vector to length 1 (make it a unit vector).
     * @method normalize
     * @return {Vec2}
     */
    normalize() {
        return this.magnitude === 0 ? this : this.divide(this.magnitude);
    }

    /**
     * Limit the magnitude of this vector to the value used for the <b>max</b> parameter.
     * @method limit
     * @param {Number} max
     * @return {Vec2}
     */
    limit(max) {
        const magnitudeSquared = this.magnitude;
        if (magnitudeSquared > max * max) {
            this.divide(Math.sqrt(magnitudeSquared));
            this.multiply(max);
        }
        return this;
    }

    /**
     * This function assumes min < max, if this assumption isn't true it will not operate correctly
     * @param {Vec2} min
     * @param {Vec2} max
     * @return {Vec2}
     */
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        return this;
    }

    /**
     *
     * @return {Vec2}
     */
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    /**
     *
     * @return {Vec2}
     */
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }

    /**
     *
     * @return {Vec2}
     */
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    /**
     *
     * @return {Vec2}
     */
    roundToZero() {
        this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
        return this;
    }

    /**
     *
     * @return {Vec2}
     */
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    /**
     * Calculates the dot product of two vectors.
     * @method dot
     * @param {Vec2} vector
     * @return {number}
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * Calculates the magnitude (length) of the vector and returns the result as
     * a float (this is simply the equation sqrt(x*x + y*y).)
     * @property magnitude
     * @getter
     * @return {Number}
     */
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Set the magnitude of this vector to the value used for the <b>value</b> parameter.
     * @setter
     * @param {Number} value
     */
    set magnitude(value) {
        this.normalize().multiply(value);
    }

    /**
     * @method vectorTo
     * @param {Vec2} vector
     * @return {Vec2}
     */
    vectorTo(vector) {
        return new Vec2(vector.x - this.x, vector.y - this.y);
    }

    /**
     * @method getAngle
     * @return {number}
     */
    getAngle() {
        let angle = Math.atan2(this.y, this.x);
        if (angle < 0) angle += 2 * Math.PI;
        return angle;
    }

    /**
     * @method getAngleDegrees
     * @return {number}
     */
    getAngleDegrees() {
        return this.getAngle() * 180 / Math.PI;
    }

    /**
     * Calculates the Euclidean distance between two points (considering a point as a vector object).
     * @method distanceTo
     * @param {Vec2} vector
     * @return {number}
     */
    distanceTo(vector) {
        return Math.sqrt(this.distanceToSquared(vector));
    }

    /**
     * @method distanceToSquared
     * @param {Vec2} vector
     * @return {number}
     */
    distanceToSquared(vector) {
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;
        return dx * dx + dy * dy;
    }

    /**
     * Rotate the vector by an angle, magnitude remains the same.
     * @method rotate
     * @param {Number} angle
     * @return {Vec2}
     */
    rotate(angle) {
        const newAngle = this.getAngle() + angle;
        this.x = Math.cos(newAngle) * this.magnitude;
        this.y = Math.sin(newAngle) * this.magnitude;
        return this;
    }

    lerp(){

    }

    /**
     *
     * @param {Vec2} center
     * @param {number} angle
     * @return {Vec2}
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
     * @return {Vec2}
     */
    jitter(jitterAmount) {
        return new Vec2(
            this.x + this.x * jitterAmount * Math.random(),
            this.y + this.y * jitterAmount * Math.random()
        );
    }

    /**
     * Gets a copy of the vector, returns a Vec2 object.
     * @method copy
     * @return {Vec2}
     */
    clone() {
        return new Vec2(this.x, this.y);
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
     * @param {Vec2} vector
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
     * @return {Vec2}
     */
    static fromAngle(angle, magnitude) {
        return new Vec2(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
    }

    /**
     *
     * @param {string} string
     * @return {Vec2}
     */
    static fromString(string) {
        const parts = string.split(',');
        return new Vec2(parseFloat(parts[0]), parseFloat(parts[1]));
    }

    /**
     * @static
     * @param {Array} array
     * @param {number} offset
     * @return {Vec2}
     */
    static fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    }

}
