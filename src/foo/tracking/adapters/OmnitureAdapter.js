/**
 * Created by mendieta on 4/27/17.
 */

import AnalyticsAdapter from "./AnalyticsAdapter";

export default class OmnitureAdapter extends AnalyticsAdapter {
    static load(ID) {
        return new Promise((resolve) => {
            //TODO: Implement loading of Omniture
            resolve();
        });
    }

    static trackPage(route) {
        //TODO: Track Omniture page view
    }

    static trackEvent(event) {
        //TODO: Implement loading of Omniture
    }
}
