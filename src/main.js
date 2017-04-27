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

import App from "app/App";
import "gsap";

//IMPORT APP CONFIG
import {environment} from "src/config/index";

const startApp = () => {
    //CREATE APP
    if (environment.vars.debug) console.info("Foo: Start App");
    window['App'] = new App();
};

domready(() => startApp());
