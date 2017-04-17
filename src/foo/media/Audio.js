/**
 * Created by mendieta on 4/16/17.
 */

export default class Audio {

    /**
     *
     * @type {boolean}
     */
    playing = false;

    /**
     *
     * @param {string} url
     */
    constructor(url) {
        /**
         *
         * @type {Element}
         */
        this.audio = new window.Audio();
        this.audio.src = url;
        this.initListeners();
    }

    /**
     * @private
     * @method initListeners
     */
    initListeners() {
        this.audio.onended = this.onAudioEnded.bind(this);
    }

    /**
     * @private
     * @method onAudioEnded
     */
    onAudioEnded() {
        this.playing = false;
    }

    /**
     *
     * @return {number}
     */
    get volume() {
        return this.audio.volume;
    }

    /**
     *
     * @param {number} value
     */
    set volume(value) {
        this.audio.volume = value;
    }

    /**
     *
     * @return {boolean}
     */
    get isPlaying() {
        return this.playing;
    }

    /**
     *
     * @return {number}
     */
    get currentTime() {
        return this.audio.currentTime;
    }

    /**
     *
     * @param {number} value
     */
    set currentTime(value) {
        this.audio.currentTime = value;
    }

    /**
     *
     * @return {number}
     */
    get duration() {
        return this.audio.duration || 0;
    }

    /**
     *
     * @return {boolean}
     */
    get loop() {
        return this.audio.loop;
    }

    /**
     *
     * @param {boolean} value
     */
    set loop(value) {
        this.audio.loop = value;
    }

    /**
     * @public
     * @method play
     */
    play() {
        this.audio.play();
        this.playing = true;
    }

    /**
     * @public
     * @method pause
     */
    pause() {
        this.audio.pause();
        this.playing = false;
    }

    /**
     * @public
     * @method destroy
     */
    destroy() {
        this.audio.onended = null;
        this.audio = null;
    }
}
