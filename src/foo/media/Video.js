/**
 * Created by mendieta on 4/16/17.
 */

export default class Video {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        /**
         *
         * @type {HTMLVideoElement}
         */
        this.video = document.createElement("video");
        this.video.autoplay = true;
        this.video.loop = true;
        this.video.volume = 0;
        this.video.src = url;
    }

    /**
     *
     * @return {string}
     */
    get src() {
        return this.video.src;
    }

    /**
     *
     * @param {string} value
     */
    set src(value) {
        this.video.src = value;
    }
}
