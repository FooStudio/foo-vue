/**
 * Created by mendieta on 4/27/17.
 */
import AnalyticsAdapter from "./AnalyticsAdapter";

export default class GoogleAnalyticsAdapter extends AnalyticsAdapter {
    static load(ID) {
        return new Promise((resolve) => {
            (function (i, s, o, g, r, a, m) {
                /* eslint-disable */
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
            ga('create', ID, 'auto');
            ga('send', 'pageview');
            resolve();
        });
    }

    static trackPage(route) {
        window.ga("set", "page", route);
        window.ga("send", "pageview");
    }

    static trackEvent(event) {
        let args = ["send", "event"];
        for (let arg of event) {
            args.push(arg);
            window.ga(...args);
        }
    }
}
