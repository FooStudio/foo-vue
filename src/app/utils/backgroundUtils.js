/**
 * @typedef Rect
 * @prop {Number} width
 * @prop {Number} height
 * @prop {Number} top
 * @prop {Number} right
 * @prop {Number} bottom
 * @prop {Number} left
 */

/**
 * @private
 * @param {Number} tw - targetWidth
 * @param {Number} th - targetHeight
 * @param {Number} cw - containerWidth
 * @param {Number} ch - containerHeight
 * @returns {Rect}
 */
function _getRect(tw, th, cw, ch, ratio) {
    const rect = {};
    rect.width = Math.round(tw * ratio);
    rect.height = Math.round(th * ratio);
    rect.top = (ch - rect.height) / 2;
    rect.left = (cw - rect.width) / 2;
    return rect;
}

/**
 * @param {Number} tw - targetWidth
 * @param {Number} th - targetHeight
 * @param {Number} cw - containerWidth
 * @param {Number} ch - containerHeight
 * @returns {Rect}
 */
export function getCoverRect(tw, th, cw, ch) {
    const ratio = Math.max(cw / tw, ch / th);
    return _getRect(tw, th, cw, ch, ratio);
}

/**
 * @param {Number} tw - targetWidth
 * @param {Number} th - targetHeight
 * @param {Number} cw - containerWidth
 * @param {Number} ch - containerHeight
 * @returns {Rect}
 */
export function getContainRect(tw, th, cw, ch) {
    const ratio = Math.min(cw / tw, ch / th);
    return _getRect(tw, th, cw, ch, ratio);
}
