import {environment} from "src/config";
import AbstractApi from "./AbstractApi";

export default class GoogleApi extends AbstractApi {

    /**
     * @property apiName
     * @static
     * @type {string}
     */
    static apiName = "Google";

    /**
     * The Google SDK url;
     * @property url
     * @default "https://apis.google.com/js/platform.js"
     * @static
     * @type {string}
     */
    static url = "https://apis.google.com/js/platform.js";

    /**
     * The default SDK params.
     * @property params
     * @static
     * @type {{clientid: null, callback: null, scope: string, cookiepolicy: string}}
     */
    static params = {
        "clientid": null,
        "callback": null,
        "scope": "https://www.googleapis.com/auth/plus.login",
        "cookiepolicy": "none"
    };

    /**
     * @static
     * @property GoogleAuth
     * @type {Object}
     */
    static GoogleAuth = null;

    /**
     * @static
     * @property GoogleUser
     * @type {Object}
     */
    static GoogleUser = null;

    static configSDK() {
        gapi.load("auth2", () => {
            this.loaded = true;
            this.GoogleAuth = gapi.auth2.init({client_id: environment.properties.gp});
            this.GoogleAuth.then(() => {
                this.sdkConfigured();
            });
        });
    }

    /**
     * Login method.
     * @param {function} resolve
     * @param {function} reject
     * @static
     * @public
     */
    static login(resolve, reject) {
        if (!this.inited) throw new Error("Google SDK not loaded! call Google.setup() before login. You should enable the Google from the config file.");
        this.GoogleAuth.signIn()
            .then(() => {
                this.GoogleUser = this.GoogleAuth.currentUser.get();
                const prof = this.GoogleUser.getBasicProfile();
                const profile = {
                    id: prof.getId(),
                    name: prof.getName(),
                    given_name: prof.getGivenName(),
                    family_name: prof.getFamilyName(),
                    image_url: prof.getImageUrl(),
                    email: prof.getEmail()
                };
                const auth = this.GoogleUser.getAuthResponse();
                resolve({profile, auth});
            })
            .then(undefined, (error) => {
                console.error(error);
                reject(error);
            });
    }

    /**
     * The logout method.
     * @param {function} resolve
     * @param {function} reject
     * @static
     * @method logout
     * @public
     */
    static logout(resolve, reject) {
        this.GoogleUser.disconnect();
        this.GoogleUser = null;
        resolve();
    }

}
