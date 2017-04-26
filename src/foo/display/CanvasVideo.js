/**
 * Created by mendieta on 4/16/17.
 */

import Video from "../media/Video";

export default class CanvasVideo extends Video {
    /**
     *
     * @param {CanvasRenderingContext2D}ctx
     * @param {string} url
     */
    constructor(ctx, url) {
        super(url);
        this.videoTexture = ctx.createTexture2D(null, 1, 1);
    }

    update() {
        if (this.video.currentTime > 0) {
            this.videoTexture.update(this.video, this.video.videoWidth, this.video.videoHeight);
        }
    }

    getTexture() {
        return this.videoTexture;
    }
}
