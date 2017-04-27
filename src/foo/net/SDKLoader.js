/**
 * Created by mendieta on 4/26/17.
 */
import {config} from "src/config";
import Facebook from "foo/net/api/Facebook";
import Google from "foo/net/api/Google";
import Xeerpa from "foo/net/api/Xeerpa";

export default class SDKLoader {

    static sdks = {
        "facebook": Facebook,
        "google": Google,
        "xeerpa": Xeerpa
    };

    static load() {
        console.log("load sdks");
        let promises = [];
        for (let sdk of config.sdks) {
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
