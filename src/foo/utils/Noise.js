/**
 * Created by Erick Bazán <https://github.com/amorino>
 * Retina rendering by Mendieta <https://github.com/mendieta>
 */

export default class Noise {
    /**
     * @default 0
     * @type {number}
     */
    width = 0;

    /**
     * @default 0
     * @type {number}
     */
    height = 0;

    /**
     * @type {number}
     */
    globalAlpha = 0.08;

    /**
     * @default 256
     * @type {number}
     */
    tile = 256;

    /**
     * @default false
     * @type {boolean}
     */
    destroyed = false;

    /**
     * @type {HTMLElement}
     */
    container = null;

    /**
     * @type {HTMLCanvasElement}
     */
    canvas = null;

    /**
     * @type {HTMLCanvasElement}
     */
    ref = null;

    /**
     * @type {CanvasRenderingContext2D}
     */
    ctx = null;

    /**
     * @param {{container: HTMLElement, tile: number, globalAlpha:number}} data
     */
    constructor({container, tile = 256, globalAlpha = 0.08}) {
        if (!container) throw new Error("You must pass a container DOM element");
        this.container = container;
        this.canvas = document.createElement("canvas");
        this.canvas.style.position = "absolute";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.top = 0;
        this.canvas.style.left = 0;
        this.container.appendChild(this.canvas);
        this.ref = document.createElement("canvas");
        this.tile = tile;
        this.globalAlpha = globalAlpha;
        this.init();
    }

    init() {
        this._ready();
        this._setupRender();
        this._mount();
    }

    /**
     * @return {Noise}
     * @private
     */
    _ready() {
        this.width = this.container.offsetWidth * window.devicePixelRatio;
        this.height = this.container.offsetHeight * window.devicePixelRatio;
        this.ref.width = this.ref.height = this.tile;
        return this;
    }

    /**
     * @return {Noise}
     * @private
     */
    _setupRender() {
        this.ctx = this.canvas.getContext("2d");
        return this;
    }

    /**
     * @return {Noise}
     * @private
     */
    _mount() {
        this._update();
        return this;
    }

    /**
     * @private
     */
    _update = () => {
        // https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
        if (!this.destroyed) {
            this._noise(this.ref.getContext("2d"));
            const tileWidth = (this.ctx, Math.ceil(this.width / this.tile));
            const tileHeight = Math.ceil(this.height / this.tile);
            let x = 0;
            let y = 0;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.ctx.save();
            this.ctx.globalAlpha = this.globalAlpha;
            for (let i = 0; i < tileWidth; i++) {
                for (let j = 0; j < tileHeight; j++) {
                    this.ctx.drawImage(this.ref, x, y);
                    y += this.tile;
                }
                x += this.tile;
                y = 0;
            }
            //this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            this.ctx.restore();
            window.requestAnimationFrame(this._update);
        }
    };

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @private
     */
    _noise = (ctx) => {
        const image = ctx.createImageData(this.tile, this.tile);
        for (let dataBuffer = new Uint32Array(image.data.buffer), bufferLength = dataBuffer.length, i = 0; i < bufferLength;) {
            dataBuffer[i++] = (255 * Math.random() | 0) << 24;
        }
        ctx.putImageData(image, 0, 0);
    };

    /**
     * @param {{container:HTMLElement }} data
     */
    resize = ({container}) => {
        this.width = container.offsetWidth * window.devicePixelRatio;
        this.height = container.offsetHeight * window.devicePixelRatio;
    };

    destroy = () => {
        this.destroyed = true;
        this.ctx = null;
        this.ref = null;
        window.cancelAnimationFrame(this._update());
    };
}
