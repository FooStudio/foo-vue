<style src="styles/views/Root.styl" lang="stylus" scoped></style>

<script>
import { mapState } from "vuex";
import isMobile from "ismobilejs";
import Loader from "app/components/base/Loader.vue";
import RotateScreen from "app/components/base/RotateScreen.vue";
import MainContainer from "app/components/MainContainer.vue";
import Preloader from "./components/base/Preloader";

export default {
    name: "App",
    components: {
        Preloader,
        Loader,
        RotateScreen,
        MainContainer,
    },
    computed: {
        ...mapState({
            started: state => !state.app.loading,
        }),
        isPhone() {
            return isMobile.phone;
        },
    },
};
</script>

<template>
    <div id="app">
        <preloader v-if="!started" transitionMode="out-in"></preloader>
        <template v-if="started">
            <loader></loader>
            <main-container></main-container>
            <rotate-screen v-if="isPhone"></rotate-screen>
        </template>
    </div>
</template>
