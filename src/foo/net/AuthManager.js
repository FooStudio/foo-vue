import Facebook from "foo/net/api/FacebookApi";
import Google from "foo/net/api/GoogleApi";
import Xeerpa from "foo/net/api/XeerpaApi";
import Api from "app/utils/Api";

/**
 * Authentication manager class.
 * @class AuthManager
 * @namespace core
 * @author Mendieta
 */
export default class AuthManager {

    /**
     * Services struct.
     * @property services
     * @static
     * @default {XE:string,FB: string, GO: string, API: string}
     * @type {Object}
     */
    static services = {
        XE: "xeerpa",
        FB: "facebook",
        GO: "google",
        API: "api",
    };

    /**
     * @property apis
     * @static
     * @private
     * @type {{xeerpa, facebook, google, api}}
     */
    static apis = {
        "xeerpa": Xeerpa,
        "facebook": Facebook,
        "google": Google,
        "api": Api,
    };

    /**
     * Login into the requested service.
     * @param {string} service The service to use for login
     * @param {object} [data=null] The user login data
     * @param {string} [xs="FB"] The Xeerpa social network ID to login into.
     * @static
     * @method login
     * @return {Promise}
     */
    static login(service, data = null, xs = "FB") {
        return new Promise((resolve, reject) => {
            const staticApi = this.apis[service];
            if (staticApi) {
                staticApi.login(resolve, reject, data, xs);
            } else {
                console.error("AuthManager:", `Supplied service: ${service} is not defined!`);
                reject(new Error("Error"));
            }
        });
    }

    /**
     * Calls a register method on the APi endpoint.
     * @method register
     * @static
     * @param {string} service The service to be used for register action.
     * @param {Object} data The data to be sent to the register method.
     */
    static register(service, data) {
        return new Promise((resolve, reject) => {
            switch (service) {
                case this.services.API:
                    Api.register(data);
                    break;
                default:
                    console.error("AuthManager:", `Supplied service: ${service} is not defined for the register action!`);
                    reject(new Error("Error"));
            }
        });
    }

    /**
     * Logs out the user.
     * @method logout
     * @static
     * @return Promise
     */
    static logout() {
        return Api.logout();
    }
}
