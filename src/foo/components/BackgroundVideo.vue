<style lang="stylus">
    .BackgroundVideo
        oultine none
</style>

<script>
    import {BackgroundCover} from 'background-cover'
    import playInlineVideo from 'iphone-inline-video'
    import insertRule from 'insert-rule'
    import Noise from "foo/utils/Noise";

    const iOSNavigator = typeof navigator !== 'undefined' && (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    const iOSVersion = iOSNavigator ? iOSNavigator[1] : null;

    export default {
        props: {
            playsinline: {
                type: Boolean,
                default: false
            },
            disableBackgroundCover: {
                type: Boolean,
                default: false
            },
            containerWidth: {
                type: Number,
                required: true
            },
            containerHeight: {
                type: Number,
                required: true
            },
            src: {
                type: [String, Array],
                required: true
            },
            poster: {
                type: String,
                default: ''
            },
            horizontalAlign: {
                type: Number,
                default: 0.5
            },
            verticalAlign: {
                type: Number,
                default: 0.5
            },
            preload: {
                type: String,
                default: 'auto'
            },
            muted: {
                type: Boolean,
                default: true
            },
            volume: {
                type: Number,
                default: 1
            },
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            extraVideoElementProps: {
                type: Object,
                default() {
                    return {}
                }
            },
            startTime: {
                type: Number,
                default: 0
            },
            tabIndex: {
                type: Number,
                default: 0
            },
            useNoise: {
                type: Boolean,
                default: false,
            },
            noiseTile: {
                type: Number,
                default: 256,
            },
            noiseAlpha: {
                type: Number,
                default: 0.08,
            }
        },
        data() {
            return {
                visible: false,
                hasStarted: false,
                startTimeIsSet: false
            }
        },
        mounted() {
            this.$nextTick(this.init)
        },
        methods: {
            init() {
                if (this.playsinline && iOSVersion) {
                    const hasAudio = !(iOSVersion && iOSVersion < 10 && this.props.autoPlay && this.props.muted); // allow auto play on iOS < 10 for silent videos
                    const requireInteractionOnTablet = false;

                    playInlineVideo(this.$refs['video'], hasAudio, requireInteractionOnTablet);
                    insertRule([
                        'video::-webkit-media-controls-start-playback-button',
                        '.IIV::-webkit-media-controls-play-button'
                    ], {
                        display: 'none'
                    });
                }
                if (this.$refs['video'].readyState !== 4) {
                    this.$refs['video'].addEventListener('loadedmetadata', this.handleVideoReady)
                } else {
                    this.handleVideoReady()
                }

                if (this.useNoise) {
                    this.noise = new Noise({
                        container: this.$refs["container"],
                        tile: this.noiseTile,
                        globalAlpha: this.noiseAlpha,
                    });
                }

                this.$refs['video'].addEventListener('play', this.onPlayHandler);
                this.$refs['video'].addEventListener('pause', this.onPauseHandler);
                this.$refs['video'].volume = this.volume;

                this.resize();
            },
            handleVideoReady() {
                const duration = this.$refs['video'].duration;
                this.resize();
                this.setCurrentTime(this.startTime);
                this.autoPlay && this.play();
                this.$emit('ready', duration);
                if (!this.poster) this.visible = true
            },
            handlePosterReady() {
                this.resize();
                this.visible = true;
            },
            onPlayHandler() {
                if (!this.hasStarted) this.hasStarted = true;
                this.$emit('play')
            },
            onPauseHandler() {
                this.$emit('pause')
            },
            handleTimeUpdate() {
                iOSVersion && this.handleIOSStartTime();
                const currentTime = this.$refs['video'].currentTime;
                const duration = this.$refs['video'].duration;
                const progress = currentTime / duration;
                this.$emit('time', {currentTime, progress, duration})
            },
            handleVideoEnd() {
                this.$emit('end')
            },
            handleIOSStartTime() {
                if (this.$refs['video'].currentTime < this.startTime) {
                    if (!this.startTimeIsSet) {
                        this.setCurrentTime(this.startTime);
                        this.startTimeIsSet = true
                    }
                }
            },
            play() {
                this.$refs['video'].play()
            },
            pause() {
                this.$refs['video'].pause()
            },
            togglePlay() {
                this.$refs['video'].paused ? this.play() : this.pause()
            },
            isPaused() {
                return this.$refs['video'].paused
            },
            mute() {
                this.$refs['video'].muted = true;
                this.$emit('mute')
            },
            unmute() {
                this.$refs['video'].muted = false;
                this.$emit('unmute')
            },
            toggleMute() {
                this.$refs['video'].muted ? this.unmute() : this.mute();
            },
            isMuted() {
                return this.$refs['video'].muted
            },
            setCurrentTime(value) {
                this.$refs['video'].currentTime = value
            },
            onClickHandler(event) {
                this.$emit('click', event)
            },
            onKeyPressHandler(event) {
                this.$emit('keypress', event)
            },
            resize() {
                if (!this.disableBackgroundCover) {
                    BackgroundCover(this.$refs['video'], this.$refs['container'], this.horizontalAlign, this.verticalAlign);
                    this.$refs['poster'] && BackgroundCover(this.$refs['poster'], this.$refs['container'], this.horizontalAlign, this.verticalAlign)
                }
                this.noise && this.noise.resize({container: this.$refs["container"]});
            }
        },
        computed: {},
        watch: {
            containerWidth() {
                this.resize()
            },
            containerHeight() {
                this.resize()
            },
            volume(value) {
                this.$refs['video'].volume = value
            }
        },
        beforeDestroy() {
            this.noise && this.noise.destroy();
            this.$refs['video'].removeEventListener('loadedmetadata', this.handleVideoReady);
            this.$refs['video'].removeEventListener('play', this.onPlayHandler);
            this.$refs['video'].removeEventListener('pause', this.onPauseHandler)
        }
    }
</script>

<template>
    <div ref='container'
         class='BackgroundVideo'
         @click='onClickHandler'
         @keypress='onKeyPressHandler'
         :tabIndex='tabIndex'>
        <video v-if="typeof src === 'object' && src.length > 1"
               ref='video'
               :preload='preload'
               :muted='muted'
               :loop='loop'
               @ended="handleVideoEnd"
               @timeupdate="handleTimeUpdate"
               :playsinline='playsinline'
        >
            <source v-for='(source, index) of src' :src='source.src' :key='index'/>
        </video>
        <video v-else ref='video'
               :src='src'
               :preload='preload'
               :muted='muted'
               :loop='loop'
               @ended="handleVideoEnd"
               @timeupdate="handleTimeUpdate"
               :playsinline='playsinline'>

        </video>
        <img v-if='poster && !hasStarted' :src='poster' ref='poster' @load='handlePosterReady' draggable="false">
    </div>
</template>
