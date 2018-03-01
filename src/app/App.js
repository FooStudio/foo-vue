import Vue from "vue";
import AbstractApp from "foo/core/AbstractApp";
import { environment } from "../config/index";
import store from "app/store";
import LocaleManager from "foo/core/locale/LocaleManager";

// VUE PLUGINS
import VueFoo from "foo/core/VueFoo";
import VueAnalytics from "foo/tracking/VueAnalytics";

// VUE ROUTER
import VueRouter from "vue-router";
import { sync } from "vuex-router-sync";
import routes from "app/routes";

import Root from "app/Root.vue";

Vue.config.performance = process.env.NODE_ENV !== "production";
routes.base = environment.url.subdirectory;
const router = new VueRouter(routes);

export default class App extends AbstractApp {
    constructor() {
        super();
        Vue.use(VueFoo);
        Vue.use(VueAnalytics, {
            adapters: environment.analytics
        });
        Vue.use(VueRouter);
    }

    renderApp() {
        this.router = router;
        router.beforeEach((to, from, next) => {
            next();
        });
        sync(store, router);
        let i18n = LocaleManager.i18n;
        /* eslint-disable no-new */
        new Vue({
            el: "#app",
            store,
            router,
            i18n,
            render: h => h(Root)
        });
    }
}
