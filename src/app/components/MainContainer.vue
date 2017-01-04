<style src="styles/components/MainContainer.styl" lang="stylus" scoped></style>

<script type="text/babel">

    import Vue from "vue"
    import Pixi from "app/components/PixiComponent.vue"

    export default{
        name: "MainContainer",
        data(){
            return {}
        },
        created(){
            window.bus = new Vue();
        },
        props: {},
        components: {Pixi},
        methods: {},
        computed: {}
    }
</script>

<template>
    <div class="MainContainer">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <pixi></pixi>
    </div>
</template>
