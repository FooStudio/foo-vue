import AbstractApi from "./AbstractApi";
import { environment } from "src/config";
import bowser from "bowser";

/**
 * Xeerpa social login helper class.
 * @author Mendieta
 * @class Xeerpa
 * @namespace net.api
 */
export default class Xeerpa extends AbstractApi {

    static apiName = "Xeerpa";

    /**
     * Facebook static string ID
     * @default "FB"
     * @property FB
     * @static
     * @type {string}
     */
    static FB = "FB";
    /**
     * LinkedIn static string ID
     * @default "LI"
     * @property LI
     * @static
     * @type {string}
     */
    static LI = "LI";
    /**
     * Twitter static string ID
     * @default "TW"
     * @property TW
     * @static
     * @type {string}
     */
    static TW = "TW";
    /**
     * Google static string ID
     * @default "IG"
     * @property GO
     * @static
     * @type {string}
     */
    static GO = "GO";
    /**
     * Instagram static string ID
     * @default "IG"
     * @property IG
     * @static
     * @type {string}
     */
    static IG = "IG";

    /**
     * @default "WL"
     * @property WL
     * @type {string}
     * @static
     */
    static WL = "WL";

    /**
     * Callback to be called after Xeerpa response.
     * @property cb
     * @default null
     * @type {function}
     */
    static cb = null;

    static _load() {
        this._init();
    }

    /**
     * Initiates a login to a social network with Xeerpa.
     * @param {string} sn The social network string ID.
     * @param {Object} [data=null] The extra data to be sent, optional.
     * @param {function} resolve
     * @param {function} reject
     * @method login
     */
    static login(resolve, reject, data = {}, sn = "") {
        this._login(resolve, reject, data, sn);
    }

    static loginAsync(data = null, sn = this.FB) {
        return new Promise((resolve, reject) => {
            this._login(resolve, reject, data, sn);
        });
    }

    static _login(resolve, reject, data = {}, sn = "") {
        this.timeout = undefined;
        this.resolveCb = resolve;
        const url = environment.properties.xeerpa;
        const apiURL = `${url}?socialNetwork=${sn}&data=${data}`;
        window.addEventListener("message", this._messageHandler, false);
        window.open(apiURL, "Login", "width=" + (500) + ", height=" + (475) + ", scrollbars=yes");
        if (navigator.appName === "Microsoft Internet Explorer" || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/)) || bowser.msie) {
            this._cookieInterval = window.setInterval(() => {
                let data = this._readCookie();
                if (data) {
                    window.clearInterval(this._cookieInterval);
                    this._receiveData(data);
                }
            }, 100);
        }
        this._loginTimeout = window.setTimeout(() => {
            if (typeof this._cookieInterval === "number") window.clearInterval(this._cookieInterval);
            reject(new Error("Xeerpa login timeout was reached."));
        }, 3e4);
    }

    /**
     * Event handler for window message events.
     * @param {Event} event The event to be handled.
     * @private
     * @method _messageHandler
     */
    static _messageHandler = (event) => {
        if (typeof event.data !== "string") return;
        let data = JSON.parse(event.data);
        if (data.socialNetwork) Xeerpa._receiveData(data);
    }

    /**
     * Reads the cookie stored, and returns the value when appropriate.
     * @returns {Object} The user object data
     * @private
     * @method _readCookie
     */
    static _readCookie() {
        if (!document.cookie) return;
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].split("=");
            if (cookie[0].trim() === "user") {
                let value = cookie[1];
                value = JSON.parse(value);
                document.cookie = "user=;path=/;expires=" + new Date(Date.now() - 1000).toGMTString();
                return value;
            }
        }
    }

    /**
     * Process the data sent from Xeerpa and calls callback.
     * @param {Object} data The object to be processed.
     * @private
     * @method _receiveData
     */
    static _receiveData(data) {
        // TODO: Conditionally remove listener, IE doesn't use it.
        window.removeEventListener("message", this._messageHandler);
        this._loginTimeout && window.clearTimeout(this._loginTimeout);
        this.resolveCb(data);
    }

}
