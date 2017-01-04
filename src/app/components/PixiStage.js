/**
 * Created by mendieta on 1/3/17.
 */

import PixiMain from "foo/core/pixi/PixiMain"
import PixiViewManager from "foo/core/pixi/PixiViewManager"

import PixiHome from "app/views/PixiHome"
import PixiTest from "app/views/PixiTest"
import PixiNotFound from "app/views/PixiNotFound"

export default class PixiStage extends PixiMain {

    viewManager;
    route = {};

    constructor(_route) {
        super();
        this.route = _route;
        this.viewManager.openView(this.route.fullPath);
    }

    init() {
        this.viewManager = new PixiViewManager(this, true);
        this.viewManager.addView(new PixiHome(), "/");
        this.viewManager.addView(new PixiTest(), "/test");
        this.viewManager.addView(new PixiNotFound(), "/404");
    }

    updateRoute(_route) {
        this.route = _route;
        this.viewManager.openView(this.route.fullPath);
    }

    cleanUp() {

    }
}
