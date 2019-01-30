<style src="styles/components/base/Preloader.styl" lang="stylus"></style>

<script>
    import {mapActions} from "vuex";
    import {ASSET_LOADING, DATA} from "@/app/store/modules/app";
    import preloader from "@/app/utils/preloader";
    import ApiLoader from "foo/net/ApiLoader";
    import PreloaderTransition from "@/app/transitions/PreloaderTransition";

    export default {
        name: "Preloader",
        data(){
            return {
                progress: 0,
                loading: true,
            };
        },
        props: {
            minDisplayTime: {
                type: Number,
                default: 1500
            },
            transitionMode: {
                type: String,
                default: "simultaneous"
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
        components: {PreloaderTransition},
        async mounted(){
            await ApiLoader.load();
            await this.setTimer();
            await this.setLoader();
            this.loadingComplete();
           /* Promise.all([
                ApiLoader.load(),
                this.setTimer(),
                this.setLoader(),
            ]).then(this.loadingComplete);*/
        },
        methods: {
            setTimer(){
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, this.minDisplayTime);
                });
            },
            setLoader(){
                return new Promise((resolve) => {
                    this.loader = preloader;
                    this.loader.on("progress", this.onProgress);
                    this.loader.on('complete', () => this.onComplete(resolve));
                    this.load();
                });
            },
            add(url, options = {}){
                this.loader.add(url, options);
            },
            load(){
                this.loader.load();
            },
            onProgress(val){
                this.progress = val;
            },
            onComplete(done){
                this.progress = 1;
                const data = preloader.get(require('assets/data/data.json'));
                this.$store.commit(DATA, data);
                done();
            },
            loadingComplete(){
                this.transitionMode === "out-in" ? this.transitionOut() : this.setDone();
            },
            transitionOut(){
                this.loading = false;
            },
            setDone(){
                this.loadingState(false);
            },
            ...mapActions({
                loadingState: ASSET_LOADING,
            })
        },
    };
</script>

<template>
    <preloader-transition>
        <div class="Preloader" v-if="loading">
            <p class="Preloader-copy">
                Cargando
            </p>
        </div>
    </preloader-transition>
</template>
