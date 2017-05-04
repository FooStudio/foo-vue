/**
 * Created by mendieta on 4/27/17.
 */

export default class AnalyticsAdapter {

    /**
     * Loads the analytics Adapter SDK
     * @method load
     * @public
     * @static
     * @param {string|null} ID[default=null]
     * @return {Promise}
     */
    static load(ID = null) {

    }

    /**
     * Tracks a page for the given route.
     * @public
     * @static
     * @method trackPage
     * @param {string} route The route to be tracked
     */
    static trackPage(route) {

    }

    /**
     * Tracks an event for the given event descriptor.
     * @public
     * @static
     * @method trackEvent
     * @param {object} event The event descriptor
     */
    static TrackEvent(event) {

    }

}
