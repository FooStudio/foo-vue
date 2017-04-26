/**!
 * Foo (Studio)
 **/

//IMPORT GLOBAL CSS
import "sanitize.css/sanitize.css";
import "./main.styl";

//IMPORT MODERNIZR
// import Modernizr from "modernizr"

//IMPORT POLYFILLS
require("foo/utils/Polyfills")();
require("classlist-polyfill");
require("raf").polyfill();
require('es6-promise').polyfill();

//IMPORT ANALYTICS ADAPTERS
import {load as LoadGA} from "foo/utils/tracking/GoogleAnalytics";

//IMPORT APP UTILS
import domready from "domready";
import request from "superagent";
import Breakpoints from "foo/utils/Breakpoint";
import App from "app/App";
import "gsap";

//IMPORT APP CONFIG
import {config, environment} from "./config";
import Acknowledgements from "foo/utils/Acknowledgments";

/**
 *
 * @param {Object} data
 */
const startApp = (data = null) => {
    //CREATE APP
    if (environment.vars.debug) console.info("Foo: Start App");
    window['App'] = new App(config, environment, data); // eslint-disable-line no-new
};

/**
 * Load the initial App data || Starts the app
 */
const loadData = () => {
    Breakpoints.setup();
    if (config.data_loading) {
        if (environment.vars.debug) console.info("Foo: Load App Data");
        request.get("static/data/data.json")
            .then((response) => {
                startApp(response.body);
            })
            .catch((error) => {
                throw new Error(`Foo start error: ${error}`);
            });
    } else {
        startApp();
    }
};

const loadAnalyticsAdapters = () => {
    for (let adapter of config.analytics) {
        switch (adapter) {
            case "google":
                LoadGA(environment.properties.ga);
                break;
            default:
                console.warn(`Foo: no analytics adapter for ${adapter}`);
                break;
        }
    }
    loadData();
};

domready(() => {
    Acknowledgements.show();
    loadAnalyticsAdapters();
});
