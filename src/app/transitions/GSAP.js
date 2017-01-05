import Vue from "vue";

export default Vue.component("GSAP", {
    functional: true,
    render: (h, ctx) => {
        // let vm = ctx.parent;
        let data = {
            props: {
                name: "GSAP",
                css: false,
                appear: true,
                //mode:"out-in"
            },
            on: {
                beforeEnter: el => {},
                enter: (el, done) => {
                    TweenMax.fromTo(el, 0.55, {x: 300, alpha: 0}, {
                        x: 0,
                        alpha: 1,
                        ease: Power3.easeOut,
                        onComplete: done
                    });
                },
                afterEnter: el => {},
                enterCancelled: el => {},
                beforeLeave: el => {},
                leave: (el, done) => {
                    TweenMax.to(el, 0.55, {x: -300, alpha: 0, ease: Power3.easeOut, onComplete: done});
                },
                afterLeave: el => {},
                leaveCancelled: el => {},
            }
        };
        return h("transition", data, ctx.children);
    }
});
