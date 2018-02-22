/*!
 * Foo (Studio)
 * (c) 2013-2017 Foo (Studio)
 */

import "es6-promise/auto"
import "url-polyfill"
import "sanitize.css/sanitize.css";
import "./main.styl";
import "app/utils/polyfills";
import "modernizr";
import "gsap";
import domready from "domready";
import App from "app/App";

const startApp = () => {
    window["App"] = new App();
};

domready(() => startApp());
