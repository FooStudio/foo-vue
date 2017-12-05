<style src="styles/components/MainContainer.styl" lang="stylus" scoped></style>

<script>
    import AppHeader from "app/components/AppHeader.vue";
    import BackgroundVideo from "foo/components/BackgroundVideo.vue";

    export default {
        name: "MainContainer",
        data() {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        created() {
        },
        mounted() {
            App.resize.add(this.onResize);
        },
        props: {},
        components: {AppHeader, BackgroundVideo},
        methods: {
            onResize(data) {
                this.width = data.width;
                this.height = data.height;
            }
        },
        computed: {}
    };
</script>

<template>
    <div class="MainContainer">
        <background-video
            :containerWidth="width"
            :containerHeight="height"
            :style="{width: '100%', height: '100%', position: 'absolute'}"
            playsinline
            :useNoise="true"
            :noiseAlpha="0.1"
            :noiseTile="256"
            poster="http://il6.picdn.net/shutterstock/videos/3548084/thumb/1.jpg?i10c=img.resize(height:160)"
            src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4">
        </background-video>
        <app-header></app-header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
