import Bowser from "bowser";
import isMobile from "ismobilejs";

/**
 * Static helper class to add meaningful classes to HTML body.
 * @class Breakpoint
 * @namespace utils
 * @author Mendieta
 */
export default class Breakpoint {

    /**
     * @property body
     * @type {HTMLElement}
     */
    body;

    /**
     * Calls the mobile and browser handlers.
     * @method setup
     * @static
     * @public
     */
    static setup() {
        this.body = document.getElementsByTagName("body")[0];
        this.addMobileClasses();
        this.addBrowserClasses();
    }

    /**
     * Setups class names depending on browser.
     * @method addBrowserClasses
     * @private
     * @static
     */
    static addBrowserClasses() {
        // IE BREAKS IF YOU ADD A CLASS WITH SPACES
        const name = Bowser.name.replace(/\s+/g, '');
        this.body.classList.add(name);
        this.body.classList.add(Bowser.version.toString());
    }

    /**
     * Setups class names depending on mobile device.
     * @method addMobileClasses
     * @private
     * @static
     */
    static addMobileClasses() {
        const keys = Object.keys(isMobile);
        for (let key of keys) {
            if (typeof isMobile[key] !== "object" && isMobile[key] === true && key !== "any") {
                this.body.classList.add(key);
            }

            if (typeof isMobile[key] === "object") {
                const keys2 = Object.keys(isMobile[key]);
                for (let k of keys2) {
                    if (isMobile[key][k] === true && k !== "blackberry" && k !== "blackberry10" && k !== "chrome" && k !== "device" && k !== "firefox" && k !== "opera") {
                        this.body.classList.add(key);
                        break;
                    }
                }
            }
        }
    }
}
