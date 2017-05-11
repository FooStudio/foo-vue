<style src="styles/views/NotFound.styl" lang="stylus"></style>

<script>
    import MainTransition from "app/transitions/GSAP";

    export default {
        name: "NotFound",
        data(){
            return {};
        },
        props: {},
        components: {MainTransition},
        methods: {
            foo(){
            }
        },
        computed: {}
    };
</script>

<template>
    <main-transition>
        <div class="NotFound">
            <h2 ref="title">{{$t("notFound.title")}} Foo</h2>
            <h3 ref="subtitle">{{$t("notFound.subtitle")}}</h3>
        </div>
    </main-transition>
</template>
