/**
 * Created by mendieta on 7/17/16.
 */
import request from "superagent";
import LocaleManager from "foo/core/locale/LocaleManager";

const VueFoo = {};

VueFoo.install = function (Vue, options) {
    // LOCALE
    Vue.prototype.$setLocale = LocaleManager.loadLocale;
    Vue.setLocale = LocaleManager.loadLocale;

    // SUPERAGENT || HTTP
    Vue.prototype.$get = request.get;
    Vue.prototype.$post = request.post;
    Vue.prototype.$delete = request.del;
    Vue.prototype.$head = request.head;
    Vue.prototype.$put = request.put;
    Vue.prototype.$patch = request.patch;
};

export default VueFoo;
