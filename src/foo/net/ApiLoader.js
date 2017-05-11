import {config} from "src/config";
import Facebook from "foo/net/api/FacebookApi";
import Google from "foo/net/api/GoogleApi";
import Xeerpa from "foo/net/api/XeerpaApi";
import Twitter from "foo/net/api/TwitterApi";

export default class ApiLoader {

    /**
     * @static
     * @type {{facebook, google, xeerpa, twitter}}
     */
    static sdks = {
        "facebook": Facebook,
        "google": Google,
        "xeerpa": Xeerpa,
        "twitter": Twitter
    };

    /**
     * @static
     * @return {Promise}
     */
    static load() {
        let promises = [];
        for (const sdk of config.sdks) {
            const sdkManager = this.sdks[sdk];
            if (sdkManager) {
                promises.push(sdkManager
                    .setup()
                    .catch(error => console.error(`Failed to setup ${sdk}:`, error))
                );
            } else {
                console.warn(`SDKLoader: no sdk set for ${sdk} adapter.`);
            }
        }
        Promise.all(promises)
            .then(() => {
                return Promise.resolve();
            });
    }

}
