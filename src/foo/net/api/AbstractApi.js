import loadJs from "load-script";

export default class AbstactApi {
    /**
     * @property name
     * @default "AbstractApi"
     * @static
     * @public
     * @type {string}
     */
    static apiName = "AbstractApi";

    /**
     * The SDK url;
     * @property url
     * @default ""
     * @static
     * @override
     * @type {string}
     */
    static url = "";

    /**
     * Flag determining if the SDK is loaded
     * @property loaded
     * @default false
     * @static
     * @type {boolean}
     */
    static loaded = false;

    /**
     * Variable determining if the SDK has been inited.
     * @property inited
     * @static
     * @type {boolean}
     */
    static inited = false;

    /**
     * The User Data Object
     * @property userData
     * @default null
     * @static
     * @type {Object}
     */
    static userData = null;

    /**
     * The setup Promise resolve function
     * @static
     * @property resolve
     * @default null
     * @type {function}
     */
    static resolve = null;

    static setup() {
        return new Promise((resolve) => {
            this.resolve = resolve;
            this._load();
        });
    }

    /**
     * Loads the SDK.
     * @method _load
     * @private
     * @static
     */
    static _load() {
        if (this.url) {
            loadJs(this.url, this._init.bind(this));
        } else {
            console.warn(`SdkManager: no sdk url has been set for ${this.apiName}.`);
        }
    }

    /**
     * Initialize the SDK.
     * @param {object} error The error that could occur loading the SDK.
     * @private
     * @static
     */
    static _init(error) {
        if (error) {
            throw new Error(`SdkManager: Error loading SDK! - ${error}`);
        }
        if (this.loaded) return;
        this.loaded = true;
        this.configSDK();
    };

    static configSDK() {
        this.sdkConfigured();
    }

    static sdkConfigured() {
        this.inited = true;
        this.resolve();
        this.resolve = null;
    }
}
