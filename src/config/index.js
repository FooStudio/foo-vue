/**
 * Created by mendieta on 1/20/16.
 */

const stagingRoute = "/clients/foo/boilerplate";
const stagingURL = "http://www.fooprojects.com" + stagingRoute;

const qaRoute = "/clients/foo/boilerplate";
const qaURL = "http://www.fooprojects.com" + qaRoute;

const productionRoute = "/";
const productionURL = "http://www.client.com" + productionRoute;

const developmentRoute = "/";
const developmentURL = "http://localhost:8080" + developmentRoute;

const apiEndPoint = "/endpoint/";

// CONFIG
const config = {
    "locale": "es-MX",
    "data_loading": true,
    "asset_loading": true,
    "facebook_permissions": "email",
    "google_scopes": "https://www.googleapis.com/auth/plus.login",
    "sdks": ["facebook", "google", "xeerpa"],
    "vars": {
        "animate": true,
        "resize": true
    },
    "urls": {},
    "environments": {
        "production": {
            "vars": {
                "base": productionURL,
                "route": productionRoute,
                "debug": false
            },
            "urls": {
                "api": productionURL + apiEndPoint
            },
            "analytics": [
                {
                    "adapter": "google",
                    "id": "ua2423423"
                }
            ],
            "properties": {
                "fb": "144062099411527",
                "gp": "1015126163676-t0vmcvjts8t11vb85k0gs1u3e5lj2hfe.apps.googleusercontent.com",
                "xeerpa": "",
            }
        },
        "staging": {
            "vars": {
                "base": stagingURL,
                "route": stagingRoute,
                "debug": true
            },
            "urls": {
                "api": stagingURL + apiEndPoint
            },
            "analytics": [
                {
                    "adapter": "google",
                    "id": "ua2423423"
                }
            ],
            "properties": {
                "fb": "144062099411527",
                "gp": "1015126163676-t0vmcvjts8t11vb85k0gs1u3e5lj2hfe.apps.googleusercontent.com",
                "xeerpa": "",
            }
        },
        "qa": {
            "vars": {
                "base": qaURL,
                "route": qaRoute,
                "debug": true
            },
            "urls": {
                "api": qaURL + apiEndPoint
            },
            "analytics": [
                {
                    "adapter": "google",
                    "id": "ua2423423"
                }
            ],
            "properties": {
                "fb": "144062099411527",
                "gp": "1015126163676-t0vmcvjts8t11vb85k0gs1u3e5lj2hfe.apps.googleusercontent.com",
                "xeerpa": "",
            }
        },
        "development": {
            "vars": {
                "base": developmentURL,
                "route": developmentRoute,
                "debug": true
            },
            "urls": {
                "api": developmentURL + apiEndPoint
            },
            "analytics": [
                {
                    "adapter": "google",
                    "id": "ua2423423"
                }
            ],
            "properties": {
                "fb": "144062099411527",
                "gp": "1015126163676-t0vmcvjts8t11vb85k0gs1u3e5lj2hfe.apps.googleusercontent.com",
                "xeerpa": "",
            }
        }
    }
};

// ENVIRONMENT
let env = "development";
const host = document.location.host;

switch (host.split(":").shift()) {
    case "localhost": {
        env = "development";
        break;
    }

    case "fooprojects.com": {
        env = "staging";
        break;
    }

    case "staging.marca.com": {
        env = "staging";
        break;
    }

    case "qa.marca.com": {
        env = "qa";
        break;
    }

    case "marca.com": {
        env = "production";
        break;
    }
    default: {
        env = "development";
        break;
    }
}

const environment = config["environments"][env];

const developers = [
    {
        "name": "Juan",
        "url": "http://github.com"
    },
    {
        "name": "Erick",
        "url": "http://github.com"
    },
    {
        "name": "José",
        "url": "http://github.com"
    }
];

const designers = [
    {
        name: "Alex",
        url: "http://behance.com"
    }
];

const producers = [
    {
        name: "Ajo"
    }
];

module.exports = {config, environment, developers, designers, producers};

