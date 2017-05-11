import {config, environment} from "src/config/index";
import request from "superagent";
import AbstractApi from "./AbstractApi";

/**
 * Helper static class for working with Facebook API
 * @class Facebook
 * @namespace net.api
 * @author Mendieta
 */
export default class Facebook extends AbstractApi {

    static apiName = "Facebook";

    /**
     * The Facebook SDK url
     * @property url
     * @static
     * @type {string}
     * @default "//connect.facebook.net/es_MX/all.js"
     */
    static url = "//connect.facebook.net/es_MX/all.js";
    /**
     * The Facebook permissions array
     * @property permissions
     * @default "email"
     * @static
     * @type {string}
     */
    static premissions = "email";

    /**
     * The Facebook App ID
     * @property appID
     * @default ""
     * @static
     * @type {string}
     */
    static appID = "";

    static configSDK() {
        this.permissions = config.facebook_permissions;
        this.appID = environment.properties.fb;
        FB.init({
            appId: this.appID,
            status: false,
            xfbml: true,
            version: "2.8"
        });
        this.sdkConfigured();
    }

    /**
     * Facebook login method
     * @public
     * @static
     * @param {function} resolve
     * @param {function} reject
     * @method login
     * @return Promise
     */
    static login(resolve, reject) {
        if (!this.loaded) reject("Facebook SDK not loaded! call Facebook.setup() before login. You should enable the Facebook from the config file.");
        FB.login((res) => {
            if (res["status"] === "connected") {
                this._getUserData(res["authResponse"]["accessToken"], resolve);
            } else {
                reject("Access Denied");
            }
        }, this.permissions);
    }

    /**
     * Fetches user data and stores it in userData
     * @param {string} token The facebook session token
     * @param {function} resolve
     * @return {void}
     * @method _getUserData
     * @static
     * @private
     */
    static _getUserData(token, resolve) {
        let count = 0;
        let userData = {
            auth: {},
            profile: {}
        };
        userData.auth = {
            access_token: token
        };

        FB.api("/me?fields=email,first_name,gender,id,locale,last_name,middle_name,name", (res) => {
            userData.profile = {profile_pic: userData.profile.profile_pic, ...res};
            solve();
        });

        FB.api("me/picture", {"width": "200"}, (res) => {
            userData.profile["profile_pic"] = res.data;
            solve();
        });

        let solve = () => {
            count++;
            if (count === 2) {
                resolve(userData);
            }
        };
    }

    /**
     * Open Facebook share ui with options
     * @param {object} opts The options object
     * @return {Promise}
     * @static
     * @method share
     */
    static share(opts) {
        return new Promise((resolve, reject) => {
            FB.ui({
                method: opts.method || "feed",
                name: opts.name || "",
                link: opts.link || "",
                picture: opts.picture || "",
                caption: opts.caption || "",
                description: opts.description || ""
            }, (response) => {
                resolve(response);
            });
        });
    }

    /**
     * Get user Facebook friends
     * TODO: build get users API request
     * @param {function} cb The callback
     * @return {void}
     * @static
     * @method getUserFriend
     */
    static getUserFriends(cb) {

    }

    /**
     *
     * @param {string} token Facebook session token
     * @param {number }limit The locations amount limit
     * @return {Promise}
     */
    static getUserLocations(token = null, limit = 20) {
        return new Promise((resolve, reject) => {
            FB.api("/me/tagged_places", {token, limit}, (response) => {
                resolve(response.data);
            });
        });
    }

    /**
     *
     * @param {string} token Facebook session token
     * @param {number} limit The likes amount limit
     * @return {Promise}
     */
    static getUserLikes(token = null, limit = 100) {
        let likes = [];
        return new Promise((resolve, reject) => {
            FB.api("/me/likes", {token, limit}, (response) => {
                likes = likes.concat(response.data);
                if (response.paging.next) {
                    nextPage(response.paging.next);
                } else {
                    resolve(likes);
                }
            });

            let nextPage = (url) => {
                request.get(url).then((response) => {
                    likes = likes.concat(response.body.data);
                    if (response.body.paging.next) {
                        nextPage(response.body.paging.next);
                    } else {
                        resolve(likes);
                    }
                });
            };
        });
    }
}
