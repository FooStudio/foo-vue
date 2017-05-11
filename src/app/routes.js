/**
 * Created by mendieta on 11/7/16.
 */
import {environment} from "src/config"
import Home from "app/views/Home.vue";
import Test from "app/views/Test.vue";
import NotFound from "app/views/NotFound.vue";

const routes = {
    mode: "history",
    base: environment.vars.route,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/test",
            name: "test",
            component: Test
        },
        {
            path: "*",
            name: "404",
            component: NotFound
        }
    ]
};

export default routes;
