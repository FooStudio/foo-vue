import Signal from "signals";
import throttle from "lodash/throttle";
import LocaleManager from "foo/core/locale/LocaleManager";

export default class AbstractApp {
    /**
     * Signal dispatching on app animationFrame
     * @property rendered
     * @type {Signal}
     */
    rendered = new Signal();

    /**
     * Signal dispatching on ap resize
     * @property resized
     * @type {Signal}
     */
    resized = new Signal();

    /**
     * The app debug flag
     * @property DEBUG
     * @type {boolean}
     */
    DEBUG;

    /**
     * The app config object
     * @property config
     * @type {Object}
     */
    config;

    /**
     * App environment object
     * @property environment
     * @type {Object}
     */
    environment;

    /**
     * App initial load data
     * @default {}
     * @property data
     * @type {Object}
     */
    data;

    /**
     *  Defines if the App has started
     *  @property started
     *  @default false
     *  @type {boolean}
     */
    started = false;

    /**
     * The app window width
     * @property width
     * @type {Number}
     */
    width = window.innerWidth;

    /**
     * The app window height
     * @property height
     * @type {Number}
     */
    height = window.innerHeight;

    /**
     * @module foo
     * @namespace core
     * @class AbstractApp
     * @author Mendieta
     * @constructor
     * @param {object} config App config object
     * @param {object} environment App environment object
     * @param {object} [data={}] App initial load data
     */
    constructor(config, environment, data = {}) {
        // Define props from arguments
        this.DEBUG = environment.vars.debug;
        this.config = config;
        this.environment = environment;
        this.data = data;
        this.activeLocale = config.locale;
        Promise
            .all([
                LocaleManager.loadLocale(),
            ])
            .then(() => {
                this._addListeners();
                this.start();
            });
    }

    /**
     * Starts App, override if needed custom initialization.
     * @protected
     * @method start
     * @returns {void}
     */
    start() {
        this.started = true;
        this.renderApp();
    }

    /**
     * Method to be overridden, render logic
     * @abstract
     * @method renderApp
     * @returns {void}
     */
    renderApp() {
    }

    /**
     * Method that init listeners depending on the App config
     * @private
     * @method _addListeners
     * @returns {void}
     */
    _addListeners() {
        if (this.config.vars.resize) window.addEventListener("resize", this._onResize);
        if (this.config.vars.animate) this._animate();
    }

    /**
     * Window resize event handler
     * @param {Event} e The event object
     * @private
     * @method _onResize
     * @returns {void}
     */
    _onResize = throttle(() => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.resized.dispatch({width: this.width, height: this.height});
    }, 16);

    /**
     * Method that loops animation frameworks
     * @private
     * @method _animate
     * @returns {void}
     */
    _animate() {
        requestAnimationFrame(() => {
            this.rendered.dispatch();
            this._animate();
        });
    }
}
