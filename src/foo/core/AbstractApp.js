import Vue from "vue";
import Signal from "signals";
import request from "superagent";
import preloader from 'preloader';
import throttle from "lodash/throttle";
import store from "app/store";
import { mainLoaderDisappear } from "app/transitions/loader";
import Analytics from "foo/utils/Analytics";
import Facebook from "foo/net/api/Facebook";
import Google from "foo/net/api/Google";
import Xeerpa from "foo/net/api/Xeerpa";

import { LOADING, PROGRESS } from "app/store/modules/loader";
import { LOCALE_CHANGED, LOCALE_LOADING } from "app/store/modules/app";

export default class AbstractApp {
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
        /**
         * Signal dispatching on app animationFrame
         * @property rendered
         * @type {Signal}
         */
        this.rendered = new Signal();

        /**
         * Signal dispatching on ap resize
         * @property resized
         * @type {Signal}
         */
        this.resized = new Signal();

        /**
         * The app debug flasg
         * @property DEBUG
         * @type {boolean}
         */
        this.DEBUG = environment.vars.debug;

        /**
         * The app config object
         * @property config
         * @type {Object}
         */
        this.config = config;

        /**
         * The app analytics util
         * @property analytics
         * @type {Analytics}
         */
        this.analytics = null;

        /**
         * App environment object
         * @property environment
         * @type {Object}
         */
        this.environment = environment;

        /**
         * App initial load data
         * @default {}
         * @property data
         * @type {Object}
         */
        this.data = data;

        /**
         *  Defines if the App has started
         *  @property started
         *  @default false
         *  @type {boolean}
         */
        this.started = false;

        /**
         * The app window width
         * @property width
         * @type {Number}
         */
        this.width = window.innerWidth;

        /**
         * The app window height
         * @property height
         * @type {Number}
         */
        this.height = window.innerHeight;

        /**
         * The current locale
         * @default "es-MX"
         * @property locale
         * @type {string}
         */
        this.locale = config.locale;
        /**
         * Loader
         * @property loader
         * @type {preloader}
         */
        this.loader = preloader({
            xhrImages: false,
            loadFullAudio: true,
            loadFullVideo: true
        });
        this.setLocale = this.setLocale.bind(this);
        window.App = this;
        this._setupAnalytics();
    }

    /**
     * Method that init the Analytics helper
     * @protected
     * @override
     * @method _setupAnalytics
     * @returns {void}
     */
    _setupAnalytics() {
        this.analytics = new Analytics("static/data/tracking.json", this.config.analytics, this._setupPolyglot());
    }

    /**
     * Method that setups Polyglot, loads default locale
     * @private
     * @override
     * @method _setupPolyglot
     * @returns {void}
     */
    _setupPolyglot() {
        /**
         * App locales loaded
         * @type {Array}
         */
        this.locales = [];
        this.setLocale(this.locale);
    }

    /**
     * Method called when the App will initialize, setup initial data at override
     * @method init
     * @override
     */
    init() {
        this._addListeners();
        this._initSDKs()
            .then(this._loadManifest)
            .catch(this._logManifestError)
            .then(this._loadAssets)
            .then(this.start);
    }

    /**
     * Method that loads the current locale and (re)renders the App
     * @private
     * @override
     * @method _loadLocale
     * @returns {void}
     */
    _loadLocale() {
        request.get(`static/data/locale/${this.locale}.json`)
            .then((response) => {
                this.locales.push(this.locale);
                Vue.locale(this.locale, response.body);
                Vue.config.lang = this.locale;
                store.commit(LOCALE_CHANGED, this.locale);
                if (!this.started) {
                    this.init();
                }
            })
            .catch((error) => {
                console.error("Error: The provided locale was not found in the locales directory.", error);
            });
    }

    /**
     * Method that set the current locale
     * @method setLocale
     * @param {string} locale The locale to set as current
     * @returns {void}
     */
    setLocale(locale) {
        this.locale = locale;
        if (this.locales.includes(this.locale)) {
            Vue.config.lang = this.locale;
            store.commit(LOCALE_CHANGED, this.locale);
        } else {
            store.commit(LOCALE_LOADING);
            this._loadLocale();
        }
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
     * Method that initialize SDKs and APIs depending on the App config
     * @private
     * @method _initSDKs
     * @returns {Promise}
     * @todo Setup twitter API
     */
    _initSDKs() {
        const { apis } = this.config;
        const promiseArr = [];
        // Setup requested APIs
        if (apis.facebook) {
            promiseArr.push(Facebook.setup());
        }
        if (apis.google) {
            promiseArr.push(Google.setup());
        }
        if (apis.xeerpa) {
            promiseArr.push(Xeerpa.setup());
        }
        // Return a single Promise that resolves when all APIs have loaded
        if (promiseArr.length) {
            return Promise.all(promiseArr);
        }
        // If no APIs were requested just return a resolved promise
        return Promise.resolve();
    }

    /**
     * Window resize event handler
     * @param {Event} e The event object
     * @protected
     * @method _onResize
     * @returns {void}
     */
    _onResize = throttle(() => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.resized.dispatch({ width: this.width, height: this.height });
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

    /**
     * Loads preload.json if requested
     * @private
     * @method _loadManifest
     * @return {Promise}
     */
    _loadManifest = () => {
        const { config } = this;
        if (config.asset_loading) {
            return request.get("static/data/preload.json");
        }
        return Promise.resolve();
    };

    /**
     * Logs `_loadManifest` Promise errors
     * @private
     * @method _logManifestError
     * @return {void}
     */
    _logManifestError = error => {
        console.error("Unable to load preload.json:", error);
    };

    /**
     * Method to load all assets
     * @private
     * @param assets
     * @method _loadAssets
     * @return {void}
     */
    _loadAssets = manifest => {
        if (typeof manifest !== 'undefined' && Array.isArray(manifest.body)) {
            return new Promise(resolve => {
                const { loader } = this;
                // Add assets to loader
                manifest.body.forEach(asset => loader.add(asset));
                // Publish
                this.onLoadStart();
                loader.on("progress", this.onLoadProgress);
                loader.on("complete", this.onLoadComplete);
                loader.on("complete", resolve);
                // Init load
                loader.load();
            });
        }
        return Promise.resolve();
    };

    /**
     * Starts App, override if needed custom initialization.
     * @override
     * @method start
     * @returns {void}
     */
    start = () => {
        this.started = true;
        this.renderApp();
        mainLoaderDisappear().then(() => {
            // TODO: Defer app rendering to loader out transition complete? ¿Maybe? Or defer first view animation?
        });
    }

    /**
     * On load start callback
     * @override
     * @method onLoadStart
     * @return {void}
     */
    onLoadStart = () => {
        store.commit(LOADING, true);
    };

    /**
     * On load progress callback
     * @override
     * @method onLoadProgress
     * @returns {void}
     */
    onLoadProgress = (prog) => {
        store.commit(PROGRESS, prog);
    };

    /**
     * On load complete callback
     * @override
     * @method loaderComplete
     * @returns {void}
     */
    onLoadComplete = () => {
        store.commit(LOADING, false);
    };

    /**
     * Method to be overridden, render logic
     * @abstract
     * @override
     * @method renderApp
     * @returns {void}
     */
    renderApp() {

    }
}
