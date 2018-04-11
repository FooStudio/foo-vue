import {environment} from "../../config/index";
import request from "superagent";

/**
 * @class Api
 * @author Mendieta
 */
export default class Api {

    /**
     * Login user
     * @method
     * @static
     * @param {Function} resolve
     * @param {Function} reject
     * @param {Object} data
     */
    static login(resolve, reject, data) {
        request.post(this.apiURL("login")).send(data)
            .then((response) => {
                console.log("Login API success!");
                resolve(response.body);
            })
            .catch((error) => {
                console.log("Login API error!");
                reject(error);
            });
    }

    /**
     * Log out the user
     * @method
     * @static
     * @return Promise
     */
    static logout() {
        return new Promise((resolve, reject) => {
            request.post(this.apiURL("logout"))
                .then((response) => {
                    console.log("Login API success!");
                    resolve(response.body);
                })
                .catch((error) => {
                    console.log("Login API error!");
                    reject(error);
                });
        });
    }

    /**
     * Register a new user
     * @param {object} data
     * @method
     * @static
     * @return Promise
     */
    static register(data) {
        return new Promise((resolve, reject) => {
            request.post(this.apiURL("register")).send(data)
                .then((response) => {
                    console.log("Register API success.");
                    resolve(response.body);
                })
                .catch((error) => {
                    console.error("Register API error!");
                    reject(error);
                });
        });
    }

    /**
     * @private
     * @static
     * @param endpoint
     * @return {string}
     */
    static apiURL(endpoint) {
        return `${environment.url.api}/${endpoint}`;
    }
}
