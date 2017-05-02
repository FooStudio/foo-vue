import Vue from 'vue';

export default Vue.component('LoaderTransition', {
    functional: true,
    render: (h, ctx) => {
        const vm = ctx.parent;
        const data = {
            props: {
                name: 'LoaderTransition',
                css: false,
            },
            on: {
                enter: (el, done) => {
                    TweenMax.fromTo(vm.$el, 0.5, {alpha: 0}, {alpha: 1, ease: Sine.easeOut, onComplete: done});
                },
                leave: (el, done) => {
                    TweenMax.to(vm.$el, 0.5, {alpha: 0, ease: Sine.easeOut, onComplete: done});
                },
            }
        };
        return h('transition', data, ctx.children);
    }
});
