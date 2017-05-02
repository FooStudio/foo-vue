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
import Acknowledgements from "foo/utils/Acknowledgments";

const startApp = () => {
    if (process.env.NODE_ENV === "production") Acknowledgements.show();
    window['App'] = new App();
};

domready(() => startApp());
