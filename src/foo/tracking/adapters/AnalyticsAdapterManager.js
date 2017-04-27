/**
 * Created by mendieta on 4/27/17.
 */
import GoogleAnalytics from "foo/tracking/adapters/GoogleAnalyticsAdapter";

export default class AnalyticsAdapterManager {

    static adapters = {
        "google": GoogleAnalytics,
    };

    static load(adapters) {
        return new Promise((resolve) => {
            let promises = [];
            for (const {adapter, id} of adapters) {
                const adapterLoader = this.adapters[adapter];
                if (adapterLoader) {
                    promises.push(adapterLoader.load(id));
                } else {
                    console.warn(`AnalyticsAdapterLoader: no adapter found for ${adapter}`);
                }
            }
            Promise.all(promises)
                .then(() => {
                    resolve();
                });
        });
    }

    static trackPage(route, adapters) {
        for (const {adapter} of adapters) {
            this.adapters[adapter].trackPage(route);
        }
    }

    static trackEvent(event, adapters) {
        for (const {adapter} of adapters) {
            this.adapters[adapter].trackEvent(event);
        }
    }
}
