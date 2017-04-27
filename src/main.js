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

//IMPORT APP UTILS
import domready from "domready";
import Breakpoints from "foo/utils/Breakpoint";
import App from "app/App";
import "gsap";

//IMPORT APP CONFIG
import data from "src/config/data.json";
import {config, environment} from "src/config/index";
import Acknowledgements from "foo/utils/Acknowledgments";

const startApp = () => {
    //CREATE APP
    if (environment.vars.debug) console.info("Foo: Start App");
    window['App'] = new App(config, environment, data); // eslint-disable-line no-new
};

domready(() => {
    Acknowledgements.show();
    Breakpoints.setup();
    startApp();
});
