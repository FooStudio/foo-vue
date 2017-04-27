/**
 * Created by mendieta on 4/27/17.
 */
import Vue from "vue";
import request from "superagent";
import {config} from "src/config/";
import store from "app/store";
import {LOCALE_CHANGED, LOCALE_LOADING} from "app/store/modules/app";

export default class LocaleManager {
    /**
     * The current locale
     * @default "es-MX"
     * @property activeLocale
     * @type {string}
     * @static
     * @public
     */
    static activeLocale = "es-MX";

    /**
     * App locales loaded
     * @type {Array}
     * @default []
     * @property loadedLocales
     * @public
     * @static
     */
    static loadedLocales = [];

    /**
     * Method that loads the current locale and (re)renders the App
     * @public
     * @param {string=} localeId - locale to load
     * @returns {Promise}
     * @
     */
    static loadLocale(localeId = config.locale) {
        let promise;
        if (this.loadedLocales.includes(localeId)) {
            promise = Promise.resolve();
        } else {
            store.dispatch(LOCALE_LOADING);
            promise = request
                .get(`static/data/locale/${localeId}.json`)
                .catch(error => console.error(`Failed to load locale: ${error}`))
                .then(response => {
                    this.loadedLocales.push(localeId);
                    Vue.locale(localeId, response.body);
                });
        }
        return promise
            .then(() => {
                this.updateLocale(localeId);
            });
    }

    /**
     * @method updateLocale
     * @private
     * @static
     * @param {string} localeId
     */
    static updateLocale(localeId) {
        this.activeLocale = localeId;
        Vue.config.lang = localeId;
        store.dispatch(LOCALE_CHANGED, localeId);
    }
}
