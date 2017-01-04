/**
 * Created by mendieta on 1/3/17.
 */

import AbstractView from "foo/core/pixi/AbstractView"

export default class PixiHome extends AbstractView {

    init() {
        this.text = new PIXI.Text("Home");
        this.text.x = 300;
        this.text.y = 300;
        this.addChild(this.text);
    }

    open() {
        super.open();
        TweenMax.fromTo(this.text, 0.5, {alpha: 0, x: 500}, {
            alpha: 1,
            x: 300,
            ease: Power3.easeOut,
            onComplete: this.opened
        });
    }


    close() {
        super.close();
        TweenMax.to(this.text, 0.5, {alpha: 0, x: 0, ease: Power3.easeOut, onComplete: this.closed});
    }


    cleanUp() {
        return super.cleanUp();
    }
}
