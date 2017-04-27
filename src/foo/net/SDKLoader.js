/**
 * Created by mendieta on 4/26/17.
 */
import {config} from "src/config/index";
import Facebook from "foo/net/api/Facebook";
import Google from "foo/net/api/Google";
import Xeerpa from "foo/net/api/Xeerpa";
import Twitter from "foo/net/api/Twitter";

export default class SDKLoader {

    static sdks = {
        "facebook": Facebook,
        "google": Google,
        "xeerpa": Xeerpa,
        "twitter": Twitter
    };

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
