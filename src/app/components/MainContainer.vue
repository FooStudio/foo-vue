<style src="styles/components/MainContainer.styl" lang="stylus" scoped></style>

<script>
    import AppHeader from "app/components/AppHeader.vue";

    export default {
        name: "MainContainer",
        data(){
            return {};
        },
        created(){
        },
        props: {},
        components: {AppHeader},
        methods: {},
        computed: {}
    };
</script>

<template>
    <div class="MainContainer">
        <app-header></app-header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
