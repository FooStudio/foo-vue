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
        this.activeLocale = config.locale;

        /**
         * App locales loaded
         * @type {Array}
         */
        this.loadedLocaleArr = [];

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

        window.App = this;

        Promise
            .all([
                this._setupAnalytics(),
                this._setupSDK('facebook', Facebook),
                this._setupSDK('google', Google),
                this._setupSDK('xeerpa', Xeerpa),
                this._loadLocale(),
                this._loadManifest()
            ])
            .then(() => {
                this._addListeners();
                this.start();
            });
    }

    /**
     * Method that init the Analytics helper
     * @protected
     * @override
     * @method _setupAnalytics
     * @returns {Promise}
     */
    _setupAnalytics() {
        const { config } = this;
        return new Promise(resolve => {
            this.analytics = new Analytics(
                "static/data/tracking.json",
                config.analytics,
                resolve);
        });
    }

    /**
     * Method that loads the current locale and (re)renders the App
     * @protected
     * @param {string=} localeId - locale to load
     * @returns {Promise}
     */
    _loadLocale(localeId = this.config.locale) {
        const { loadedLocaleArr } = this;
        let promise;
        if (loadedLocaleArr.includes(localeId)) {
            // If locale is already loaded just resolve
            promise = Promise.resolve();
        } else {
            // Update store
            store.commit(LOCALE_LOADING);
            // Load requested json
            promise = request
                .get(`static/data/locale/${localeId}.json`)
                .catch(error => console.error("Failed to load locale:", error))
                .then(response => {
                    // Save locale in loaded arr
                    this.loadedLocaleArr.push(localeId);
                    // Save locale in vue
                    Vue.locale(localeId, response.body);
                });
        }
        // Return promise, update locale when resolved.
        return promise
            .then(() => this._updateLocale(localeId));
    }

    /**
     * Updates active locale
     * @protected
     * @param {string} localeId The locale to set as active
     * @return {void}
     */
    _updateLocale(localeId) {
        this.activeLocale = localeId;
        Vue.config.lang = localeId;
        store.commit(LOCALE_CHANGED, localeId);
    }

    /**
     * Method that set the current locale
     * @method setLocale
     * @param {string} localeId The locale to set as active
     * @returns {void}
     */
    setLocale = localeId => {
        this._loadLocale(localeId);
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

    _setupSDK(id, sdkManager) {
        const { config } = this;
        if (config.apis[id]) {
            return sdkManager
                .setup()
                .catch(error => console.error(`Failed to setup ${id}:`, error));
        } else {
            return Promise.resolve();
        }
    };

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
    _loadManifest() {
        const { config } = this;
        if (config.asset_loading) {
            return request
                .get("static/data/preload.json")
                .catch(error => console.error("Unable to load preload.json:", error))
                .then(response => this._loadAssets(response));
        }
        return Promise.resolve();
    };

    /**
     * Method to load all assets
     * @private
     * @param assets
     * @method _loadAssets
     * @return {void}
     */
    _loadAssets(manifest) {
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
            })
                .catch(error => console.error('Failed to load assets:', error));
        }
        return Promise.resolve();
    };

    /**
     * Starts App, override if needed custom initialization.
     * @override
     * @method start
     * @returns {void}
     */
    start() {
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
