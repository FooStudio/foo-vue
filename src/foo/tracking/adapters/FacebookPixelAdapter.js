/**
 * Created by mendieta on 4/27/17.
 */
import AnalyticsAdapter from "./AnalyticsAdapter";

export default class FacebookPixelAdapter extends AnalyticsAdapter {
    static load(ID) {
        return new Promise((resolve) => {
            //TODO: Implement loading of facebook pixel
            resolve();
        });
    }

    static trackPage(route) {
        fbq("track", "PageView", route);
    }

    static trackEvent(event) {
        fbq("track", "Event", event);
    }
}
