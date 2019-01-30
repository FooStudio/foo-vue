const DEFAULT_ENVIRONMENT = {
    vars: {
        debug: true,
    },
    url: {
        base: "",
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
};

/**
 * Default config
 * @readonly
 */
export default Object.freeze({
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
    environments: {
        staging: {
            ...DEFAULT_ENVIRONMENT,
            priority: 1,
        },
        qa: {
            ...DEFAULT_ENVIRONMENT,
            priority: 2,
        },
        production: {
            ...DEFAULT_ENVIRONMENT,
            priority: 3,
        },
        development: {
            ...DEFAULT_ENVIRONMENT,
            priority: 4,
        },
    },
});
