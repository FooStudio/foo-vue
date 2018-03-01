import Vue from "vue";
import VueI18n from "vue-i18n";
import request from "superagent";
import {config} from "src/config";
import store from "app/store";
import {LOCALE_CHANGED, LOCALE_LOADING} from "app/store/modules/app";

export default class LocaleManager {
    /**
     * @property i18n
     * @type {VueI18n}
     * @static
     */
    static i18n;

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
     * @method setup
     * @static
     * @return {void}
     */
    static setup() {
        Vue.use(VueI18n);
        this.i18n = new VueI18n({
            locale: config.locale
        })
    }

    /**
     * Method that loads the current locale and (re)renders the App
     * @public
     * @param {string=} localeId - locale to load
     * @returns {Promise}
     * @
     */
    static loadLocale(localeId = config.locale) {
        let promise;
        if (LocaleManager.loadedLocales.includes(localeId)) {
            promise = Promise.resolve();
        } else {
            store.dispatch(LOCALE_LOADING);
            promise = request
                .get(`${store.getters.public}/data/locale/${localeId}.json`)
                .catch(error => console.error(`Failed to load locale: ${error}`))
                .then(response => {
                    LocaleManager.loadedLocales.push(localeId);
                    LocaleManager.i18n.setLocaleMessage(localeId, response.body);
                });
        }
        return promise
            .then(() => {
                LocaleManager.updateLocale(localeId);
            });
    }

    /**
     * @method updateLocale
     * @private
     * @static
     * @param {string} localeId
     */
    static updateLocale(localeId) {
        LocaleManager.i18n.locale = localeId;
        store.dispatch(LOCALE_CHANGED, localeId);
    }

    /**
     * The current locale
     * @default "es-MX"
     * @property activeLocale
     * @type {string}
     * @static
     * @public
     */
    static get activeLocale() {
        return LocaleManager.i18n.locale;
    }
}
