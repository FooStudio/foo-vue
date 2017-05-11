import {environment, config} from "src/config";
import data from "src/config/data.json";
import {Signal} from "signals";
import throttle from "lodash/throttle";
import Breakpoints from "foo/utils/Breakpoints";
import LocaleManager from "foo/core/locale/LocaleManager";

export default class AbstractApp {
    /**
     * Signal dispatching on app animationFrame
     * @property rendered
     * @type {signals.Signal}
     */
    render = new Signal();

    /**
     * Signal dispatching on ap resize
     * @property resize
     * @type {signals.Signal}
     */
    resize = new Signal();

    /**
     * The app debug flag
     * @property DEBUG
     * @type {boolean}
     */
    DEBUG = environment.vars.debug;

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
     * @property config
     * @default null
     * @type {Object}
     */
    config = null;

    /**
     * @property environment
     * @default null
     * @type {Object}
     */
    environment = null;

    /**
     * @constructor
     */
    constructor() {
        this.setup();
        Promise.all([
            LocaleManager.loadLocale(),
        ])
            .then(() => {
                this.start();
            });
    }

    /**
     * @method setup
     * @private
     * @return {void}
     */
    setup() {
        this.setupDebug();
        LocaleManager.setup();
        Breakpoints.setup();
    }

    /**
     * @method setupDebug
     * @private
     * @returns {void}
     */
    setupDebug() {
        this.DEBUG = environment.vars.config;
        this.data = data;
        if (this.DEBUG) {
            console.info("Foo: Start App");
            this.config = config;
            this.environment = environment;
        }
    }

    /**
     * Starts App, override if needed custom initialization.
     * @protected
     * @method start
     * @returns {void}
     */
    start() {
        this.started = true;
        this._addListeners();
        this.renderApp();
        if (this.DEBUG) console.info("Foo: App Rendered");
    }

    /**
     * Method to be overridden, render logic
     * @abstract
     * @override
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
        if (config.vars.resize) window.addEventListener("resize", this._onResize);
        if (config.vars.animate) this._animate();
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
        this.resize.dispatch({width: this.width, height: this.height});
    }, 16);

    /**
     * Method that loops animation frameworks
     * @private
     * @method _animate
     * @returns {void}
     */
    _animate() {
        requestAnimationFrame(() => {
            this.render.dispatch();
            this._animate();
        });
    }
}
