<style src="styles/views/Root.styl" lang="stylus" scoped></style>

<script>
    import {mapState} from "vuex";
    import isMobile from "ismobilejs";
    import Loader from "app/components/Loader.vue";
    import RotateScreen from "app/components/RotateScreen.vue";
    import AppHeader from "app/components/AppHeader.vue";
    import MainContainer from "app/components/MainContainer.vue";
    import Preloader from "./components/Preloader";

    export default {
        name: "App",
        data(){
            return {
                width: App.width,
                height: App.height
            };
        },
        components: {
            Preloader,
            Loader,
            RotateScreen,
            AppHeader,
            MainContainer
        },
        mounted(){
            App.resize.add(this.onResize);
        },
        methods: {
            onResize(size){
                this.width = size.width;
                this.height = size.height;
            }
        },
        computed: {
            ...mapState({
                started: state => !state.app.loading,
            }),
            isPhone(){
                return isMobile.phone;
            }
        }
    };
</script>

<template>
    <div id="app">
        <preloader v-if="!started" transitionMode="out-in"></preloader>
        <template v-if="started">
            <loader></loader>
            <app-header></app-header>
            <main-container></main-container>
            <rotate-screen v-if="isPhone" :width="width" :height="height"></rotate-screen>
        </template>
    </div>
</template>
