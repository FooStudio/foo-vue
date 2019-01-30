<template>
    <div id="app" class="App">
        <template v-if="started">
            <layout-header></layout-header>
            <layout-main></layout-main>
            <layout-footer></layout-footer>
            <rotate-device v-if="isPhone"></rotate-device>
        </template>
        <preloader v-else transitionMode="out-in"
        ></preloader>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import isMobile from 'ismobilejs'
import Preloader from './components/base/Preloader'
import RotateDevice from './components/base/RotateDevice'
import LayoutHeader from './components/layout/LayoutHeader'
import LayoutMain from './components/layout/LayoutMain'
import LayoutFooter from './components/layout/LayoutFooter'

export default {
    name: 'App',
    components: {
        Preloader,
        RotateDevice,
        LayoutHeader,
        LayoutMain,
        LayoutFooter,
    },
    computed: {
        ...mapState({
            started: state => !state.app.loading,
        }),
        isPhone() {
            return isMobile.phone;
        },
    },
}
</script>

<style src="styles/views/Root.styl" lang="stylus"></style>