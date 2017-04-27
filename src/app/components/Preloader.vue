<style src="styles/components/Preloader.styl" lang="stylus" scoped></style>

<script>
    import {mapMutations} from "vuex";
    import {ASSET_LOADING} from "app/store/modules/app";
    import assets from "app/preload.json";
    import preloader from "preloader";
    import SDKLoader from "../../foo/net/SDKLoader";

    export default{
        name: "Preloader",
        data(){
            return {
                progress: 0
            };
        },
        props: {
            minDisplayTime: {
                type: Number,
                default: 1500
            },
            options: {
                type: Object,
                default: function () {
                    return {
                        xhrImages: false,
                        loadFullAudio: false,
                        loadFullVideo: false,
                    };
                }
            },
        },
        mounted(){
            Promise.all([
                SDKLoader.load(),
                this.setTimer(),
                this.setLoader(),
            ]).then(this.setDone);
        },
        methods: {
            setTimer(){
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, this.minDisplayTime);
                });
            },
            setLoader(){
                return new Promise((resolve, reject) => {
                    this.loader = preloader(this.options);
                    assets.forEach(file => this.add(file));
                    this.loader.on("progress", this.onProgress);
                    this.loader.on('complete', () => this.onComplete(resolve));
                    this.load();
                });
            },
            add(url, options = {}){
                this.loader.add(url, options);
            },
            get(url){
                return this.loader.get(url);
            },
            load(){
                this.loader.load();
            },
            stopLoad(){
                this.loader.stopLoad();
            },
            onProgress(val){
                this.progress = val;
            },
            onComplete(done){
                this.progress = 1;
                done();
            },
            setDone(){
                this.loadingState(false);
            },
            ...mapMutations({
                loadingState: ASSET_LOADING,
            })
        },
        computed: {}
    };
</script>

<template>
    <div class="Preloader">
        <p>LOADING</p>
    </div>
</template>
