import { isEqual } from "lodash";

/**
 * @param {String} path
 */
function getPathValues(path) {
    return path
        .split("/")
        .filter((val, i) => val !== "" || (val === "" && i === 0));
}

/**
 * @param {String} pathA
 * @param {String} pathB
 * @returns {Boolean}
 */
function equalPaths(pathA, pathB) {
    const a = getPathValues(pathA);
    const b = getPathValues(pathB);
    return isEqual(a, b);
}

export const config = Object.freeze({
    locale: "es-MX",
    data_loading: true,
    asset_loading: true,
    facebook_permissions: "email",
    google_scopes: "https://www.googleapis.com/auth/plus.login",
    sdks: [],
    vars: {
        animate: true,
        resize: true,
    },
    urls: {},
    environments: {
        production: {
            vars: {
                debug: false,
            },
            url: {
                base: "http://www.brand.com",
                subdirectory: "",
                public: "/static",
                api: "/api",
            },
            analytics: [
                {
                    adapter: "google",
                    id: "uaXXXXXXXX",
                },
            ],
            properties: {
                fb: "XXXXXXXXXXXXXXX",
                gp: "XXXXXXXXXXXXXXX.apps.googleusercontent.com",
                xeerpa: "",
            },
        },
        staging: {
            vars: {
                debug: true,
            },
            url: {
                base: "http://fooprojects.com",
                subdirectory: "/clients/brand/site",
                public: "/clients/brand/site/static",
                api: "/clients/brand/site/api",
            },
            analytics: [
                {
                    adapter: "google",
                    id: "uaXXXXXXXX",
                },
            ],
            properties: {
                fb: "XXXXXXXXXXXXXXX",
                gp: "XXXXXXXXXXXXXXX.apps.googleusercontent.com",
                xeerpa: "",
            },
        },
        qa: {
            vars: {
                debug: true,
            },
            url: {
                base: "http://fooprojects.com",
                subdirectory: "/clients/foo/boilerplate",
                public: "/clients/foo/boilerplate/static",
                api: "/clients/foo/boilerplate/api",
            },
            analytics: [
                {
                    adapter: "google",
                    id: "uaXXXXXXXX",
                },
            ],
            properties: {
                fb: "XXXXXXXXXXXXXXX",
                gp: "XXXXXXXXXXXXXXX.apps.googleusercontent.com",
                xeerpa: "",
            },
        },
        development: {
            vars: {
                debug: true,
            },
            url: {
                base: "http://localhost:8080",
                subdirectory: "",
                public: "/static",
                api: "/api",
            },
            analytics: [
                {
                    adapter: "google",
                    id: "uaXXXXXXXX",
                },
            ],
            properties: {
                fb: "XXXXXXXXXXXXXXX",
                gp: "XXXXXXXXXXXXXXX.apps.googleusercontent.com",
                xeerpa: "",
            },
        }
    }
});

export const environment = Object
    .entries(config.environments)
    .reduce((prev, [key, env]) => {
        if (Array.isArray(prev)) {
            const url = new URL(`${env.url.base}${env.url.subdirectory}`);
            // Compare hosts and paths. `equalPaths` compares if paths like
            // '/foo/bar' and '/foo/bar/' (note the the last '/') are the same.
            // Comparing url.href with location.href won't work in some cases.
            const isSameHref = url.host === location.host && equalPaths(url.pathname, location.pathname);
            // Default is development env
            if (isSameHref || key === 'development') return env;
        }
        return prev;
    }, []);
