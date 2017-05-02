/**
 * Created by mendieta on 11/7/16.
 */

// BASE APP IMPORTS
import {environment} from "src/config/";
import Vue from "vue";
import AbstractApp from "foo/core/AbstractApp";
import store from "app/store";

// VUE PLUGINS
import VueI18n from "vue-i18n";
import VueMediaQuery from "v-media-query";
import VueFoo from "foo/core/vue/VueFoo";
import VueAnalytics from "foo/tracking/VueAnalytics";

// VUE ROUTER
import VueRouter from "vue-router";
import routes from "app/routes";
import {sync} from "vuex-router-sync";

import Root from "app/Root.vue";

Vue.config.productionTip = false;
routes.base = environment.vars.route;
const router = new VueRouter(routes);

export default class App extends AbstractApp {
    constructor() {
        super();
        Vue.use(VueI18n);
        Vue.use(VueMediaQuery, {
            variables: {
                mobile: 600,
                desktop: 1280,
                hd: 1440
            }
        });
        Vue.use(VueFoo);
        Vue.use(VueAnalytics, {
            adapters: environment.analytics,
        });
        Vue.use(VueRouter);
    }

    renderApp() {
        this.router = router;

        router.beforeEach((to, from, next) => next());

        sync(store, router);
        new Vue(Vue.util.extend({router, store}, Root)).$mount("#app");
    }
}
