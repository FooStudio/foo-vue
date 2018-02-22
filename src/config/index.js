/**
 * Created by mendieta on 1/20/16.
 */

const URLS = {
    staging: {
        url: 'http://www.fooprojects.com',
        subdirectory: '/clients/brand/site',
        public: '/clients/brand/site/static',
        api: '/clients/brand/site/api',
    },
    qa: {
        url: 'http://www.fooprojects.com',
        subdirectory: '/clients/foo/boilerplate',
        public: '/clients/foo/boilerplate/static',
        api: '/clients/foo/boilerplate/api',
    },
    production: {
        url: 'http://www.brand.com',
        subdirectory: '',
        public: '/static',
        api: '/api',
    },
    development: {
        url: 'http://localhost:8080',
        subdirectory: '',
        public: '/static',
        api: '/api',
    },
};

// CONFIG
export const config = {
    "locale": "es-MX",
    "data_loading": true,
    "asset_loading": true,
    "facebook_permissions": "email",
    "google_scopes": "https://www.googleapis.com/auth/plus.login",
    "sdks": [],
    "vars": {
        "animate": true,
        "resize": true
    },
    "urls": {},
    "environments": {
        "production": {
            "vars": {
                "base": URLS.production.url,
                "route": URLS.production.subdirectory,
                "public": URLS.production.public,
                "debug": false,
            },
            "urls": {
                "api": URLS.production.api,
            },
            "analytics": [
                {
                    "adapter": "google",
                    "id": "uaXXXXXXXX"
                }
            ],
            "properties": {
                "fb": "XXXXXXXXXXXXXXX",
                "gp": "XXXXXXXXXXXXXXX.apps.googleusercontent.com",
                "xeerpa": "",
            }
        },
        "staging": {
            "vars": {
                "base": URLS.staging.url,
                "route": URLS.staging.subdirectory,
                "public": URLS.staging.public,
                "debug": true
            },
            "urls": {
                "api": URLS.staging.api,
            },
            "analytics": [
                {
                    "adapter": "google",
                    "id": "uaXXXXXXXX"
                }
            ],
            "properties": {
                "fb": "XXXXXXXXXXXXXXX",
                "gp": "XXXXXXXXXXXXXXX.apps.googleusercontent.com",
                "xeerpa": "",
            }
        },
        "qa": {
            "vars": {
                "base": URLS.qa.url,
                "route": URLS.qa.subdirectory,
                "public": URLS.qa.public,
                "debug": true
            },
            "urls": {
                "api": URLS.qa.api,
            },
            "analytics": [
                {
                    "adapter": "google",
                    "id": "uaXXXXXXXX"
                }
            ],
            "properties": {
                "fb": "XXXXXXXXXXXXXXX",
                "gp": "XXXXXXXXXXXXXXX.apps.googleusercontent.com",
                "xeerpa": "",
            }
        },
        "development": {
            "vars": {
                "base": URLS.development.url,
                "route": URLS.development.subdirectory,
                "public": URLS.development.public,
                "debug": true
            },
            "urls": {
                "api": URLS.development.api
            },
            "analytics": [
                {
                    "adapter": "google",
                    "id": "uaXXXXXXXX"
                }
            ],
            "properties": {
                "fb": "XXXXXXXXXXXXXXX",
                "gp": "XXXXXXXXXXXXXXX.apps.googleusercontent.com",
                "xeerpa": "",
            }
        }
    }
};

// ENVIRONMENT
function getHost(value) {
    const url = new URL(value);
    return url.host;
}

const env = Object
    .entries(URLS)
    .filter(current => getHost(current[1].url) === location.host)[0][0];

export const environment = config["environments"][env];
