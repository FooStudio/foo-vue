/**
 * Created by mendieta on 4/27/17.
 */
import store from "app/store";
import AnalyticsAdapterManager from "foo/tracking/adapters/AnalyticsAdapterManager";
import tags from "src/config/tracking";
import {environment} from "src/config/";

/**
 * The analytics default route page.
 * @property currentRoute
 * @default ""
 * @type {string}
 */
let currentRoute = "";

/**
 * Defines if the analytics has loaded.
 * @property loaded
 * @default false
 * @type {boolean}
 */
let loaded = false;

/**
 * The analytics adapter keys array
 * @property adapters
 * @default null
 * @type {Array}
 */
let adapters = null;

/**
 * Vue installer
 * @param  {Vue} Vue
 * @param  {Object} [options={}]
 */
function install(Vue, options = {}) {
    adapters = options.adapters;
    AnalyticsAdapterManager.load(adapters).then(() => {
        loaded = true;
        store.subscribe(handleTracking);
    });

    Vue.prototype.$trackEvent = trackEvent;
    Vue.prototype.$trackPage = trackPage;
    Vue.trackPage = trackPage;
    Vue.trackEvent = trackEvent;
}

/**
 * Handles the router route mutations.
 * @param {Object} mutation The store mutation that dispatched the handler.
 * @private
 * @method handleTracking
 */
function handleTracking(mutation) {
    if (mutation.type === "router/ROUTE_CHANGED") {
        currentRoute = mutation.payload.to.path;
        trackPage(currentRoute);
    }
}

/**
 * Tracks a page view, with the specified route.
 * @param {string} route Route of the tracking tag to be pushed on analytics adapter(s).
 * @method trackPage
 */
function trackPage(route) {
    if (!loaded) return;
    if (route) {
        if (environment.vars.debug) console.info("Track Page View:", route);
        AnalyticsAdapterManager.trackPage(route, adapters);
    } else {
        console.warn("VueAnalytics: no route passed to trackPage");
    }
}

/**
 * Search for a match on the tracking data and pushes to analytics adapter(s).
 * @param {string} event Param of the tracking tag to be pushed on analytics.
 * @method trackEvent
 */
function trackEvent(event) {
    if (!loaded) return;
    if (event) {
        const data = tags[event];
        if (data) {
            if (environment.vars.debug) console.info("Track Event:", data);
            AnalyticsAdapterManager.trackEvent(event, adapters);
        } else {
            console.warn(`VueAnalytics: no data found for ${event} event`);
        }
    } else {
        console.warn("VueAnalytics: no event passed to trackEvent");
    }
}

export default {install};
