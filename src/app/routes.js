/**
 * Created by mendieta on 11/7/16.
 */
import { environment } from "../config/index"
import Home from "app/views/Home.vue";
import Test from "app/views/Test.vue";
import NotFound from "app/views/NotFound.vue";

const routes = {
    mode: "history",
    base: environment.url.subdirectory,
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
