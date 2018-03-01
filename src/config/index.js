import DEFAULT_CONFIG from "./defaultConfig";
import getEnvironment from "./getEnvironment";
import { defaultsDeep } from "lodash";

/**
 * @typedef EnvironmentVars
 * @prop {Boolean} debug
 *
 * @typedef EnvironmentUrl
 * @prop {String} base
 * @prop {String} subdirectory
 * @prop {String} public
 * @prop {String} api
 *
 * @typedef EnvironmentAnalytics
 * @prop {String} adapter
 * @prop {String} id
 *
 * @typedef EnvironmentProperties
 * @prop {String} fb
 * @prop {String} gp
 * @prop {String} xeerpa
 *
 * @typedef Environment
 * @prop {EnvironmentVars} vars
 * @prop {EnvironmentUrl} url
 * @prop {EnvironmentAnalytics[]} analytics
 * @prop {EnvironmentProperties} properties
 *
 * @typedef ConfigEnvironments
 * @prop {Environment} production
 * @prop {Environment} staging
 * @prop {Environment} qa
 * @prop {Environment} development
 *
 * @typedef ConfigVars
 * @prop {Boolean} animate
 * @prop {Boolean} resize
 *
 * @typedef Config
 * @prop {String} locale
 * @prop {Boolean} data_loading
 * @prop {Boolean} asset_loading
 * @prop {String} facebook_permissions
 * @prop {String} google_scopes
 * @prop {String[]} sdks
 * @prop {ConfigVars} vars
 * @prop {ConfigEnvironments} environments
 */

/**
 * @type {Config}
 */
const CUSTOM_CONFIG = {
    environments: {
        production: {
            vars: {
                debug: false,
            },
            url: {
                base: "http://brand.com",
            },
        },
        staging: {
            url: {
                base: "http://fooprojects.com",
                subdirectory: "/clients/brand/site",
                public: "/clients/brand/site/static",
                api: "/clients/brand/site/api",
            },
        },
        qa: {
            url: {
                base: "http://fooprojects.com",
                subdirectory: "/clients/foo/boilerplate",
                public: "/clients/foo/boilerplate/static",
                api: "/clients/foo/boilerplate/api",
            },
        },
        development: {
            url: {
                base: "http://localhost:8080",
            },
        },
    },
};

/**
 * @type {Readonly<Config>}
 */
export const config = Object.freeze(defaultsDeep(CUSTOM_CONFIG, DEFAULT_CONFIG));

/**
 * @type {Readonly<Environment>}
 */
export const environment = getEnvironment(config.environments);
