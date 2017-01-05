import Vue from 'vue';

export default Vue.component('LoaderTransition', {
    functional: true,
    render: (createElement, context) => {
        const data = {
            props: {
                name: 'LoaderTransition',
                css: false,
                //mode:'out-in'
            },
            on: {
                beforeEnter: el => { },
                enter: (el, done) => {
                    TweenMax.fromTo(el, 0.5, { alpha: 0 }, { alpha: 1, ease: Sine.easeOut, onComplete: done });
                },
                afterEnter: el => { },
                enterCancelled: el => { },
                beforeLeave: el => { },
                leave: (el, done) => {
                    TweenMax.to(el, 0.5, { alpha: 0, ease: Sine.easeOut, onComplete: done });
                },
                afterLeave: el => { },
                leaveCancelled: el => { }
            }
        };
        return createElement('transition', data, context.children);
    }
});
